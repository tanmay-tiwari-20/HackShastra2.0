import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "hackshastra";
const COLLECTION_NAME = "events";

// Helper to get collection
async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

// ── GET /api/events ─────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const upcoming = searchParams.get("upcoming");
    const single = searchParams.get("single");

    const collection = await getCollection();
    let query: any = {};

    if (upcoming === "true") {
      const today = new Date().toISOString().split("T")[0];
      query = {
        is_upcoming: true,
        date: { $gte: today },
      };
    } else if (upcoming === "false") {
      query = { is_upcoming: false };
    }

    if (single === "true") {
      const event = await collection.findOne(query, { sort: { date: 1 } });
      return NextResponse.json(event);
    }

    const events = await collection.find(query).sort({ date: -1 }).toArray();
    return NextResponse.json(events);
  } catch (error: any) {
    console.error("[/api/events GET] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── POST /api/events ────────────────────────────────────────────────────────
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
    console.error("[/api/events POST] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── PATCH /api/events ───────────────────────────────────────────────────────
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
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[/api/events PATCH] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ── DELETE /api/events ──────────────────────────────────────────────────────
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[/api/events DELETE] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
