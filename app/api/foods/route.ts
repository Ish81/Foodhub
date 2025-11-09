import connectDB from "@/lib/mongodb";
import Food from "@/models/Food";
import { FOOD_ITEMS } from "@/lib/dummy-data";

export async function GET() {
  try {
    await connectDB();

    const count = await Food.countDocuments();
    if (count === 0) {
      await Food.insertMany(
        FOOD_ITEMS.map((f) => ({
          name: f.name,
          category: f.category,
          description: f.description,
          price: f.price,
          rating: f.rating,
          image: f.image,
        }))
      );
    }

    const foods = await Food.find().lean();
    return new Response(JSON.stringify(foods), {
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


