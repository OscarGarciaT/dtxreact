import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import Login from '../Login';

describe('Login component', () => {
    test('renders login form', () => {
      render(
        <Router>
          <Login />
        </Router>
      );
      // Verifica si los elementos del formulario de inicio de sesión se renderizan correctamente
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Login in' })).toBeInTheDocument();
    });
    

    test('validates required fields', async () => {
      render(
        <Router>
          <Login />
        </Router>
      );
      fireEvent.click(screen.getByRole('button', { name: 'Login in' }));
      // Verifica si se muestran los mensajes de error de campo obligatorio
      await waitFor(() => {
        const requiredEmailText = screen.getByText('Email is required');
        const requiredPasswordText = screen.getByText('Password is required');
        expect(requiredEmailText).toBeInTheDocument();
        expect(requiredPasswordText).toBeInTheDocument();
      });
    });
    

    test('should navigate to "/pacientes" after successful login', async () => {
      render(
        <Router>
          <Login />
        </Router>
      );
      
      // Ingresa los datos de prueba en los campos de texto
      userEvent.type(screen.getByLabelText('Email'), 'test@dentelx.com');
      userEvent.type(screen.getByLabelText('Password'), '123');
      
      // Simula hacer clic en el botón de submit
      fireEvent.click(screen.getByText('Login in'));
      // Espera a que ocurra el traslado de página
      await waitFor(() => {
        // Verifica que se haya trasladado a la página correcta
        window.history.pushState({}, 'Pacientes', 'http://localhost:5173/pacientes');
      });
    });

   
  });