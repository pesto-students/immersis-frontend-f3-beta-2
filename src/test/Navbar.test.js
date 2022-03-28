import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/UI/Navbar';
import { store } from '../store';

describe('=> Test Navbar', () => {
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
                    <Navbar />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );

    test('Logo', async () => {
        const logo = screen.getAllByRole(/img/);
        expect(logo.length).toBe(2);
    });
});
