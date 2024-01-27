import React, { useState } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';

const ErrorPopup = ({ errorMessage, onClose }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Erreur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="danger">{errorMessage}</Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ErrorPopup;
