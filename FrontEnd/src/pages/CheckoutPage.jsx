function CheckoutPage({
  checkout,
  setCheckout,
  lines,
  subtotal,
  deliveryFee,
  total,
  advanceRequired,
  advanceAmount,
  remainingAmount,
  paymentSettings,
  locations,
  deliveryQuote,
  onValidateDelivery,
  onSubmit,
}) {
  async function handleValidate() {
    try {
      await onValidateDelivery()
    } catch {
      // The shared notice displays validation errors.
    }
  }

  return (
    <section className="checkout-layout">
      <form className="panel form" onSubmit={onSubmit}>
        <h2>Checkout</h2>
        <div className="map-box">
          <strong>Delivery area</strong>
          <p>Select your area from the cafe delivery list.</p>
          <select
            value={checkout.deliverableLocationId}
            onChange={(event) => setCheckout({ ...checkout, deliverableLocationId: event.target.value })}
            required
          >
            <option value="">Choose delivery area</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}{location.pincode ? ` - ${location.pincode}` : ''} (Rs. {Number(location.delivery_fee).toFixed(0)})
              </option>
            ))}
          </select>
          <button className="secondary" type="button" onClick={handleValidate}>Check Delivery</button>
          {deliveryQuote && (
            <div className={deliveryQuote.available ? 'delivery-ok' : 'delivery-no'}>
              {deliveryQuote.message} - {deliveryQuote.location_name}
            </div>
          )}
        </div>
        <textarea value={checkout.address} onChange={(event) => setCheckout({ ...checkout, address: event.target.value })} placeholder="House number, street, landmark, delivery details" required />
        <textarea value={checkout.instructions} onChange={(event) => setCheckout({ ...checkout, instructions: event.target.value })} placeholder="Special food or delivery instructions" />
        {advanceRequired && (
          <div className="upi-payment-box">
            <strong>UPI advance payment</strong>
            <p>Pay Rs. {advanceAmount.toFixed(0)} using the QR code or UPI ID, then enter your transaction ID.</p>
            {paymentSettings?.upi_qr_image_url ? (
              <img src={paymentSettings.upi_qr_image_url} alt="UPI QR code" />
            ) : (
              <div className="upi-placeholder">QR code will appear after admin adds it.</div>
            )}
            <div className="upi-id-row">
              <span>UPI ID</span>
              <strong>{paymentSettings?.upi_id || 'Add UPI ID in admin'}</strong>
            </div>
            <input
              value={checkout.upiTransactionId}
              onChange={(event) => setCheckout({ ...checkout, upiTransactionId: event.target.value })}
              placeholder="UPI transaction ID"
              required
            />
            <textarea
              value={checkout.paymentNote}
              onChange={(event) => setCheckout({ ...checkout, paymentNote: event.target.value })}
              placeholder="Payment note, optional"
            />
          </div>
        )}
        <button className="wide" type="submit">Place Order</button>
      </form>
      <aside className="panel">
        <h2>Price Breakdown</h2>
        {lines.map((line) => (
          <div className="total-row" key={line.menu_item_id}>
            <span>{line.item.name} x {line.quantity}</span>
            <strong>Rs. {(Number(line.item.price) * line.quantity).toFixed(0)}</strong>
          </div>
        ))}
        <div className="total-row"><span>Subtotal</span><strong>Rs. {subtotal.toFixed(0)}</strong></div>
        <div className="total-row"><span>Delivery</span><strong>Rs. {deliveryFee.toFixed(0)}</strong></div>
        <div className="total-row grand"><span>Total</span><strong>Rs. {total.toFixed(0)}</strong></div>
        <div className="payment-note">
          {advanceRequired ? `UPI advance Rs. ${advanceAmount.toFixed(0)}. Remaining Rs. ${remainingAmount.toFixed(0)} on delivery after admin verification.` : 'Cash on delivery available.'}
        </div>
      </aside>
    </section>
  )
}

export default CheckoutPage
