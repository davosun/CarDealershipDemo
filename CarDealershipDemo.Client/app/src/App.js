import './App.css';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import CarsTable from './Cars/CarsTable';
import CarsFilterPanel from './Cars/CarsFilterPanel';

export const carsApi = 'api/cars';

const defaultErrorMessage = 'Failed to load cars.';

function App() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  async function fetchCars() {
    try {
      const response = await fetch(carsApi);
      if (response.ok) {
        response.json().then(data => setCars(data));
      } else {
        response.json()
        .then(error => console.error(defaultErrorMessage, error))
        .catch(() => console.error(defaultErrorMessage));
      }
    } catch (error) {
      console.error(defaultErrorMessage, error);
    }
  }

  async function fetchFilteredCars(uri) {
    try {
      const response = await fetch(uri);
      if (response.ok) {
        response.json().then(data => setCars(data));
      } else {
        response.json()
        .then(error => console.error(defaultErrorMessage, error))
        .catch(() => console.error(defaultErrorMessage));
      }
    } catch (error) {
      console.error(defaultErrorMessage, error);
    }
  }

  function clearFilters() {
    fetchCars();
  }

  return (
    <div className="App container">
      <h1>
        Car Dealership <Badge bg="warning">Demo</Badge>
      </h1>
      <CarsFilterPanel fetchFilteredCars={fetchFilteredCars} clearFilters={clearFilters} />
      <CarsTable cars={cars} />
    </div>
  );
}

export default App;