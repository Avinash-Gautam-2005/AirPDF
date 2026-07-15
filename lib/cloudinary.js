/**
 * Cloudinary Configuration & Utilities
 * 
 * Handles PDF uploads, deletion, and page count extraction.
 */

import { v2 as cloudinary } from 'cloudinary';

// Initialize Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Maximum file size (20MB in bytes)
const MAX_FILE_SIZE = 20 * 1024 * 1024;

/**
 * Upload a PDF file to Cloudinary
 * @param {Buffer} fileBuffer - The file buffer to upload
 * @param {string} fileName - Original file name
 * @returns {Promise<{publicId: string, url: string, secureUrl: string, pageCount: number, bytes: number}>}
 */
export const uploadPDF = async (fileBuffer, fileName) => {
  try {
    // Validate file size
    if (fileBuffer.length > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum limit of 20MB`);
    }

    // Generate a unique public ID (without folder - folder option handles it)
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '_');
    const uniqueName = `${sanitizedName}_${timestamp}`;

    // Upload to Cloudinary using upload_stream
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `${uniqueName}.pdf`, // Retain .pdf extension so Cloudinary serves with Content-Type: application/pdf
          folder: 'printbridge/orders',
          use_filename: true,             // Use original filename
          unique_filename: false,         // We handle uniqueness via timestamp
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      // Write buffer to stream
      uploadStream.end(fileBuffer);
    });

    return {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      pageCount: result.pages || null,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
};

/**
 * Upload a PDF file from base64 string
 * @param {string} base64Data - Base64 encoded file data
 * @param {string} fileName - Original file name
 * @returns {Promise<{publicId: string, url: string, secureUrl: string, pageCount: number, bytes: number}>}
 */
export const uploadPDFBase64 = async (base64Data, fileName) => {
  try {
    // Generate a unique public ID
    const timestamp = Date.now();
    const sanitizedName = fileName.replace(/\.pdf$/i, '').replace(/[^a-zA-Z0-9]/g, '_');
    const publicId = `printbridge/orders/${sanitizedName}_${timestamp}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64Data, {
      resource_type: 'raw',
      public_id: publicId,
      format: 'pdf',
    });

    return {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      pageCount: result.pages || null,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload PDF: ${error.message}`);
  }
};

/**
 * Delete a PDF from Cloudinary
 * @param {string} publicId - The public ID of the file to delete
 * @returns {Promise<{success: boolean}>}
 */
export const deletePDF = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'raw',
    });

    return {
      success: result.result === 'ok',
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error(`Failed to delete PDF: ${error.message}`);
  }
};

/**
 * Get information about a PDF including page count
 * @param {string} publicId - The public ID of the file
 * @returns {Promise<{pageCount: number, bytes: number, url: string}>}
 */
export const getPDFInfo = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId, {
      resource_type: 'raw',
    });

    return {
      pageCount: result.pages || null,
      bytes: result.bytes,
      url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary get info error:', error);
    throw new Error(`Failed to get PDF info: ${error.message}`);
  }
};

/**
 * Generate a signed URL for secure PDF access (optional - for private files)
 * @param {string} publicId - The public ID of the file
 * @param {number} expiresInSeconds - URL expiration time (default: 1 hour)
 * @returns {string} Signed URL
 */
export const getSignedPDFUrl = (publicId, expiresInSeconds = 3600) => {
  const expireAt = Math.floor(Date.now() / 1000) + expiresInSeconds;

  return cloudinary.url(publicId, {
    resource_type: 'raw',
    type: 'authenticated',
    sign_url: true,
    expires_at: expireAt,
  });
};

export default cloudinary;
