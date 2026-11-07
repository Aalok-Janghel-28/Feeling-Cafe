function GalleryPage({ gallery }) {
  return (
    <section className="panel page-panel">
      <h2>Gallery</h2>
      {gallery.length === 0 ? (
        <p>Gallery images will appear here after admin uploads them.</p>
      ) : (
        <div className="gallery-grid">
          {gallery.map((image) => (
            <article className="gallery-card" key={image.id}>
              <img src={image.image_url} alt={image.title || 'Cafe gallery'} />
              {image.title && <strong>{image.title}</strong>}
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default GalleryPage
