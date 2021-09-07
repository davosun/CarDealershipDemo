import { carsApi } from '../App';
import { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CarsFilterPanel(props) {
    const [colorFilter, setColorFilter] = useState('');
    const [sunroofFilter, setSunroofFilter] = useState(null);
    const [fourWheelDriveFilter, setFourWheelDriveFilter] = useState(null);
    const [lowMilesFilter, setLowMilesFilter] = useState(null);
    const [powerWindowsFilter, setPowerWindowsFilter] = useState(null);
    const [navigationFilter, setNavigationFilter] = useState(null);
    const [heatedSeatsFilter, setHeatedSeatsFilter] = useState(null);
    const [mileageThresholdFilter, setMileageThresholdFilter] = useState(null);
    const [strictSearchMode, setStrictSearchMode] = useState(false);

    function fetchFilteredCars(event) {
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

        props.fetchFilteredCars(uri);
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

        props.clearFilters();
    }

    return (
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
    );
}

export default CarsFilterPanel;