function Header({ token, cartCount, onNavigate }) {
  return (
    <header className="site-header">
      <button className="brand" onClick={() => onNavigate('home')} type="button">
        <span className="brand-mark">Feeling</span>
        <span>Cafe</span>
      </button>
      <nav>
        <button type="button" onClick={() => onNavigate('home')}>Home</button>
        <button type="button" onClick={() => onNavigate('menu')}>Menu</button>
        <button type="button" onClick={() => onNavigate('gallery')}>Gallery</button>
        <button type="button" onClick={() => onNavigate('cart')}>Cart ({cartCount})</button>
        {token && <button type="button" onClick={() => onNavigate('profile')}>Profile</button>}
        <button className="nav-order" type="button" onClick={() => onNavigate(token ? 'orders' : 'auth')}>
          {token ? 'Orders' : 'Order Now'}
        </button>
      </nav>
    </header>
  )
}

export default Header
