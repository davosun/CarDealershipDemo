import { render, screen } from '@testing-library/react';
import App from './App';

test('renders car dealership header', () => {
  render(<App />);
  const linkElement = screen.getByText(/car dealership/i);
  expect(linkElement).toBeInTheDocument();
});
