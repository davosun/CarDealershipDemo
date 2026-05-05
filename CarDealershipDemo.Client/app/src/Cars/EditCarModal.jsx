import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useState, useMemo, useRef } from 'react';
import { updateCar } from '../api';
import Car from './Car';

export default function EditCarModal({ show, onHide, handleUpdate, car, index }) {
  const [make, setMake] = useState(car.make);
  const [year, setYear] = useState(car.year);
  const [miles, setMiles] = useState(car.miles);
  const [price, setPrice] = useState(car.price);
  const [color, setColor] = useState(car.color);
  const [isFourWheelDrive, setIsFourWheelDrive] = useState(car.isFourWheelDrive);
  const [hasPowerWindows, setHasPowerWindows] = useState(car.hasPowerWindows);
  const [hasNavigation, setHasNavigation] = useState(car.hasNavigation);
  const [hasHeatedSeats, setHasHeatedSeats] = useState(car.hasHeatedSeats);
  const [hasSunroof, setHasSunroof] = useState(car.hasSunroof);
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

      const result = await updateCar(car);
      if (result.error !== null) {
        setError(true);
      } else {
        setError(false);
        setValidated(false);
        form.reset();
        handleUpdate(result.cars[0], index);
      }

      setSubmitting(false);
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered className="text-start" size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit} ref={formRef}>
          <Form.Text muted className="mb-3">All fields required</Form.Text>
          <Form.Group as={Row} className="mb-3" controlId="carMake">
            <Form.Label column sm={4}>Make</Form.Label>
            <Col sm={8}>
              <Form.Control type="text" placeholder="Enter the make..." required maxLength={50} defaultValue={make} onChange={e => setMake(e.target.value)} />
              <Form.Control.Feedback type="invalid">Car make is required and has a max length of 50 characters</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="carYear">
            <Form.Label column sm={4}>Year</Form.Label>
            <Col sm={8}>
              <Form.Select required defaultValue={year} onChange={e => setYear(e.target.value)}>
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
              <Form.Control type="number" placeholder="Enter the mileage (to nearest whole mile)..." required min={0} max={999999} defaultValue={miles} onChange={e => setMiles(e.target.value)} />
              <Form.Control.Feedback type="invalid">Mileage is required and must be between 0 and 999999 (inclusive)</Form.Control.Feedback>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="carColor">
            <Form.Label column sm={4}>Color</Form.Label>
            <Col sm={8}>
              <Form.Select required defaultValue={color} onChange={e => setColor(e.target.value)}>
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
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Drivetrain</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="2WD" name="drivetrainOption" id="drivetrain-2wd" required defaultChecked={!isFourWheelDrive} onClick={() => setIsFourWheelDrive(false)} />
                <Form.Check type="radio" inline label="4WD" name="drivetrainOption" id="drivetrain-4wd" required defaultChecked={isFourWheelDrive} onClick={() => setIsFourWheelDrive(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Power Windows</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="powerWindowsOption" id="powerWindows-no" required defaultChecked={!hasPowerWindows} onClick={() => setHasPowerWindows(false)} />
                <Form.Check type="radio" inline label="Yes" name="powerWindowsOption" id="powerWindows-yes" required defaultChecked={hasPowerWindows} onClick={() => setHasPowerWindows(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Navigation</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="navigationOption" id="navigation-no" required defaultChecked={!hasNavigation} onClick={() => setHasNavigation(false)} />
                <Form.Check type="radio" inline label="Yes" name="navigationOption" id="navigation-yes" required defaultChecked={hasNavigation} onClick={() => setHasNavigation(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Heated Seats</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="HeatedSeatsOption" id="heatedSeats-no" required defaultChecked={!hasHeatedSeats} onClick={() => setHasHeatedSeats(false)} />
                <Form.Check type="radio" inline label="Yes" name="HeatedSeatsOption" id="heatedSeats-yes" required defaultChecked={hasHeatedSeats} onClick={() => setHasHeatedSeats(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={4}>Sunroof</Form.Label>
              <Col sm={8}>
                <Form.Check type="radio" inline label="No" name="sunroofOption" id="sunroof-no" required defaultChecked={!hasSunroof} onClick={() => setHasSunroof(false)} />
                <Form.Check type="radio" inline label="Yes" name="sunroofOption" id="sunroof-yes" required defaultChecked={hasSunroof} onClick={() => setHasSunroof(true)} />
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row} className="mb-3" controlId="carPrice">
            <Form.Label column sm={4}>Price</Form.Label>
            <Col sm={8}>
              <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type="number" required min={0} max={999999999} defaultValue={price} placeholder="Enter the price (to nearest whole dollar)..." onChange={e => setPrice(e.target.value)} />
                <InputGroup.Text>.00</InputGroup.Text>
                <Form.Control.Feedback type="invalid">Price is required and must be between 0 and 999999999 (inclusive)</Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>
        </Form>
        {error 
          ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>Failed to update car</p>
            </Alert> 
          )
          : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="primary" disabled={submitting} onClick={e => handleSubmit(e)}>
          {submitting 
            ? (
              <>
                <Spinner animation="border" size="sm" />{' '}
                Submitting...
              </>
            ) 
            : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>{' '}
                Submit
              </>
            )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}