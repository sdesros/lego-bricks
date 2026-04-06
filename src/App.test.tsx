import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.js';

describe('App', () => {
  it('renders the create form', () => {
    render(<App />);
    expect(
      screen.getByText(/lego bricks to create/i)
    ).toBeInTheDocument();
  });
});
