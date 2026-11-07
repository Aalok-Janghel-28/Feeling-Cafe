import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import App from './App'
import { store } from './store'

function renderApp() {
  const queryClient = new QueryClient()
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>,
  )
}

describe('Feeling Cafe app', () => {
  it('renders the cafe homepage', async () => {
    renderApp()
    expect(await screen.findByRole('heading', { name: /Feeling Cafe/i, level: 1 })).toBeInTheDocument()
    expect(screen.getByText(/View Menu/i)).toBeInTheDocument()
  })
})
