function PoliciesPage({ policies, activePolicy, setActivePolicy, request }) {
  async function openPolicy(slug) {
    const data = await request(`/policies/${slug}/`)
    setActivePolicy(data)
  }

  return (
    <section className="panel page-panel">
      <h2>Policies</h2>
      <div className="policy-layout">
        <div className="policy-list">
          {policies.map((policy) => (
            <button key={policy.slug} type="button" onClick={() => openPolicy(policy.slug)}>
              {policy.title}
            </button>
          ))}
        </div>
        <article className="policy-content">
          {activePolicy ? (
            <>
              <h3>{activePolicy.title}</h3>
              <p>{activePolicy.content}</p>
            </>
          ) : (
            <p>Select a policy to read details.</p>
          )}
        </article>
      </div>
    </section>
  )
}

export default PoliciesPage
