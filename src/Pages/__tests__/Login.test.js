/**
 * @group login
 * @groupid login
 */

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '../Login';

describe('Login Component', () => {
  const mockStore = configureStore([]);
  let store;

  beforeEach(() => {
    store = mockStore({
      login: {
        status: 'login',
        inProgress: false,
        errors: [],
      },
    });
  });

  /**
   * Renders login form correctly.
   */
  it('renders login form correctly', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Login in')).toBeInTheDocument();
  });

  /**
   * Handles login submission.
   */
  it('handles login submission', async () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const loginButton = screen.getByText('Login in');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText("Couldn't verify information")).toBeInTheDocument();
    });
  });

  /**
   * Renders signup form correctly.
   */
  it('renders signup form correctly', () => {
    store.getState().login.status = 'signup'; 
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(screen.getByText('Nombres')).toBeInTheDocument();
    expect(screen.getByText('Apellidos')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});