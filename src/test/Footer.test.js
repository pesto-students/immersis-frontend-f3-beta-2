import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../components/UI/Footer';
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
                    <Footer />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
});

describe('=> Test Footer', () => {
    test('About Us', async () => {
        const about = screen.getByText(/About Us/);
        expect(about).toBeInTheDocument();
    });

    test('Our Company', async () => {
        const comp = screen.getByText(/Our Company/);
        expect(comp).toBeInTheDocument();
    });

    test('Contact Us', async () => {
        const cont = screen.getByText(/Contact Us/);
        expect(cont).toBeInTheDocument();
    });
});
