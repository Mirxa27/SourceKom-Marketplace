import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";
import { UserRole } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-env";

export async function GET(request: NextRequest) {
  try {
    const auth = request.headers.get("authorization");
    if (!auth || !auth.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = auth.substring(7);
    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: decoded.userId } });
    if (!user || !user.isActive) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isCreator = user.role === UserRole.CREATOR || user.role === UserRole.ADMIN;

    const [totalResources, downloadsAggOrCount, purchasesAgg, recentResources, recentPurchases] = await Promise.all([
      isCreator
        ? db.resource.count({ where: { authorId: user.id } })
        : db.resource.count({ where: { isPublished: true } }),
      isCreator
        ? db.resource.aggregate({ _sum: { downloadCount: true }, where: { authorId: user.id } })
        : db.purchase.count({ where: { userId: user.id, paymentStatus: "COMPLETED" } }),
      isCreator
        ? db.purchase.aggregate({ _sum: { amount: true }, where: { paymentStatus: "COMPLETED", resource: { authorId: user.id } } })
        : db.purchase.aggregate({ _sum: { amount: true }, where: { userId: user.id, paymentStatus: "COMPLETED" } }),
      isCreator
        ? db.resource.findMany({ where: { authorId: user.id }, orderBy: { createdAt: "desc" }, take: 5 })
        : db.resource.findMany({ where: { isPublished: true }, orderBy: { createdAt: "desc" }, take: 5 }),
      db.purchase.findMany({
        where: isCreator ? { paymentStatus: "COMPLETED", resource: { authorId: user.id } } : { userId: user.id },
        include: { resource: { select: { title: true, slug: true, description: true } } },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    const totalRevenue = purchasesAgg._sum.amount || 0;

    const totalDownloads = isCreator
      ? (downloadsAggOrCount as any)._sum.downloadCount || 0
      : (downloadsAggOrCount as number);

    const totalPurchases = await db.purchase.count({ where: isCreator ? { resource: { authorId: user.id } } : { userId: user.id } });

    return NextResponse.json({
      totalResources,
      totalDownloads,
      totalPurchases,
      totalRevenue,
      utilizationRate: 78,
      recentResources,
      recentPurchases,
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
