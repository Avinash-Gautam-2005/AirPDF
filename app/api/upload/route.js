/**
 * PDF Upload API Route
 * 
 * Handles PDF file uploads to Cloudinary.
 * POST /api/upload
 * 
 * Request: FormData with 'file' field
 * Response: { publicId, url, secureUrl, pageCount, bytes, fileName }
 */

import { NextResponse } from 'next/server';
import { auth } from '../../../lib/auth';
import { uploadPDF } from '../../../lib/cloudinary';

// Maximum file size (20MB)
const MAX_FILE_SIZE = 20 * 1024 * 1024;

// Allowed MIME types
const ALLOWED_TYPES = ['application/pdf'];

export async function POST(req) {
  try {
    // Check authentication
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized. Please log in.' },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await req.formData();
    const file = formData.get('file');

    // Validate file exists
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No file provided. Please select a PDF file.' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file extension
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Invalid file extension. Only .pdf files are allowed.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File too large. Maximum size is 20MB. Your file is ${(file.size / (1024 * 1024)).toFixed(2)}MB.` },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await uploadPDF(buffer, file.name);

    // Return success response
    return NextResponse.json({
      success: true,
      publicId: result.publicId,
      url: result.url,
      secureUrl: result.secureUrl,
      pageCount: result.pageCount,
      bytes: result.bytes,
      fileName: file.name,
    });

  } catch (error) {
    console.error('Upload API error:', error);
    
    return NextResponse.json(
      { error: error.message || 'Failed to upload file. Please try again.' },
      { status: 500 }
    );
  }
}

// Optionally handle other methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST to upload files.' },
    { status: 405 }
  );
}
