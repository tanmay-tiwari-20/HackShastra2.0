import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "hackshastra";
const COLLECTION_NAME = "sponsors";

// Helper to get collection
async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

// ── GET /api/sponsors ──────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection();
    const sponsors = await collection
      .find({})
      .sort({ created_at: -1 })
      .toArray();
    return NextResponse.json(sponsors);
  } catch (error: any) {
    console.error("[/api/sponsors GET] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── POST /api/sponsors ─────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collection = await getCollection();

    // Add createdAt if not present
    const payload = { ...body, created_at: new Date().toISOString() };

    const result = await collection.insertOne(payload);
    return NextResponse.json(
      { _id: result.insertedId, ...payload },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[/api/sponsors POST] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── PATCH /api/sponsors ────────────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await req.json();
    const collection = await getCollection();

    const { _id, ...updateData } = body; // Don't try to update the _id field

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" },
    );

    if (!result)
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[/api/sponsors PATCH] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── DELETE /api/sponsors ───────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Sponsor not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[/api/sponsors DELETE] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
