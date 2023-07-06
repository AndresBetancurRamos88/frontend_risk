import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import LoginButton from './Login';

jest.mock('axios');

describe('LoginButton', () => {
    beforeEach(() => {
        axios.mockResolvedValue({ data: { access_token: 'mock-token' } });
    });

    test('renders login button when not logged in', () => {
        render(<LoginButton onLoginChange={() => {}} />);

        const loginButton = screen.getByText('Iniciar sesión');
        expect(loginButton).toBeInTheDocument();
    });

});
