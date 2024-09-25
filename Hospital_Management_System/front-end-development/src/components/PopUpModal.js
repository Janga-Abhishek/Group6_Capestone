import React, {useEffect, useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TbVaccine } from "react-icons/tb";

export default function PopUpModal({ openModal, closeModal }){
    return(
        <Modal  dialogClassName="custom-modal" show={openModal} onHide={closeModal} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Modal.Header closeButton>
          <Modal.Title>Get Your Vaccine</Modal.Title>
        </Modal.Header>
        <Modal.Body className='d-flex'>
        <TbVaccine size="144" style={{marginTop:"3rem", padding:"1rem"}}/>
            <section className='w-50'>
                In Canada, the flu season usually starts in October and peaks between December and February, with activity declining by April. The timing and intensity of the flu season can vary each year and across different regions. 
                For optimal protection, it's recommended to get your flu vaccination early in the season.<br></br>  
                <a href='https://www.canada.ca/en/public-health/services/diseases/flu-influenza/get-your-flu-shot.html'>More Info</a>
            </section>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
}