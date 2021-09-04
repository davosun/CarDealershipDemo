import './App.css';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const carsApi = 'api/cars';

function App() {
  const [cars, setCars] = useState([]);
  const [colorFilter, setColorFilter] = useState('');
  const [sunroofFilter, setSunroofFilter] = useState(null);
  const [fourWheelDriveFilter, setFourWheelDriveFilter] = useState(null);
  const [lowMilesFilter, setLowMilesFilter] = useState(null);
  const [powerWindowsFilter, setPowerWindowsFilter] = useState(null);
  const [navigationFilter, setNavigationFilter] = useState(null);
  const [heatedSeatsFilter, setHeatedSeatsFilter] = useState(null);
  const [mileageThresholdFilter, setMileageThresholdFilter] = useState(null);
  const [strictSearchMode, setStrictSearchMode] = useState(false);

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
        .then(error => console.error('Failed to load cars.', error))
        .catch(() => console.error('Failed to load cars.'));
      }
    } catch (error) {
      console.error('Failed to load cars.', error);
    }
  }

  async function fetchFilteredCars(event) {
    event.preventDefault();
    let uri = `${carsApi}/filter?strictSearch=${strictSearchMode}`;
    if (!!colorFilter) {
      uri += `&color=${colorFilter}`;
    }
    if (!!sunroofFilter) {
      uri += `&hasSunroof=${sunroofFilter}`
    }
    if (!!fourWheelDriveFilter) {
      uri += `&isFourWheelDrive=${fourWheelDriveFilter}`;
    }
    if (!!lowMilesFilter) {
      uri += `&hasLowMiles=${lowMilesFilter}`
    }
    if (!!powerWindowsFilter) {
      uri += `&hasPowerWindows=${powerWindowsFilter}`;
    }
    if (!!navigationFilter) {
      uri += `&hasNavigation=${navigationFilter}`
    }
    if (!!heatedSeatsFilter) {
      uri += `&hasHeatedSeats=${heatedSeatsFilter}`;
    }
    if (!!mileageThresholdFilter) {
      uri += `&mileageThreshold=${mileageThresholdFilter}`
    }

    try {
      const response = await fetch(uri);
      if (response.ok) {
        response.json().then(data => setCars(data));
      } else {
        response.json()
        .then(error => console.error('Failed to load cars.', error))
        .catch(() => console.error('Failed to load cars.'));
      }
    } catch (error) {
      console.error('Failed to load cars.', error);
    }
  }

  function clearFilters() {
    setColorFilter(null);
    setSunroofFilter(false);
    setFourWheelDriveFilter(false);
    setLowMilesFilter(false);
    setPowerWindowsFilter(false);
    setNavigationFilter(false);
    setHeatedSeatsFilter(false);
    setMileageThresholdFilter(false);
    setStrictSearchMode(false);
    fetchCars();
  }

  return (
    <div className="App container">
      <h1>
        Car Dealership <Badge bg="warning">Demo</Badge>
      </h1>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-filter-square-fill text-info" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zM4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </Accordion.Header>
          <Accordion.Body>
            <Form noValidate onSubmit={fetchFilteredCars} onReset={clearFilters} className="text-start">
              <Row>                
                <Form.Group as={Col} sm={6} className="mb-3" controlId="colorOption">
                  <Form.Label>Color</Form.Label>
                  <Form.Select onChange={e => setColorFilter(e.target.value)}>
                    <option value="">No preference</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Silver">Silver</option>
                    <option value="Gray">Gray</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} sm={6} className="mb-3" controlId="mileageThresholdSetting">
                  <Form.Label>Low Mileage Threshold</Form.Label>
                  <Form.Control type="number" placeholder="25000" onKeyUp={e => setMileageThresholdFilter(e.target.value)} />
                </Form.Group>
              </Row>
              <Row>
                <Col md={3}>                  
                  <Form.Group className="mb-3" controlId="lowMileageOption">
                    <Form.Check type="checkbox" label="Low Mileage" onClick={e => setLowMilesFilter(e.target.checked)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="fourWheelDriveOption">
                    <Form.Check type="checkbox" label="4WD" onClick={e => setFourWheelDriveFilter(e.target.checked)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="powerWindowsOption">
                    <Form.Check type="checkbox" label="Power Windows" onClick={e => setPowerWindowsFilter(e.target.checked)} />
                  </Form.Group>
                </Col>
                <Col md={3}>                  
                  <Form.Group className="mb-3" controlId="sunroofOption">
                    <Form.Check type="checkbox" label="Sunroof" onClick={e => setSunroofFilter(e.target.checked)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="heatedSeatsOption">
                    <Form.Check type="checkbox" label="Heated Seats" onClick={e => setHeatedSeatsFilter(e.target.checked)} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="navigationOption">
                    <Form.Check type="checkbox" label="Navigation" onClick={e => setNavigationFilter(e.target.checked)} />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="strictSearchOption">
                      <Form.Check type="checkbox" label="Match all criteria" onClick={e => setStrictSearchMode(e.target.checked)} />
                  </Form.Group>
                  <Form.Group>
                    <Button variant="primary" type="submit" className="me-3">Apply</Button>
                    <Button variant="light" type="reset">Clear</Button>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Make</th>
            <th>Year</th>
            <th>Color</th>
            <th>Price</th>
            <th>Miles</th>
            <th>Drivetrain</th>
            <th>Sunroof</th>
            <th>Power Windows</th>
            <th>Navigation</th>
            <th>Heated Seates</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => {
            car.colorCodeHex = `#${car.colorCode.toString(16)}`
            return (
            <tr key={index}>
              <td>{car.make}</td>
              <td>{car.year}</td>
              <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="black">
                    <rect width="100%" height="100%" fill={car.colorCodeHex} />
                  </svg>{' '}
                {car.color}
              </td>
              <td>${car.price}</td>
              <td>{car.miles}</td>
              <td>{car.isFourWheelDrive ? '4WD' : '2WD'}</td>
              <td>{car.hasSunroof
                ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>)
                : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>)}
              </td>
              <td>{car.hasPowerWindows
                ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>)
                : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>)}
              </td>
              <td>{car.hasNavigation
                ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>)
                : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>)}
              </td>
              <td>{car.hasHeatedSeats
                ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
                  </svg>)
                : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>)}
              </td>
            </tr>
          )})}
        </tbody>
      </Table>
    
    </div>
  );
}

export default App;
