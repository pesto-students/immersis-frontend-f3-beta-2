import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Login from '../components/UI/Login';
import { store } from '../store';

beforeEach(() => {
    const font = "'Baloo Bhaijaan 2', cursive;";
    const theme = createTheme({
        typography: {
            fontFamily: font
        }
    });
    render(
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Login />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
});

describe('=> Test Login Component', () => {
    test('Input Field Name', () => {
        const name = screen.getByLabelText(/Email/);
        expect(name).toBeInTheDocument();
    });

    test('Input Field Password', () => {
        const pass = screen.getByLabelText(/Password/);
        expect(pass).toBeInTheDocument();
    });

    test('Login Button', () => {
        const login = screen.getByRole(/button/);
        expect(login).toHaveTextContent('Log In');
    });
});
