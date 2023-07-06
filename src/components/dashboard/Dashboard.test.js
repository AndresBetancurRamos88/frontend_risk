import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';

// Mock useFetch hook
jest.mock('../hooks/useFetch', () => () => ({
    error: null,
    isPending: false,
    data: null,
}));

// Mock Swal.fire
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
}));

describe('Dashboard', () => {
    test('renders Dashboard component', () => {
        render(<Dashboard />);
        expect(screen.getByText('Tipo de Búsqueda')).toBeInTheDocument();
    });

    test('handles search type change', () => {
        render(<Dashboard />);
        const selectElement = screen.getByLabelText('Tipo de Búsqueda');

        fireEvent.change(selectElement, { target: { value: 'text' } });

        expect(selectElement.value).toBe('text');
    });

    test('handles search form submission', () => {
        render(<Dashboard />);
        const searchButton = screen.getByText('Buscar');

        fireEvent.click(searchButton);
    });
});
