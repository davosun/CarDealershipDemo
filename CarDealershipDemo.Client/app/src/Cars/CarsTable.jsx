import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import EditCarModal from './EditCarModal';
import RemoveCarModal from './RemoveCarModal';
import Car from './Car';

function CarsTable({ cars, onCarUpdated, onCarRemoved }) {
  const [showEdit, setShowEdit] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [editCar, setEditCar] = useState(null);
  const [removeCar, setRemoveCar] = useState(null);
  const [index, setIndex] = useState(null);

  function closeEditCar() {
    setShowEdit(false);
  }

  function closeRemoveCar() {
    setShowRemove(false);
  }

  function openEditCar(car, index) {
    setEditCar(car);
    setIndex(index);
    setShowEdit(true);
  }

  function openRemoveCar(car, index) {
    setRemoveCar(car);
    setIndex(index);
    setShowRemove(true);
  }

  function handleUpdate(car, index) {
    onCarUpdated(car, index);
    closeEditCar();
  }

  function handleRemove(car, index) {
    onCarRemoved(car, index);
    closeRemoveCar();
  }

  useEffect(() => {
    if (!showEdit) {
      setTimeout(() => {
        setEditCar(null);
      }, 500);
    }

    if (!showRemove) {
      setTimeout(() => {
        setRemoveCar(null);
      }, 500);
    }

    if (!showEdit && !showRemove) {
      setIndex(null);
    }
  }, [showEdit, showRemove])

  return (
    <>
      {editCar !== null
        ? <EditCarModal show={showEdit} onHide={closeEditCar} car={editCar} index={index} handleUpdate={handleUpdate} />
        : ''}
      {removeCar !== null
        ? <RemoveCarModal show={showRemove} onHide={closeRemoveCar} car={removeCar} index={index} handleRemove={handleRemove} />
        : ''}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Make</th>
            <th>Year</th>
            <th>Color</th>
            <th>Miles</th>
            <th>Price</th>
            <th>Drivetrain</th>
            <th>Sunroof</th>
            <th>Power Windows</th>
            <th>Navigation</th>
            <th>Heated Seates</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, index) => {
            return (
              <tr key={index}>
                <td>{car.make}</td>
                <td>{car.year}</td>
                <td>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="black" className="mb-1">
                    <rect width="100%" height="100%" fill={car.colorHexCode} />
                  </svg>{' '}
                  {car.color}
                </td>
                <td>{car.displayMiles}</td>
                <td>{car.displayPrice}</td>
                <td>{car.isFourWheelDrive ? '4WD' : '2WD'}</td>
                <td>{car.hasSunroof
                  ? <YesIcon />
                  : <NoIcon />}
                </td>
                <td>{car.hasPowerWindows
                  ? <YesIcon />
                  : <NoIcon />}
                </td>
                <td>{car.hasNavigation
                  ? <YesIcon />
                  : <NoIcon />}
                </td>
                <td>{car.hasHeatedSeats
                  ? <YesIcon />
                  : <NoIcon />}
                </td>
                <td>
                  <Button type="button" variant="primary" size="sm" onClick={() => openEditCar(car, index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                    </svg>{' '}
                    Edit
                  </Button>{' '}
                  <Button type="button" variant="outline-danger" size="sm" onClick={() => openRemoveCar(car, index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>{' '}
                    Remove
                  </Button>
                </td>
              </tr>
          )})}
        </tbody>
      </Table>
    </>
  );
}

function YesIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle text-success" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
    </svg>
  );
}

function NoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle text-danger" viewBox="0 0 16 16">
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  );
}
      
export default CarsTable;