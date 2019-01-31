import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/modal.css';

const Modal = ({ handleClose, show, children }) => (
  <div className={show ? 'modal display-block' : 'modal display-none'}>
    <section className="modal-content">
      {children}
      <div className="btn-div">
        <button type="button" className="modal-btn" onClick={handleClose}>close</button>
      </div>
    </section>
  </div>
);

Modal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
