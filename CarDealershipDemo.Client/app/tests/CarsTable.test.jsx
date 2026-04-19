import { test, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../src/App';
import CarsTable from '../src/Cars/CarsTable';

test('renders 10 header', () => {
  render(<CarsTable cars={[]} />);
  const headers = document.getElementsByTagName('th');
  expect(headers.length).toBe(10);
});
