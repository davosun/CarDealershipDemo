import './App.css';
import Badge from 'react-bootstrap/Badge';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import CarsTable from './Cars/CarsTable';
import CarsFilterPanel from './Cars/CarsFilterPanel';
import AddCarModal from './Cars/AddCarModal';
import { useEffect, useState } from 'react';
import { fetchCars, CarFilterArgs } from './api';

const defaultErrorMessage = 'Failed to load cars.';

function App() {
  const [cars, setCars] = useState(null);
  const [args, setArgs] = useState(CarFilterArgs.default);
  const [error, setError] = useState(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [isFiltering, setIsFiltering] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    async function startCarsFetch(args, controller) {
      const result = await fetchCars(args, controller, cars);
      if (result.error === null) {
        setCars(result.cars);
      } else {
        setError(result.error);
      }
      setIsFiltering(false);
      if (args === CarFilterArgs.default) {
        setIsFiltered(false);
      } else {
        setIsFiltered(true);
      }
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

  function onCarUpdated(car, index) {
    cars.splice(index, 1, car);
    setCars(cars);
  }

  function onCarRemoved(car, index) {
    cars.splice(index, 1);
    setCars(cars);
  }

  return (
    <>
    <div className="App container">
      <h1>
        Car Dealership <Badge bg="warning" pill text="secondary">Demo</Badge>
      </h1>
      {cars === null && error === null
        ? <Spinner animation="border" variant="primary" />
        : error !== null
          ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>Failed to load cars</p>
            </Alert>
          )
        : !isFiltered && cars?.length === 0
          ? (
            <>
              <Alert variant="primary">
                <Alert.Heading>Empty inventory</Alert.Heading>
                <p>There are no cars at this dealership</p>
              </Alert>
              <div className="mt-3 mb-3 clearfix">
                <div className="float-end">
                  <Button type="button" variant="success" onClick={() => setShowAdd(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>{' '}
                    Add Car
                  </Button>
                </div>
              </div>
            </>
          )
        : (
          <>
            <CarsFilterPanel applyFilters={args => setArgs(args)} loading={isFiltering} />
            <div className="mt-3 mb-3 clearfix">
              <div className="float-end">
                <Button type="button" variant="success" onClick={() => setShowAdd(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                  </svg>{' '}
                  Add Car
                </Button>
              </div>
            </div>
            <CarsTable cars={cars} onCarUpdated={onCarUpdated} onCarRemoved={onCarRemoved} />
            {cars?.length === 0 
              ? (
                <Alert variant="primary">
                  <Alert.Heading>No matches</Alert.Heading>
                  <p>There are no cars matching above criteria</p>
                </Alert> 
              )
              : ''}
          </>
        )}
    </div>

    <AddCarModal show={showAdd} onHide={closeAddCar} onCarAdded={onCarAdded} />
    </>
  );
}

export default App;