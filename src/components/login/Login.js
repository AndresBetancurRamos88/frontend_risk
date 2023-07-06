import { useState, useEffect, useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const LoginButton = ({ onLoginChange }) => {
    const history = useHistory();

    const [login, setLogin] = useState(false);
    
    const handleLogin = () => {
        window.location.href = 'http://localhost:8000/login';
    };

    const handleLogout = useCallback(() => {
        const fetchLogout = (url) => {
            axios({
                url: url,
                method: 'GET',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            .then(response => {
                localStorage.removeItem('token');
                setLogin(false);
                onLoginChange(false);
                history.push('/');
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
        };
    
        fetchLogout('http://localhost:8000/logout');
    }, [history, onLoginChange]);
    
    
    useEffect(() => {
        axios({
            url: 'http://localhost:8000/token',
            method: 'GET',         
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(response => {
            const token = response.data;
            if (response.data.access_token) {
                localStorage.setItem('token', JSON.stringify(token));
                setLogin(true);
                onLoginChange(true);
            }
        })
        .catch(error => {
            localStorage.removeItem('token');
        });
    }, [onLoginChange]); 

    return (
        <>
            { !login && (
                <Button 
                variant="outline-dark" 
                className="ms-auto" 
                style={{ marginRight: "10px" }}
                onClick={handleLogin}
                >
                    Iniciar sesión
                </Button>
            )}

            {login && (
                <Button 
                    variant="outline-dark" 
                    className="ms-auto" 
                    style={{ marginRight: "10px" }}
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            )}
        </>
    );
}

export default LoginButton;
