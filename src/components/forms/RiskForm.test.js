import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import RiskForm from './RiskForm';

jest.mock('axios');

describe('RiskForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('should render risk form and submit successfully', async () => {
    const riskData = [
      { id: 1, risk: 'Risk 1' },
      { id: 2, risk: 'Risk 2' },
      { id: 3, risk: 'Risk 3' }
    ];

    const token = {
      access_token: 'mock-access-token',
      userinfo: { user_id: 'mock-user-id' }
    };

    localStorage.setItem('token', JSON.stringify(token));

    axios.mockResolvedValueOnce({ status: 200, data: riskData });
    axios.mockResolvedValueOnce({ status: 201, data: { message: 'Registro guardado' } });

    render(<RiskForm />);

    // Wait for the risk data to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText('Risk')).toBeInTheDocument();
    });

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const impactInput = screen.getByLabelText('Impact');
    const probabilityInput = screen.getByLabelText('Probability');
    const submitButton = screen.getByRole('button', { name: 'Guardar' });

    fireEvent.change(titleInput, { target: { value: 'Example Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Example Description' } });
    fireEvent.change(impactInput, { target: { value: 'Example Impact' } });
    fireEvent.change(probabilityInput, { target: { value: '50' } });

    fireEvent.click(submitButton);

    // Wait for the form submission and response handling
    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith({
        url: 'http://localhost:8000/risk_history',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-access-token'
        },
        data: {
          description: 'Example Description',
          user_id: 'mock-user-id',
          impact: 'Example Impact',
          probability: '50',
          risk_id: '',
          title: 'Example Title'
        },
        withCredentials: true
      });
      expect(screen.getByText('Éxito')).toBeInTheDocument();
      expect(screen.getByText('Registro guardado')).toBeInTheDocument();
    });
  });

  test('should render error message when form submission fails', async () => {
    const riskData = [
      { id: 1, risk: 'Risk 1' },
      { id: 2, risk: 'Risk 2' },
      { id: 3, risk: 'Risk 3' }
    ];

    const token = {
      access_token: 'mock-access-token',
      userinfo: { user_id: 'mock-user-id' }
    };

    localStorage.setItem('token', JSON.stringify(token));

    axios.mockResolvedValueOnce({ status: 200, data: riskData });
    axios.mockRejectedValueOnce(new Error('Error al guardar el registro'));

    render(<RiskForm />);

    // Wait for the risk data to be loaded
    await waitFor(() => {
      expect(screen.getByLabelText('Risk')).toBeInTheDocument();
    });

    const submitButton = screen.getByRole('button', { name: 'Guardar' });

    fireEvent.click(submitButton);

    // Wait for the form submission and error handling
    await waitFor(() => {
      expect(axios).toHaveBeenCalledWith({
        url: 'http://localhost:8000/risk_history',
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer mock-access-token'
        },
        data: {
          description: '',
          user_id: 'mock-user-id',
          impact: '',
          probability: '',
          risk_id: '',
          title: ''
        },
        withCredentials: true
      });
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Error al guardar el registro')).toBeInTheDocument();
    });
  });
});
