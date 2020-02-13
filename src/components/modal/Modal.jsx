import React from 'react';
import PropTypes from 'prop-types';

import Portal from './portal/Portal';
import Icon from '../icon/Icon';
import Button from '../button/Button';
import Details from '../details/details';

import './Modal.css';

const Modal = ({
  id, title, isOpen, onCancel, details, ...attrs
}) => {

  return (
    <>
      { isOpen &&
        <Portal>
          <div className="modalOverlay">
            <div className="modalWindow">
              <div className="modalHeader">
                <div className="modalTitle">{title}</div>
                <Icon name="times" onClick={onCancel} />
              </div>
              <div className="modalBody">
                <Details details={details}/>
              </div>
              <div className="modalFooter">
                <Button onClick={onCancel}>Close</Button>
              </div>
            </div>
          </div>
        </Portal>
      }
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onCancel: PropTypes.func,
};

Modal.defaultProps = {
  title: 'Modal title',
  isOpen: false,
  onCancel: () => {},
};

export default Modal;
