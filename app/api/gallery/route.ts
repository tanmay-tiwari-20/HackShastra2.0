import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "hackshastra";
const COLLECTION_NAME = "gallery";

async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection();
    const images = await collection.find({}).sort({ created_at: -1 }).toArray();
    return NextResponse.json(images);
  } catch (error: any) {
    console.error("[/api/gallery GET] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collection = await getCollection();

    // Support single object or array of objects
    const payload = Array.isArray(body)
      ? body.map((img) => ({ ...img, created_at: new Date().toISOString() }))
      : { ...body, created_at: new Date().toISOString() };

    if (Array.isArray(payload)) {
      const result = await collection.insertMany(payload);
      return NextResponse.json(
        { insertedCount: result.insertedCount },
        { status: 201 },
      );
    } else {
      const result = await collection.insertOne(payload);
      return NextResponse.json(
        { _id: result.insertedId, ...payload },
        { status: 201 },
      );
    }
  } catch (error: any) {
    console.error("[/api/gallery POST] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const collection = await getCollection();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[/api/gallery DELETE] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
