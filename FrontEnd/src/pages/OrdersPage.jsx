function OrdersPage({ orders, user, selectedOrder, setSelectedOrder, onLogout, onReview }) {
  const activeOrder = selectedOrder || orders[0] || null

  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <h2>Orders</h2>
          <p>{user?.profile?.name || user?.email || 'Customer'}</p>
        </div>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <button className="order-card" key={order.id} type="button" onClick={() => setSelectedOrder(order)}>
            <div>
              <strong>{order.order_number}</strong>
              <span>{order.status} - {order.estimated_delivery}</span>
            </div>
            <strong>Rs. {Number(order.total_amount).toFixed(0)}</strong>
          </button>
        ))
      )}
      {activeOrder && (
        <article className="order-detail">
          <h3>{activeOrder.order_number} Details</h3>
          <div className="total-row"><span>Status</span><strong>{activeOrder.status}</strong></div>
          <div className="total-row"><span>Payment</span><strong>{activeOrder.payment_status}</strong></div>
          <div className="total-row"><span>Delivery fee</span><strong>Rs. {Number(activeOrder.delivery_fee).toFixed(0)}</strong></div>
          <div className="total-row grand"><span>Total</span><strong>Rs. {Number(activeOrder.total_amount).toFixed(0)}</strong></div>
          <h3>Items</h3>
          {activeOrder.items.map((item) => (
            <div className="review-box" key={item.id}>
              <div className="total-row">
                <span>{item.name} x {item.quantity}</span>
                <strong>Rs. {Number(item.line_total).toFixed(0)}</strong>
              </div>
              <form className="review-form" onSubmit={(event) => onReview(event, item.menu_item_id)}>
                <select name="rating" defaultValue="5">
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
                <input name="comment" placeholder="Review this item" />
                <button type="submit">Review</button>
              </form>
            </div>
          ))}
        </article>
      )}
    </section>
  )
}

export default OrdersPage
