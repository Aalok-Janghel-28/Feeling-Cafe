import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Notice from './components/Notice'
import SiteFooter from './components/SiteFooter'
import AuthPage from './pages/AuthPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import OrdersPage from './pages/OrdersPage'
import PoliciesPage from './pages/PoliciesPage'
import ProfilePage from './pages/ProfilePage'
import { API_BASE, CART_KEY, REFRESH_TOKEN_KEY, TOKEN_KEY, fallbackItems } from './constants/appData'
import { uniqueCategories } from './utils/menu'
import './App.css'

const appRoutes = ['home', 'menu', 'cart', 'auth', 'checkout', 'orders', 'profile', 'gallery', 'policies']

function App() {
  const resetParams = new URLSearchParams(window.location.search)
  const hasResetLink = resetParams.has('uid') && resetParams.has('token')
  const [view, setView] = useState(hasResetLink ? 'auth' : 'home')
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  })
  const [settings, setSettings] = useState(null)
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [deliverableLocations, setDeliverableLocations] = useState([])
  const [orders, setOrders] = useState([])
  const [gallery, setGallery] = useState([])
  const [policies, setPolicies] = useState([])
  const [activePolicy, setActivePolicy] = useState(null)
  const [filters, setFilters] = useState({ search: '', category: '', spice: '' })
  const [authMode, setAuthMode] = useState(hasResetLink ? 'reset' : 'login')
  const [message, setMessage] = useState('')
  const [checkout, setCheckout] = useState({ address: '', deliverableLocationId: '', instructions: '', upiTransactionId: '', paymentNote: '' })
  const [deliveryQuote, setDeliveryQuote] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    loadPublicData()
    applyRouteView(window.location.pathname)
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    if (token) {
      loadProfile(token)
      loadOrders(token)
    }
  }, [token])

  useEffect(() => {
    setDeliveryQuote(null)
  }, [checkout.deliverableLocationId])

  function handlePopState() {
    applyRouteView(window.location.pathname)
  }

  function applyRouteView(pathname) {
    const route = pathname.replace('/', '') || 'home'
    if (appRoutes.includes(route)) {
      setView(route)
    }
  }

  function navigate(viewName) {
    setView(viewName)
    window.history.pushState({}, '', viewName === 'home' ? '/' : `/${viewName}`)
  }

  async function request(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
      const fieldErrors = data.errors ? Object.values(data.errors).join(' ') : ''
      throw new Error(fieldErrors || data.detail || 'Something went wrong.')
    }
    return data
  }

  async function loadPublicData() {
    try {
      const [settingsData, categoryData, locationData, menuData, galleryData, policyData] = await Promise.all([
        request('/cafe-settings/'),
        request('/categories/'),
        request('/delivery/locations/'),
        request('/menu-items/'),
        request('/gallery/'),
        request('/policies/'),
      ])
      setSettings(settingsData)
      setCategories(categoryData.results || [])
      setDeliverableLocations(locationData.results || [])
      setItems(menuData.results?.length ? menuData.results : fallbackItems)
      setGallery(galleryData.results || [])
      setPolicies(policyData.results || [])
    } catch {
      setItems(fallbackItems)
      setCategories(uniqueCategories(fallbackItems))
      setDeliverableLocations([])
      setSettings({
        cafe_name: 'Feeling Cafe',
        about: 'A veg cafe serving fresh snacks, beverages, and comfort food for nearby delivery.',
        phone: 'Add phone in admin',
        address: 'Feeling Cafe, Gandai, Chhattisgarh 491888, India',
        estimated_delivery: { min: 30, max: 45 },
        ordering_rules: {
          minimum_order_amount: '100.00',
          advance_threshold: '500.00',
          advance_percent: '50.00',
        },
      })
    }
  }

  async function loadProfile(activeToken = token) {
    try {
      const response = await fetch(`${API_BASE}/profile/`, {
        headers: { Authorization: `Bearer ${activeToken}` },
      })
      if (!response.ok) return
      const data = await response.json()
      setUser(data.user)
      setCheckout((current) => ({
        ...current,
        address: data.user.profile?.address || '',
        deliverableLocationId: data.user.profile?.deliverable_location?.id ? String(data.user.profile.deliverable_location.id) : '',
      }))
    } catch {
      setUser(null)
    }
  }

  async function loadOrders(activeToken = token) {
    try {
      const response = await fetch(`${API_BASE}/orders/`, {
        headers: { Authorization: `Bearer ${activeToken}` },
      })
      if (!response.ok) return
      const data = await response.json()
      setOrders(data.results || [])
    } catch {
      setOrders([])
    }
  }

  const visibleItems = useMemo(() => {
    return items.filter((item) => {
      const searchMatch = item.name.toLowerCase().includes(filters.search.toLowerCase())
      const categoryMatch = filters.category ? item.category.slug === filters.category || String(item.category.id) === filters.category : true
      const spiceMatch = filters.spice ? item.spice_level === filters.spice : true
      return searchMatch && categoryMatch && spiceMatch
    })
  }, [items, filters])

  const popularItems = useMemo(() => items.filter((item) => item.is_popular).slice(0, 6), [items])
  const cartLines = useMemo(() => {
    return cart.map((line) => ({ ...line, item: items.find((item) => item.id === line.menu_item_id) })).filter((line) => line.item)
  }, [cart, items])
  const subtotal = cartLines.reduce((sum, line) => sum + Number(line.item.price) * line.quantity, 0)
  const deliveryFee = deliveryQuote?.available ? Number(deliveryQuote.delivery_fee) : 0
  const total = subtotal + deliveryFee
  const advanceRequired = total > Number(settings?.ordering_rules?.advance_threshold || 500)
  const advanceAmount = advanceRequired ? total * 0.5 : 0
  const remainingAmount = total - advanceAmount

  function addToCart(item) {
    setCart((current) => {
      const existing = current.find((line) => line.menu_item_id === item.id)
      if (existing) {
        return current.map((line) => (line.menu_item_id === item.id ? { ...line, quantity: line.quantity + 1 } : line))
      }
      return [...current, { menu_item_id: item.id, quantity: 1 }]
    })
    setMessage(`${item.name} added to cart.`)
  }

  function updateQuantity(menuItemId, quantity) {
    if (quantity <= 0) {
      setCart((current) => current.filter((line) => line.menu_item_id !== menuItemId))
      return
    }
    setCart((current) => current.map((line) => (line.menu_item_id === menuItemId ? { ...line, quantity } : line)))
  }

  async function submitAuth(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      if (authMode === 'forgot') {
        const response = await request('/auth/forgot-password/', {
          method: 'POST',
          body: JSON.stringify({ identifier: data.identifier }),
        })
        setMessage(response.detail)
        setAuthMode('login')
        return
      }
      if (authMode === 'reset') {
        const response = await request('/auth/reset-password/', {
          method: 'POST',
          body: JSON.stringify({
            uid: resetParams.get('uid'),
            token: resetParams.get('token'),
            password: data.password,
          }),
        })
        setMessage(response.detail)
        window.history.replaceState({}, '', '/')
        setAuthMode('login')
        return
      }
      const payload =
        authMode === 'login'
          ? { identifier: data.identifier, password: data.password }
          : {
              name: data.name,
              email: data.email,
              phone: data.phone,
              password: data.password,
              address: data.address,
              deliverable_location_id: data.deliverable_location_id,
            }
      const response = await request(authMode === 'login' ? '/auth/login/' : '/auth/register/', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      localStorage.setItem(TOKEN_KEY, response.token)
      if (response.refresh) {
        localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh)
      }
      setToken(response.token)
      setUser(response.user)
      setMessage('You are signed in.')
      navigate('checkout')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function submitCheckout(event) {
    event.preventDefault()
    if (!token) {
      navigate('auth')
      setMessage('Please sign in before checkout.')
      return
    }
    if (subtotal < 100) {
      setMessage('Minimum order amount is Rs. 100.')
      return
    }
    try {
      const quote = await validateDelivery()
      if (!quote.available) {
        setMessage('Delivery Unavailable')
        return
      }
      const quotedTotal = subtotal + Number(quote.delivery_fee)
      const quotedAdvanceRequired = quotedTotal > Number(settings?.ordering_rules?.advance_threshold || 500)
      if (quotedAdvanceRequired && !checkout.upiTransactionId.trim()) {
        setMessage('Pay the UPI advance and enter the transaction ID before placing this order.')
        return
      }
      const response = await request('/orders/', {
        method: 'POST',
        body: JSON.stringify({
          items: cart.map((line) => ({ menu_item_id: line.menu_item_id, quantity: line.quantity })),
          address: checkout.address,
          deliverable_location_id: checkout.deliverableLocationId,
          special_instructions: checkout.instructions,
          upi_transaction_id: checkout.upiTransactionId,
          payment_note: checkout.paymentNote,
        }),
      })
      setCart([])
      setDeliveryQuote(null)
      setOrders((current) => [response.order, ...current])
      setMessage(
        response.order.advance_required
          ? `Order ${response.order.order_number} placed. Admin will verify your UPI payment.`
          : `Order ${response.order.order_number} placed successfully.`
      )
      navigate('orders')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function validateDelivery() {
    if (!checkout.deliverableLocationId) {
      setMessage('Select your delivery area first.')
      throw new Error('Select your delivery area first.')
    }
    try {
      const quote = await request('/delivery/validate/', {
        method: 'POST',
        body: JSON.stringify({ deliverable_location_id: checkout.deliverableLocationId }),
      })
      setDeliveryQuote(quote)
      setMessage(`${quote.message}: ${quote.location_name}, Rs. ${Number(quote.delivery_fee).toFixed(0)} delivery`)
      return quote
    } catch (error) {
      setDeliveryQuote(null)
      setMessage(error.message)
      throw error
    }
  }

  async function submitProfile(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      const response = await request('/profile/', {
        method: 'PATCH',
        body: JSON.stringify({
          name: data.name,
          address: data.address,
          deliverable_location_id: data.deliverable_location_id,
        }),
      })
      setUser(response.user)
      setCheckout((current) => ({
        ...current,
        address: response.user.profile?.address || '',
        deliverableLocationId: response.user.profile?.deliverable_location?.id ? String(response.user.profile.deliverable_location.id) : '',
      }))
      setMessage('Profile updated.')
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function submitReview(event, menuItemId) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    try {
      await request(`/menu-items/${menuItemId}/reviews/`, {
        method: 'POST',
        body: JSON.stringify({ rating: data.rating, comment: data.comment }),
      })
      await loadPublicData()
      setMessage('Review submitted.')
      event.currentTarget.reset()
    } catch (error) {
      setMessage(error.message)
    }
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    setToken('')
    setUser(null)
    setOrders([])
    navigate('home')
  }

  return (
    <main>
      <Header token={token} cartCount={cart.length} onNavigate={navigate} />
      <Notice message={message} onDismiss={() => setMessage('')} />

      {view === 'home' && (
        <HomePage
          settings={settings}
          categories={categories}
          items={popularItems.length ? popularItems : visibleItems.slice(0, 4)}
          onAdd={addToCart}
          onNavigate={navigate}
        />
      )}

      {view === 'menu' && (
        <MenuPage filters={filters} setFilters={setFilters} categories={categories} items={visibleItems} onAdd={addToCart} />
      )}

      {view === 'cart' && (
        <CartPage
          lines={cartLines}
          subtotal={subtotal}
          onQuantity={updateQuantity}
          onCheckout={() => {
            if (token) {
              navigate('checkout')
              return
            }
            setMessage('Please login first to continue checkout.')
            navigate('auth')
          }}
        />
      )}

      {view === 'auth' && (
        <AuthPage mode={authMode} setMode={setAuthMode} onSubmit={submitAuth} locations={deliverableLocations} />
      )}

      {view === 'checkout' && (
        <CheckoutPage
          checkout={checkout}
          setCheckout={setCheckout}
          lines={cartLines}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          advanceRequired={advanceRequired}
          advanceAmount={advanceAmount}
          remainingAmount={remainingAmount}
          paymentSettings={settings?.payment_settings}
          locations={deliverableLocations}
          deliveryQuote={deliveryQuote}
          onValidateDelivery={validateDelivery}
          onSubmit={submitCheckout}
        />
      )}

      {view === 'orders' && (
        <OrdersPage orders={orders} user={user} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} onLogout={logout} onReview={submitReview} />
      )}

      {view === 'profile' && (
        <ProfilePage user={user} locations={deliverableLocations} onSubmit={submitProfile} onLogout={logout} />
      )}

      {view === 'gallery' && (
        <GalleryPage gallery={gallery} />
      )}

      {view === 'policies' && (
        <PoliciesPage policies={policies} activePolicy={activePolicy} setActivePolicy={setActivePolicy} request={request} />
      )}

      <SiteFooter settings={settings} onNavigate={navigate} />
    </main>
  )
}

export default App
