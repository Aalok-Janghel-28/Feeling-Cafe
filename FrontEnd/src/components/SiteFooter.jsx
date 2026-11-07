function SiteFooter({ settings, onNavigate }) {
  return (
    <footer className="site-footer">
      <div>
        <button className="footer-brand" type="button" onClick={() => onNavigate('home')}>Feeling Cafe</button>
        <p>{settings?.about || 'Fresh vegetarian cafe food and handcrafted coffee for nearby delivery.'}</p>
      </div>
      <div>
        <h3>Quick Links</h3>
        <button type="button" onClick={() => onNavigate('home')}>Home</button>
        <button type="button" onClick={() => onNavigate('menu')}>Menu</button>
        <button type="button" onClick={() => onNavigate('cart')}>Cart</button>
        <button type="button" onClick={() => onNavigate('orders')}>Orders</button>
      </div>
      <div>
        <h3>Main Menu</h3>
        <p>Hot Coffee</p>
        <p>Cold Coffee</p>
        <p>Food</p>
        <p>Desserts</p>
      </div>
      <div>
        <h3>Contact Us</h3>
        <p>{settings?.phone || 'Add phone in admin'}</p>
        <p>{settings?.address || 'Add cafe address in admin'}</p>
        <p>{settings?.estimated_delivery?.min || 30}-{settings?.estimated_delivery?.max || 45} min delivery</p>
      </div>
    </footer>
  )
}

export default SiteFooter
