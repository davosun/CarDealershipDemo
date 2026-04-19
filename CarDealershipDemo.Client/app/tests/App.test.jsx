import { test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

test('renders car dealership header', () => {
  render(<App />);
  const header = screen.getByText(/car dealership/i);
  expect(header).toBeInTheDocument();
});
