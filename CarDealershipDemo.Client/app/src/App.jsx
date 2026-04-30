import './App.css';
import { useEffect, useState, useEffectEvent } from 'react';
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
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);

  const onFetched = useEffectEvent((cars) => {
    if (cars?.length > 0) {
      setIsFirstFetch(false);
    }
  });

  useEffect(() => {
    async function startCarsFetch(args, controller) {
      const result = await fetchCars(args ?? new CarFilterArgs(), controller, cars ?? null);
      if (result.error === null) {
        setCars(result.cars);
        onFetched(result.cars);
      } else {
        setError(result.error);
      }
      setIsFiltering(false);
    }

    setIsFiltering(true);

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
        : error !== null
          ? <Badge bg="danger"><h5>Failed to load cars</h5></Badge>
        : isFirstFetch && cars?.length === 0
          ? <Badge bg="info"><h5>There are no cars at this dealership</h5></Badge>
        : (
          <>
            <CarsFilterPanel applyFilters={args => setArgs(args)} loading={isFiltering} />
            <CarsTable cars={cars} />
            {cars?.length === 0 ? <Badge bg="info"><h5>There are no cars matching above criteria</h5></Badge> : ''}
          </>
        )}
    </div>
  );
}

export default App;