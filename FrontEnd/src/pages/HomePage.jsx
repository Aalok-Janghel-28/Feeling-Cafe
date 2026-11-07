import MenuGrid from '../components/MenuGrid'
import { cafePhoto, cupPhoto, heroPhoto } from '../constants/appData'

function HomePage({ settings, categories, items, onAdd, onNavigate }) {
  const shownCategories = categories.length
    ? categories.slice(0, 5)
    : [
        { id: 1, name: 'Hot Coffee', slug: 'hot-coffee' },
        { id: 2, name: 'Iced Coffee', slug: 'iced-coffee' },
        { id: 3, name: 'Food', slug: 'food' },
        { id: 4, name: 'Desserts', slug: 'desserts' },
        { id: 5, name: 'Refreshment', slug: 'refreshment' },
      ]

  return (
    <>
      <section className="hero-section" style={{ backgroundImage: `linear-gradient(90deg, rgba(16, 10, 6, 0.9), rgba(16, 10, 6, 0.45)), url(${heroPhoto})` }}>
        <div className="hero-copy">
          <p className="script-text">Welcome to</p>
          <h1>{settings?.cafe_name || 'Feeling Cafe'}</h1>
          <p>Experience the handcrafted taste of coffee, fresh veg bites, and cozy cafe flavors delivered to your moment.</p>
          <div className="hero-actions">
            <button type="button" onClick={() => onNavigate('menu')}>View Menu</button>
            <button className="outline-light" type="button" onClick={() => onNavigate('cart')}>Order Online</button>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-media">
          <img className="about-main" src={cafePhoto} alt="Cafe interior" />
          <img className="about-card" src={cupPhoto} alt="Coffee cup" />
        </div>
        <div className="about-copy">
          <p className="eyebrow">Our Story</p>
          <h2>More Than Just A Coffee</h2>
          <p>{settings?.about || 'Feeling Cafe serves fresh vegetarian cafe food, handcrafted beverages, and easy nearby delivery for everyday cravings.'}</p>
          <div className="feature-row">
            <span>Quality Ingredients</span>
            <span>Cozy Atmosphere</span>
            <span>Friendly Service</span>
          </div>
          <button type="button" onClick={() => onNavigate('menu')}>Learn More</button>
        </div>
      </section>

      <section className="category-section">
        <p className="eyebrow">Explore Our Menu</p>
        <h2>What Would You Like?</h2>
        <div className="category-row">
          {shownCategories.map((category, index) => (
            <button key={category.id} type="button" onClick={() => onNavigate('menu')}>
              <span>{['Cup', 'Ice', 'Food', 'Cake', 'Tea'][index] || 'Menu'}</span>
              {category.name}
            </button>
          ))}
        </div>
      </section>

      <section className="bestseller-section">
        <p className="eyebrow">Popular Choice</p>
        <h2>Our Bestsellers</h2>
        <MenuGrid items={items} onAdd={onAdd} />
        <button className="center-button" type="button" onClick={() => onNavigate('menu')}>View Full Menu</button>
      </section>

      <section className="steps-section">
        <p className="eyebrow">How It Works</p>
        <h2>Simple Steps To Order</h2>
        <div className="steps-grid">
          <div><span>01</span><strong>Choose Your Items</strong><p>Browse menu and add favorites to cart.</p></div>
          <div><span>02</span><strong>Place Your Order</strong><p>Login, confirm address, and checkout.</p></div>
          <div><span>03</span><strong>We Prepare</strong><p>The cafe reviews and prepares your order.</p></div>
          <div><span>04</span><strong>Enjoy Fresh Food</strong><p>Receive delivery in about 30-45 minutes.</p></div>
        </div>
      </section>

      <section className="testimonial-section">
        <p className="eyebrow">Testimonials</p>
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          <ReviewCard name="Rahul Adams" text="The coffee is smooth and the sandwiches are fresh. A perfect local cafe order." />
          <ReviewCard name="Mala Mehra" text="Fast service and cozy flavors. The cold coffee is my regular choice." />
          <ReviewCard name="Priya Sinha" text="Simple ordering and tasty veg snacks. Great for evening cravings." />
        </div>
      </section>
    </>
  )
}

function ReviewCard({ name, text }) {
  return (
    <article className="testimonial-card">
      <strong>5 stars</strong>
      <p>{text}</p>
      <span>{name}</span>
    </article>
  )
}

export default HomePage
