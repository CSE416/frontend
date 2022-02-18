import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

export const AddGraph = () => {
    const [open, setOpen] = useState(false);
  
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
  
    return (
      <div className='modal-container'>
        <button className='menu-btn' onClick={onOpenModal}>Add Graph</button>
        <Modal open={open} onClose={onCloseModal} center>
          <div id='graph-modal'>
            <h3>Choose a Graph to Display</h3>
            <ul id='graph-container'>
                <li>Box and whisker plot</li>
                <li>Seat vs Vote Symmetry</li>
                <li>Radviz</li>
                <li>Opportunity District Threshold Sensitivity</li>
                <li>Radar Chart</li>
            </ul>
            <button onClick={onCloseModal}>
                Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
};