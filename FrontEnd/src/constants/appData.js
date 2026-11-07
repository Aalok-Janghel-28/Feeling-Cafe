export const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'
export const CART_KEY = 'feeling_cafe_cart'
export const TOKEN_KEY = 'feeling_cafe_token'
export const REFRESH_TOKEN_KEY = 'feeling_cafe_refresh_token'

export const heroPhoto = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=85'
export const cafePhoto = 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85'
export const cupPhoto = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=85'

export const fallbackItems = [
  {
    id: 1,
    name: 'Paneer Tikka Sandwich',
    description: 'Grilled paneer, crisp vegetables, and house chutney.',
    price: '149.00',
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    spice_level: 'medium',
    is_available: true,
    is_popular: true,
    category: { id: 1, name: 'Snacks', slug: 'snacks' },
    reviews: [],
  },
  {
    id: 2,
    name: 'Cold Coffee',
    description: 'Creamy chilled coffee blended fresh for delivery.',
    price: '119.00',
    image_url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    spice_level: 'none',
    is_available: true,
    is_popular: true,
    category: { id: 2, name: 'Beverages', slug: 'beverages' },
    reviews: [],
  },
  {
    id: 3,
    name: 'Veg Cheese Maggi',
    description: 'Classic cafe maggi with vegetables and melted cheese.',
    price: '99.00',
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80',
    spice_level: 'hot',
    is_available: true,
    is_popular: false,
    category: { id: 3, name: 'Quick Bites', slug: 'quick-bites' },
    reviews: [],
  },
]
