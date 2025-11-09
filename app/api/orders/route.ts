import connectDB from "@/lib/mongodb";
import Order1 from "@/models/Order1";

export async function GET() {
  try {
    await connectDB();
    const orders = await Order1.find().sort({ createdAt: -1 }).lean();
    return new Response(JSON.stringify(orders), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // ✅ Updated validation for your frontend payload
    if (
      !body ||
      !body.customerName ||
      !body.address ||
      !Array.isArray(body.items) ||
      typeof body.totalAmount !== "number"
    ) {
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ✅ Match your model structure
    const order = await Order1.create({
      customerName: body.customerName,
      address: body.address,
      items: body.items,
      totalAmount: body.totalAmount,
      status: body.status || "pending",
    });

    return new Response(JSON.stringify(order), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error creating order:", err);
    return new Response(
      JSON.stringify({ error: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
