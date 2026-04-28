import { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { CarFilterArgs } from '../api';

function CarsFilterPanel({ applyFilters }) {
    const [colorFilter, setColorFilter] = useState(null);
    const [sunroofFilter, setSunroofFilter] = useState(null);
    const [fourWheelDriveFilter, setFourWheelDriveFilter] = useState(null);
    const [lowMilesFilter, setLowMilesFilter] = useState(null);
    const [powerWindowsFilter, setPowerWindowsFilter] = useState(null);
    const [navigationFilter, setNavigationFilter] = useState(null);
    const [heatedSeatsFilter, setHeatedSeatsFilter] = useState(null);
    const [mileageThresholdFilter, setMileageThresholdFilter] = useState(null);
    const [strictSearchMode, setStrictSearchMode] = useState(null);

    function clearFilters() {
        setColorFilter(null);
        setSunroofFilter(null);
        setFourWheelDriveFilter(null);
        setLowMilesFilter(null);
        setPowerWindowsFilter(null);
        setNavigationFilter(null);
        setHeatedSeatsFilter(null);
        setMileageThresholdFilter(null);
        setStrictSearchMode(null);

        applyFilters(new CarFilterArgs());
    }

    useEffect(() => {
      if (strictSearchMode === null
        && lowMilesFilter === null
        && fourWheelDriveFilter === null
        && navigationFilter === null
        && heatedSeatsFilter === null
        && powerWindowsFilter === null
        && sunroofFilter === null
        && colorFilter === null) {
          return;
        }
        
      const args = new CarFilterArgs();
      args.strictSearch = strictSearchMode;
      args.color = colorFilter;
      args.isFourWheelDrive = fourWheelDriveFilter;
      args.hasLowMiles = lowMilesFilter;
      args.lowMileageThreshold = !Number.isNaN(parseInt(mileageThresholdFilter)) ? mileageThresholdFilter : 25000;
      args.hasNavigation = navigationFilter;
      args.hasPowerWindows = powerWindowsFilter;
      args.hasSunroof = sunroofFilter;
      args.hasHeatedSeats = heatedSeatsFilter;
      
      applyFilters(args);
    }, [colorFilter, sunroofFilter, fourWheelDriveFilter, lowMilesFilter, powerWindowsFilter, navigationFilter, heatedSeatsFilter, mileageThresholdFilter, strictSearchMode])

    return (
        <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-filter-square-fill text-info" viewBox="0 0 16 16">
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm.5 5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1 0-1zM4 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm2 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </Accordion.Header>
          <Accordion.Body>
            <Form noValidate onReset={clearFilters} className="text-start">
              <Row>                
                <Form.Group as={Col} sm={6} className="mb-3" controlId="colorOption">
                  <Form.Label>Color</Form.Label>
                  <Form.Select onChange={e => setColorFilter(e.target.value)}>
                    <option value="">-- Any --</option>
                    <option value="Black">Black</option>
                    <option value="Gray">Gray</option>
                    <option value="Silver">Silver</option>
                    <option value="White">White</option>
                    <option value="Red">Red</option>
                    <option value="Green">Green</option>
                    <option value="Blue">Blue</option>
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
                    <Button variant="secondary" type="reset">Clear</Button>
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