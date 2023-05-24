import React, { useState } from 'react';
import { Grid } from '@mui/material';
import CertCard from './CertCard';
import ModalLayout from '../Common/ModalLayout';
import CreateCertForm from './CreateCertForm';

const generateRandomNumber = () => {
    const randomDecimal = Math.random();
    const randomNumber = randomDecimal * (5 - 2) + 2;
    const roundedNumber = Math.round(randomNumber);  
    return roundedNumber;
}

const ListCertifications = () => {

    const [openModal, setOpenModal] = useState(false);
    const items: any[] = [];
    for(let i = 0; i < 15; i++){
        const counter = generateRandomNumber();
        const certification = {
            name: `Certification Name ${i+1}`,
            description: `Certification Description ${i+1}`,
            requirements: new Array(counter)
        }
        let initial = 0
        while(initial <= counter){
            certification.requirements.push(`Requirement ${initial+1}`);
            initial++;
        }
        items.push(<CertCard key={`certCard_${i}`} certification={certification} editHandler={setOpenModal}/>);
    }
    return (
        <Grid item xs={12}>
            <Grid container spacing={4}>
                {items}
            </Grid>
            {openModal &&
            <ModalLayout
            handleClose={()=>setOpenModal(false)}
            maxWidth='sm'
            title='Edit Certification'>
                <CreateCertForm/>
            </ModalLayout>}
        </Grid>
    );
}

export default ListCertifications;