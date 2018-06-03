import React from 'react';
import { FaClose } from 'react-icons/lib/fa';

const Modal = ({ handleClose, show, children }) => {
  const styles = {
    modalMain: {
      position: 'fixed',
      background: 'white',
      width: '60%',
      height: 'auto',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
    },
    modal: {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)',
      display: show ? 'block' : 'none'
    },
    closeButton: {
      float: 'right'
    }
  }
  return (
    <div style={styles.modal}>
      <section style={styles.modalMain}>
        {children}
        <button onClick={handleClose}>
          <FaClose />
        </button>
      </section>
    </div>
  );
};

export default Modal;
