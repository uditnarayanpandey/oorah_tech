import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('App routing', () => {
  it('renders the home page at /', async () => {
    renderAt('/');
    expect(await screen.findByText(/Welcome to/i)).toBeInTheDocument();
  });

  it('renders the products page with data loaded from local content, no network mocking involved', async () => {
    renderAt('/products');
    expect(
      await screen.findByRole('heading', { name: 'Our Products' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: 'ICare' }),
    ).toBeInTheDocument();
  });

  it('renders a 404 for unknown routes', async () => {
    renderAt('/this-route-does-not-exist');
    expect(await screen.findByText(/not found/i)).toBeInTheDocument();
  });
});
