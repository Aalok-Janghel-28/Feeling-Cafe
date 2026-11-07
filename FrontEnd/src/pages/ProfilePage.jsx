function ProfilePage({ user, locations, onSubmit, onLogout }) {
  return (
    <section className="panel">
      <div className="section-heading compact">
        <div>
          <h2>Profile</h2>
          <p>{user?.email || 'Customer account'}</p>
        </div>
        <button type="button" onClick={onLogout}>Logout</button>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <input name="name" defaultValue={user?.profile?.name || ''} placeholder="Full name" required />
        <select name="deliverable_location_id" defaultValue={user?.profile?.deliverable_location?.id || ''} required>
          <option value="">Choose delivery area</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}{location.pincode ? ` - ${location.pincode}` : ''} (Rs. {Number(location.delivery_fee).toFixed(0)})
            </option>
          ))}
        </select>
        <textarea name="address" defaultValue={user?.profile?.address || ''} placeholder="House number, street, landmark, delivery details" required />
        <button className="wide" type="submit">Save Profile</button>
      </form>
    </section>
  )
}

export default ProfilePage
