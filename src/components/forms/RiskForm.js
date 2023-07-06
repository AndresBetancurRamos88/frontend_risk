import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import useFetch from '../hooks/useFetch';
import Swal from 'sweetalert2';
import '../css/Loader.css';

function RiskForm() {
    const { data } = useFetch('http://localhost:8000/risk', true);
    const [postPending, setPostPending] = useState(false)
    const [loadertPending, setLoaderPending] = useState(false)

    const [formData, setFormData] = useState({
        description: '',
        user_id: JSON.parse(localStorage.getItem('token')).userinfo.user_id,
        impact: '',
        probability: '',
        risk_id: '',
        title: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        setLoaderPending(true)
        event.preventDefault();
        axios({
            url: 'http://localhost:8000/risk_history',
            method: 'POST',         
            headers: {
               'Accept': '*/*',
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`
            },
            data: formData,
            withCredentials: true
        })
        .then(response => {
            if (response.status !== 201){
               throw new Error('No se pudo guardar el registro')
            }
            setPostPending(true)
            return response.data
        })
        .then(data => {
            Swal.fire('Éxito', data.message, 'success');
        })
        .catch(error => {
            setPostPending(false)
            Swal.fire('Error', error.message, 'error');
        })
        .finally(() => {
            setLoaderPending(false)
        });
    };

    return (
        <>
        { loadertPending && (
            <div className='codepad-logo'>
                <div className='logo'></div>
            </div>
        )}
        <Container style={{position: "absolute", left: "30%"}}>
            <Form onSubmit={handleSubmit} className="mx-3">
                <Form.Group controlId="risk" className="col-6">
                    <Form.Label className="text-left">Risk</Form.Label>
                    <Form.Select className="form-control form-control-sm" name="risk_id" value={formData.risk} onChange={handleInputChange} required >
                            <option value="">Selecciona un riesgo</option>
                            {data && data.map((field) => (
                                <option key={field.id} value={field.id}>
                                    {field.risk}
                                </option>
                            ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="title" className="col-6">
                    <Form.Label className="text-right">Title</Form.Label>
                    <Form.Control className="form-control form-control-sm " type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="description" className="col-6">
                    <Form.Label className="text-left">Description</Form.Label>
                    <Form.Control className="form-control form-control-sm" as="textarea" name="description" value={formData.description} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="impact" className="col-6">
                    <Form.Label className="text-left">Impact</Form.Label>
                    <Form.Control className="form-control form-control-sm" type="text" name="impact" value={formData.impact} onChange={handleInputChange} required />
                </Form.Group>
                <Form.Group controlId="probability" className="col-6">
                    <Form.Label className="text-left">Probability</Form.Label>
                    <Form.Control className="form-control form-control-sm" type="number" name="probability" value={formData.probability} onChange={handleInputChange} required />
                </Form.Group>
                { !postPending && <Button variant="secondary" type="submit" className="mt-3" >Guardar</Button> }
                { postPending && <Button variant="secondary" type="submit" className="mt-3" disabled>Guardar</Button> }
            </Form>
        </Container>
        </>
    );
}

export default RiskForm;
