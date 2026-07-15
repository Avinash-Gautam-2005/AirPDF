"use server";

import { NextResponse } from "next/server";
import { auth } from "../lib/auth";
import prisma from "../lib/prisma";
import QRCode from "qrcode";

/**
 * Get all orders for the currently logged-in shopkeeper's shop.
 */
export const getorders = async () => {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        const orders = await prisma.order.findMany({
            where: { 
                shopId: session.user.id ,
                status: { in: ["PENDING", "PRINTING"] }
            },
            include: {
                customer: {
                    select: { name: true, email: true, image: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    //     const finalorders = orders.filter((item, index) => {
    //         return item.status != "COMPLETED"
    //     })
    //    console.log("these are the final orders")
        return orders;
    } catch (error) {
        console.error(error);
        return [];
    }
};

/**
 * Get the shop info for the currently logged-in shopkeeper.
 */
export const getShopInfo = async () => {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        const shop = await prisma.shop.findUnique({
            where: { id: session.user.id },
        });

        return shop;
    } catch (error) {
        console.error(error);
        return null;
    }
};

/**
 * Generate a QR code for the shop's upload page and save it to the DB.
 * @param {string} baseUrl - The base URL of the app (e.g. http://localhost:3000)
 */
export const generateShopQR = async (baseUrl) => {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");
        if (session.user.role !== "SHOPKEEPER") throw new Error("Forbidden");

        const shopId = session.user.id;
        const uploadUrl = `${baseUrl}/shop/${shopId}/upload`;

        // Generate QR code as a base64 data URL (PNG image)
        const qrDataUrl = await QRCode.toDataURL(uploadUrl, {
            width: 400,
            margin: 2,
            color: {
                dark: "#1e1b4b",  // indigo-950
                light: "#ffffff",
            },
        });

        // Save to DB
        await prisma.shop.update({
            where: { id: shopId },
            data: { qrCodeUrl: qrDataUrl },
        });

        return { qrCodeUrl: qrDataUrl, uploadUrl };
    } catch (error) {
        console.error("generateShopQR error:", error);
        throw new Error(error.message || "Failed to generate QR code");
    }
};

/**
 * Update the status of an order (shopkeeper only).
 */
export const updateOrderStatus = async (orderId, status) => {
    try {
        const session = await auth();
        if (!session?.user?.id) throw new Error("Unauthorized");

        // Verify the order belongs to this shopkeeper's shop
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            select: { shopId: true },
        });

        if (!order) throw new Error("Order not found");
        if (order.shopId !== session.user.id) throw new Error("Forbidden");

        const updated = await prisma.order.update({
            where: { id: orderId },
            data: {
                status,
                statusUpdatedAt: new Date(),
            },
        });

        return updated;
    } catch (error) {
        console.error("updateOrderStatus error:", error);
        throw new Error(error.message || "Failed to update order status");
    }
};

export const findshopbyid=async(id)=>{
    try {
        const shop=await prisma.shop.findUnique({
            where:{id},
            select: { id: true, name: true, address: true, phone: true, isActive: true }
        })
        if(!shop){
            throw new Error("Shop not found")
        }
        return shop
    } catch (error) {
        console.error(error.message)
    }
}
export const deleteorder=async(orderId)=>{
    try {
        const order=await prisma.order.findUnique({
            where:{id:orderId}
        })
        await prisma.order.deleteorder({
            where:{id:orderId}
        })
        
        if(!order){
            throw new Error("Order not found")
        }
return NextResponse.json({message:"Order deleted successfully"})
    } catch (error) {
        
    }
}