import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'
import { useState } from 'react';
import { removeCar } from '../api';

export default function RemoveCarModal({ show, onHide, car, index, handleRemove }) {
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState(false);

  async function handleConfirm(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    setRemoving(true);

    const result = await removeCar(car);
    if (result.error !== null) {
      setError(true);
    } else {
      setError(false);
      handleRemove(result.cars[0], index);
    }

    setRemoving(false);
  }

  return (
    <Modal show={show} onHide={onHide} centered className="text-start">
      <Modal.Header closeButton>
        <Modal.Title>Remove Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to remove this car?</p>
        {error 
          ? (
            <Alert variant="danger">
              <Alert.Heading>Error</Alert.Heading>
              <p>Failed to remove car</p>
            </Alert> 
          )
          : ''}
      </Modal.Body>
      <Modal.Footer>
        <Button type="button" variant="primary" disabled={removing} onClick={e => handleConfirm(e)}>
          {removing 
            ? (
              <>
                <Spinner animation="border" size="sm" />{' '}
                Removing...
              </>
            ) 
            : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>{' '}
                Confirm
              </>
            )}
        </Button>
        <Button type="button" variant="secondary" disabled={removing} onClick={onHide}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
          </svg>{' '}
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  )
}