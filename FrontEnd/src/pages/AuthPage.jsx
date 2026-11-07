function AuthPage({ mode, setMode, onSubmit, locations }) {
  const isLogin = mode === 'login'
  const isForgot = mode === 'forgot'
  const isReset = mode === 'reset'

  return (
    <section className="panel">
      <h2>{isLogin ? 'Customer Login' : isForgot ? 'Forgot Password' : isReset ? 'Reset Password' : 'Create Account'}</h2>
      <form className="form" onSubmit={onSubmit}>
        {!isLogin && !isForgot && !isReset && <input name="name" placeholder="Full name" required />}
        {isForgot ? (
          <input name="identifier" placeholder="Email or phone number" required />
        ) : isReset ? (
          <input name="password" type="password" placeholder="New password" minLength="8" required />
        ) : isLogin ? (
          <input name="identifier" placeholder="Email or phone number" required />
        ) : (
          <>
            <input name="email" type="email" placeholder="Email" required />
            <input name="phone" placeholder="Phone number" required />
            <select name="deliverable_location_id" required>
              <option value="">Choose delivery area</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}{location.pincode ? ` - ${location.pincode}` : ''}
                </option>
              ))}
            </select>
            <textarea name="address" placeholder="House number, street, landmark, delivery details" required />
          </>
        )}
        {!isForgot && !isReset && <input name="password" type="password" placeholder="Password" minLength={isLogin ? undefined : 8} required />}
        <button className="wide" type="submit">{isLogin ? 'Login' : isForgot ? 'Send Reset Link' : isReset ? 'Reset Password' : 'Register'}</button>
      </form>
      <div className="auth-actions">
        {isLogin && <button className="text-button" type="button" onClick={() => setMode('register')}>Create a new account</button>}
        {isLogin && <button className="text-button" type="button" onClick={() => setMode('forgot')}>Forgot password</button>}
        {!isLogin && <button className="text-button" type="button" onClick={() => setMode('login')}>Back to login</button>}
      </div>
    </section>
  )
}

export default AuthPage
