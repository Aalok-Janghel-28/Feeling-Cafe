function CartPage({ lines, subtotal, onQuantity, onCheckout }) {
  return (
    <section className="panel">
      <h2>Your Cart</h2>
      {lines.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {lines.map((line) => (
            <div className="cart-line" key={line.menu_item_id}>
              <div>
                <strong>{line.item.name}</strong>
                <span>Rs. {Number(line.item.price).toFixed(0)} each</span>
              </div>
              <div className="stepper">
                <button type="button" onClick={() => onQuantity(line.menu_item_id, line.quantity - 1)}>-</button>
                <span>{line.quantity}</span>
                <button type="button" onClick={() => onQuantity(line.menu_item_id, line.quantity + 1)}>+</button>
              </div>
            </div>
          ))}
          <div className="total-row">
            <span>Subtotal</span>
            <strong>Rs. {subtotal.toFixed(0)}</strong>
          </div>
          <button className="wide" type="button" onClick={onCheckout}>Checkout</button>
        </>
      )}
    </section>
  )
}

export default CartPage
