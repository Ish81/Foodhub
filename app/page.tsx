"use client"

import { useState, useMemo } from "react"
import { FOOD_ITEMS } from "@/lib/dummy-data"
import { FoodCard } from "@/components/food-card"
import { Button } from "@/components/ui/button"

const CATEGORIES = [
  "All",
  "Pizza",
  "Burgers",
  "Salads",
  "Indian",
  "Asian",
  "Mexican",
  "Desserts",
  "Beverages",
  "Wraps",
  "Pasta",
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [anomalyMode, setAnomalyMode] = useState(false)

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return FOOD_ITEMS
    return FOOD_ITEMS.filter((item) => item.category === selectedCategory)
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Order Your Favorite Food</h1>
          <p className="text-muted-foreground">Fast delivery, fresh food, great prices</p>
        </div>

        {/* Debug Panel */}
        <div className="mb-6 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={anomalyMode}
                onChange={(e) => setAnomalyMode(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm font-medium">Anomaly Mode (Simulates delays)</span>
            </label>
            <span className="text-xs text-muted-foreground">Debug Panel</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Food Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} anomalyMode={anomalyMode} />
          ))}
        </div>
      </div>
    </main>
  )
}
