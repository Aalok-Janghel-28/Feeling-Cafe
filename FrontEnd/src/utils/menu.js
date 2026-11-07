export function averageRating(reviews) {
  const total = reviews.reduce((sum, review) => sum + Number(review.rating), 0)
  return (total / reviews.length).toFixed(1)
}

export function uniqueCategories(items) {
  const map = new Map()
  items.forEach((item) => map.set(item.category.id, item.category))
  return Array.from(map.values())
}
