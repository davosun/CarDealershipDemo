import { render } from '@testing-library/react';
import App from '../App';
import CarsTable from './CarsTable';

test('renders 10 header', () => {
  render(<CarsTable cars={[]} />);
  const headers = document.getElementsByTagName('th');
  expect(headers.length).toBe(10);
});
