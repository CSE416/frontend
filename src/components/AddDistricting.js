import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const AddDistricting = () => {
    const [open, setOpen] = useState(false);
  
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
    return (
      <div className='modal-container'>
        <button className='menu-btn' onClick={onOpenModal}>Add Districting</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div id='districting-modal'>
            <h3>Choose Districtings to Display</h3>
            <div>
            <ul id='plan-container'>
                <li>District Plan 1</li>
                <li>District Plan 2</li>
                <li>District Plan 3</li>
                <li>District Plan 4</li>
            </ul>
            </div>
            <button>
                Display
            </button>
          </div>
        </Modal>
      </div>
    );
};