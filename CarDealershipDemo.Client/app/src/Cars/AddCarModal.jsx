import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner'
import Badge from 'react-bootstrap/Badge';
import { useState, useMemo, useRef } from 'react';
import { addCar } from '../api';
import Car from './Car';

export default function AddCarModal({ show, onHide, onCarAdded }) {
  const [make, setMake] = useState(null);
  const [year, setYear] = useState(null);
  const [miles, setMiles] = useState(null);
  const [price, setPrice] = useState(null);
  const [color, setColor] = useState(null);
  const [isFourWheelDrive, setIsFourWheelDrive] = useState(null);
  const [hasPowerWindows, setHasPowerWindows] = useState(null);
  const [hasNavigation, setHasNavigation] = useState(null);
  const [hasHeatedSeats, setHasHeatedSeats] = useState(null);
  const [hasSunroof, setHasSunroof] = useState(null);
  const [validated, setValidated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const formRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const years = [currentYear + 1];
    for (let y = currentYear; y >= 1970; y--) {
      years.push(y);
    }
    return years;
  }, [currentYear]);

  async function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = formRef.current;
    const isValid = form.checkValidity();
    setValidated(true);

    if (isValid) {
      setSubmitting(true);
      // handle submission
      const car = new Car();
      car.make = make;
      car.year = year;
      car.miles = miles;
      car.color = color;
      car.isFourWheelDrive = isFourWheelDrive;
      car.hasPowerWindows = hasPowerWindows;
      car.hasNavigation = hasNavigation;
      car.hasHeatedSeats = hasHeatedSeats;
      car.hasSunroof = hasSunroof;
      car.price = price;

      const result = await addCar(car);
      if (result.error !== null) {
        setError(true);
      } else {
        setError(false);
        setValidated(false);
        form.reset();
        onCarAdded(result.cars[0]);
      }

      setSubmitting(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered className="text-start" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} ref={formRef}>
          <Form.Text muted className="mb-3">All fields required</Form.Text>
          <Form.Group as={Row} className="mb-3" controlId="carMake">
            <Form.Label column sm={4}>Make</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Enter the make..." required onChange={e => setMake(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="carYear">
            <Form.Label column sm={4}>Year</Form.Label>
            <Col sm={8}>
              <Form.Select required onChange={e => setYear(e.target.value)}>
                <option value="">Select the year...</option>
                {years.map((year, index) => {
                  return <option key={index} value={year}>{year}</option>
                })}
              </Form.Select>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="carMileage">
            <Form.Label column sm={4}>Miles</Form.Label>
            <Col sm={8}>
              <Form.Control type="number" placeholder="Enter the mileage (to nearest whole mile)..." required onChange={e => setMiles(e.target.value)} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="carColor">
            <Form.Label column sm={4}>Color</Form.Label>
            <Col sm={8}>
              <Form.Select required onChange={e => setColor(e.target.value)}>
                <option value="">Select the color...</option>
                <option value="Black">Black</option>
                <option value="Gray">Gray</option>
                <option value="Silver">Silver</option>
                <option value="White">White</option>
                <option value="Red">Red</option>
                <option value="Green">Green</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
              </Form.Select>
            </Col>
          </Form.Group>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="carDrivetrain">
              <Form.Label column sm={4}>Drivetrain</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="2WD" name="drivetrainOption" id="drivetrain-2wd" required onClick={() => setIsFourWheelDrive(false)} />
                <Form.Check type="radio" inline label="4WD" name="drivetrainOption" id="drivetrain-4wd" required onClick={() => setIsFourWheelDrive(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="carWindows">
              <Form.Label column sm={4}>Power Windows</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="powerWindowsOption" id="powerWindows-no" required onClick={() => setHasPowerWindows(false)} />
                <Form.Check type="radio" inline label="Yes" name="powerWindowsOption" id="powerWindows-yes" required onClick={() => setHasPowerWindows(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="carNavigation">
              <Form.Label column sm={4}>Navigation</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="navigationOption" id="navigation-no" required onClick={() => setHasNavigation(false)} />
                <Form.Check type="radio" inline label="Yes" name="navigationOption" id="navigation-yes" required onClick={() => setHasNavigation(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="carHeatedSeats">
              <Form.Label column sm={4}>Heated Seats</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="HeatedSeatsOption" id="heatedSeats-no" required onClick={() => setHasHeatedSeats(false)} />
                <Form.Check type="radio" inline label="Yes" name="HeatedSeatsOption" id="heatedSeats-yes" required onClick={() => setHasHeatedSeats(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3" controlId="carSunroof">
              <Form.Label column sm={4}>Sunroof</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="sunroofOption" id="sunroof-no" required onClick={() => setHasSunroof(false)} />
                <Form.Check type="radio" inline label="Yes" name="sunroofOption" id="sunroof-yes" required onClick={() => setHasSunroof(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="mb-3" controlId="carPrice">
            <Form.Label column sm={4}>Price</Form.Label>
            <Col sm={8}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type="number" required placeholder="Enter the price (to nearest whole dollar)..." onChange={e => setPrice(e.target.value)} />
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
        {error ? <Badge bg="danger"><h5>Failed to add car</h5></Badge> : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="primary" disabled={submitting} onClick={e => handleSubmit(e)}>
          {submitting 
            ? (<>
                <Spinner animation="border" size="sm" />{' '}
                Submitting...
              </>) 
            : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}