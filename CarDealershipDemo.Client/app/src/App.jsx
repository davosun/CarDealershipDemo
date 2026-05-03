import './App.css';
import Badge from 'react-bootstrap/Badge';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CarsTable from './Cars/CarsTable';
import CarsFilterPanel from './Cars/CarsFilterPanel';
import AddCarModal from './Cars/AddCarModal'
import { useEffect, useState, useEffectEvent } from 'react';
import { fetchCars, CarFilterArgs } from './api'

const defaultErrorMessage = 'Failed to load cars.';

function App() {
  const [cars, setCars] = useState(null);
  const [args, setArgs] = useState(null);
  const [error, setError] = useState(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

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

  function closeAddCar() {
    setShowAdd(false);
  }

  function onCarAdded(car) {
    closeAddCar();
    cars.unshift(car);
    setCars(cars);
  }

  return (
    <>
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
            <div className="mt-3 mb-3 clearfix">
              <div className="float-start">
                <Button type="button" variant="success" onClick={() => setShowAdd(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>{' '}
                  Add Car
                </Button>
              </div>
            </div>
            <CarsTable cars={cars} />
            {cars?.length === 0 ? <Badge bg="info"><h5>There are no cars matching above criteria</h5></Badge> : ''}
          </>
        )}
    </div>

    <AddCarModal show={showAdd} onHide={closeAddCar} onCarAdded={onCarAdded} />
    </>
  );
}

export default App;