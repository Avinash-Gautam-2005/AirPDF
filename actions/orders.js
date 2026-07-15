"use server";

import { auth } from "../lib/auth";
import prisma from "../lib/prisma";

export const getUserOrders = async () => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            throw new Error("Unauthorized");
        }

        const orders = await prisma.order.findMany({
            where: { customerId: session.user.id },
            include: {
                shop: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        return orders;
    } catch (error) {
        throw new Error(error.message || "Failed to fetch orders");
    }
};

/**
 * Create a new print order.
 * Called after a successful Cloudinary upload from the UploadForm.
 */
export const createOrder = async ({
    shopId,
    filePublicId,
    fileUrl,
    fileName,
    fileSizeBytes,
    pageCount,
    copies,
    colorMode,
    pageRange,
    doubleSided,
}) => {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized. Please sign in.");

        // Verify the shop exists and is active
        const shop = await prisma.shop.findUnique({
            where: { id: shopId },
            select: { id: true, isActive: true },
        });
        if (!shop) throw new Error("Shop not found.");
        if (!shop.isActive) throw new Error("This shop is currently inactive.");

        const order = await prisma.order.create({
            data: {
                shopId,
                customerId: session.user.id,
                filePublicId,
                fileUrl,
                fileName: fileName || null,
                fileSizeBytes: fileSizeBytes || null,
                pageCount: pageCount || null,
                copies: copies || 1,
                colorMode: colorMode || "BW",
                pageRange: pageRange || null,
                doubleSided: doubleSided || false,
                status: "PENDING",
            },
        });

        return order;
    } catch (error) {
        throw new Error(error.message || "Failed to create order");
    }
};
