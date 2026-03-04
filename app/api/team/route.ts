import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const DB_NAME = "hackshastra";
const COLLECTION_NAME = "team_members";

async function getCollection() {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(COLLECTION_NAME);
}

export async function GET(req: NextRequest) {
  try {
    const collection = await getCollection();
    const team = await collection.find({}).sort({ created_at: -1 }).toArray();
    return NextResponse.json(team);
  } catch (error: any) {
    console.error("[/api/team GET] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const collection = await getCollection();
    const payload = { ...body, created_at: new Date().toISOString() };
    const result = await collection.insertOne(payload);
    return NextResponse.json(
      { _id: result.insertedId, ...payload },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("[/api/team POST] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const body = await req.json();
    const collection = await getCollection();
    const { _id, ...updateData } = body;

    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: "after" },
    );

    if (!result)
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[/api/team PATCH] MongoDB error:", error);
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
      return NextResponse.json({ error: "Member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("[/api/team DELETE] MongoDB error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
