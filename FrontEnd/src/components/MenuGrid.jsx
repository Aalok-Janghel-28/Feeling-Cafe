import { averageRating } from '../utils/menu'

function MenuGrid({ items, onAdd }) {
  return (
    <section className="menu-grid">
      {items.map((item) => (
        <article className="menu-card" key={item.id}>
          <img src={item.image_url || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80'} alt={item.name} />
          <div>
            <span>{item.category.name}{item.spice_level && item.spice_level !== 'none' ? ` - ${item.spice_level}` : ''}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            {item.reviews?.length > 0 && (
              <div className="review-strip">
                <strong>{averageRating(item.reviews)} / 5</strong>
                <span>{item.reviews.length} review{item.reviews.length === 1 ? '' : 's'}</span>
              </div>
            )}
            <div className="card-footer">
              <strong>Rs. {Number(item.price).toFixed(0)}</strong>
              <button disabled={!item.is_available} onClick={() => onAdd(item)} type="button">
                {item.is_available ? 'Add' : 'Unavailable'}
              </button>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default MenuGrid
