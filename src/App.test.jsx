import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App.jsx';

describe('App', () => {
  it('renders the create form', () => {
    render(<App />);
    expect(
      screen.getByText(/lego bricks to create/i)
    ).toBeInTheDocument();
  });
});
