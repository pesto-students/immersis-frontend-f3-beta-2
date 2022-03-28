import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import SignUp from '../components/UI/SignUp';
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
                    <SignUp />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
});

describe('=> Test Signup Component', () => {
    test('Input Field First Name', () => {
        const userName = screen.getByLabelText(/First Name/);
        expect(userName).toBeInTheDocument();
    });

    test('Input Field Last Name', () => {
        const userName = screen.getByLabelText(/Last Name/);
        expect(userName).toBeInTheDocument();
    });

    test('Input Field Email', () => {
        const email = screen.getByLabelText(/Email/);
        expect(email).toBeInTheDocument();
    });

    test('Input Field Password', () => {
        const pass = screen.getByPlaceholderText(/Enter your Password/);
        expect(pass).toBeInTheDocument();
    });

    test('Input Field Confirm Password', () => {
        const cpass = screen.getByLabelText(/Confirm Password/);
        expect(cpass).toBeInTheDocument();
    });

    test('Signup Button', () => {
        const login = screen.getByRole(/button/);
        expect(login).toHaveTextContent('Sign Up');
    });
});
