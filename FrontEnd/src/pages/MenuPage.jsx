import MenuGrid from '../components/MenuGrid'

function MenuPage({ filters, setFilters, categories, items, onAdd }) {
  return (
    <>
      <section className="section-heading">
        <h2>Full Menu</h2>
        <button type="button" onClick={() => setFilters({ search: '', category: '', spice: '' })}>Clear</button>
      </section>
      <section className="filters">
        <input value={filters.search} onChange={(event) => setFilters({ ...filters, search: event.target.value })} placeholder="Search item name" />
        <select value={filters.category} onChange={(event) => setFilters({ ...filters, category: event.target.value })}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
        <select value={filters.spice} onChange={(event) => setFilters({ ...filters, spice: event.target.value })}>
          <option value="">All items</option>
          <option value="none">No spice level</option>
          <option value="mild">Mild</option>
          <option value="medium">Medium</option>
          <option value="hot">Hot</option>
        </select>
      </section>
      <MenuGrid items={items} onAdd={onAdd} />
    </>
  )
}

export default MenuPage
