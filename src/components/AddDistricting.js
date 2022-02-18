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
            <img src='https://s3-alpha-sig.figma.com/img/ec7f/f2ed/04b167d7dd7fa1d01c3afd1f6e700d0f?Expires=1646006400&Signature=OwhBj4E9XdQOzauQASc1VogVONXsho9OVFYC5-fTFPUUbeH05yCLx47bwc4O-mSrz6Du7Qh411Ow1g615tZa7bavn7xN833myoRw-9TX9kJY9lUlCqP0wvPzT569Xc1o~P9DxVojYVkthiR2iQQNA4wMf893V74FWGkWePT3cdApSmMCLsjE3MkmrAd18jXRPcISyVYRizwmao0hQ8w35E~-bUOY5EaOOPoona6RVajixq1JQPgnXAhpNAN9Y~oaU8myqiPUl8R5VRy~tCBoatRW9ydqxIEG1eerGCTeA5UZZM-lZ9OzZprJsZygiMICn-8chvrmhUM6j8ZuvsBHbA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA' />
            </div>
            <button>
                Display
            </button>
          </div>
        </Modal>
      </div>
    );
};