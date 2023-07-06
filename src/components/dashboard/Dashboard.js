import useFetch from '../hooks/useFetch';
import DataTableComponent from '../dataTable/DataTable';
import '../css/Loader.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

function Dashboard() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [searchType, setSearchType] = useState('id');
    const [currentPage, setCurrentPage] = useState(1);
    const [currentURL, setCurrentUrl] = useState(`${baseUrl}/risk_history`);
    const { error, isPending, data } = useFetch(`${currentURL}/${currentPage}`, true);

    const [formData, setFormData] = useState({
        searchType: 'id',
        id: '',
        text: '',
        title: '',
        description: '',
        impact: ''
    });

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleInputChange = (e) => {
        if (e.target.id === 'searchType') {
            setSearchType(e.target.value);
        }
        const { id, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [id]: value
        }));
    };

    const handleButtonClick = (e) => {
        e.preventDefault();
        switch (searchType) {
            case 'id':
                setCurrentUrl(`${baseUrl}/risk_history/${formData.id}`)
                setCurrentPage(1)
                break;
            case 'text':
                setCurrentUrl(`${baseUrl}/risk_history/${formData.text}`)
                setCurrentPage(1)
                break;
            case 'advanced':
                setCurrentUrl(`${baseUrl}/risk_history/${formData.impact}/${formData.description}/${formData.title}`)
                setCurrentPage(1)
                break;
            default:
                break;
        }
    };
  
    const renderSearchFields = () => {
        switch (searchType) {
            case 'id':
                return (
                <Col xs="auto">
                    <Form.Control type="number" id="id" placeholder="id" value={formData.id} onChange={handleInputChange} />
                </Col>
                );
            case 'text':
                return (
                <Col xs="auto">
                    <Form.Control type="text" id="text" placeholder="Título o descripción" value={formData.text} onChange={handleInputChange} />
                </Col>
                );
            case 'advanced':
                return (
                <>
                    <Col xs="auto">
                        <Form.Control type="text" id="title" placeholder="Título" value={formData.title} onChange={handleInputChange} />
                    </Col>
                    <Col xs="auto">
                        <Form.Control type="text" id="description" placeholder="Descripción" value={formData.description} onChange={handleInputChange} />
                    </Col>
                    <Col xs="auto">
                        <Form.Control type="text" id="impact" placeholder="Impacto" value={formData.impact} onChange={handleInputChange} />
                    </Col>
                </>
                );
            default:
                return null;
            }
    };

    useEffect(() => {
        if (data && data.message) {
            Swal.fire({
                icon: 'info',
                text: data.message,
            });
        }
    }, [data]);

    return (
        <>
        <div className='container'>
            <Form className="row g-3">
            <Col xs="auto">
                <Form.Group as={Row} className="align-items-center">
                <Form.Label htmlFor="searchType" column sm="auto" >
                    Tipo de Búsqueda
                </Form.Label>
                <Col sm="auto">
                    <Form.Select id="searchType" value={searchType} onChange={handleInputChange}>
                    <option value="id">Buscar por ID</option>
                    <option value="text">Buscar por texto</option>
                    <option value="advanced">Búsqueda avanzada</option>
                    </Form.Select>
                </Col>
                </Form.Group>
            </Col>
            {renderSearchFields()} {/* Renderiza los campos correspondientes según el tipo de búsqueda */}
            <Col xs="auto">
                <Button type="submit" variant="secondary" className="mb-3" onClick={handleButtonClick}>Buscar</Button>
            </Col>
            </Form>
        </div>
        <div className="dashboard">
            {error && <div>{error}</div>}
            {isPending && (
                <div className='codepad-logo'>
                    <div className='logo'></div>
                </div>
            )}
            {data && !data.message && (
                <DataTableComponent data={data} onPageChange={handlePageChange}  />
            )}
        </div>
        </>
    );
}

export default Dashboard;
