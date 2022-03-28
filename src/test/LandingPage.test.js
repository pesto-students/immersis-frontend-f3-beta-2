import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from '../components/UI/LandingPage';
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
                    <LandingPage />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
});

describe('=> Test Landing Page', () => {
    test('Brand Name', async () => {
        const brand = screen.getByText(/IMMERSIS/);
        expect(brand).toBeInTheDocument();
    });

    test('Lyrics', async () => {
        const lyrics = screen.getAllByText(/Lyrics/);
        expect(lyrics.length).toBe(2);
    });

    test('Music', async () => {
        const music = screen.getAllByText(/Music/);
        expect(music.length).toBe(3);
    });

    test('Videos', async () => {
        const videos = screen.getAllByText(/Videos/);
        expect(videos.length).toBe(2);
    });
});
