import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return new Response(
      JSON.stringify({ ok: true, message: "MongoDB connected successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: (err as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
