import './App.css';
import { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import CarsTable from './Cars/CarsTable';
import CarsFilterPanel from './Cars/CarsFilterPanel';
import { fetchCars, CarFilterArgs } from './api'

const defaultErrorMessage = 'Failed to load cars.';

function App() {
  const [cars, setCars] = useState(null);
  const [args, setArgs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function startCarsFetch(args, controller) {
      setCars(null);
      setError(null);
      
      const result = await fetchCars(args ?? new CarFilterArgs(), controller);
      if (result.error === null) {
        setCars(result.cars);
      } else {
        setError(result.error);
      }
    }
    
    const controller = new AbortController();
    startCarsFetch(args, controller);
    return () => {
      controller.abort();
    }
  }, [args]);

  return (
    <div className="App container">
      <h1>
        Car Dealership <Badge bg="warning">Demo</Badge>
      </h1>
      {cars === null && error === null
        ? <Spinner animation="border" variant="primary" />
        : cars === [] 
          ? <Badge bg="info">There are no cars at this dealership</Badge>
        : error > null
          ? <Badge bg="danger">Failed to load cars</Badge>
        : (
          <>
            <CarsFilterPanel applyFilters={args => setArgs(args)} />
            <CarsTable cars={cars} />          
          </>
        )}
    </div>
  );
}

export default App;