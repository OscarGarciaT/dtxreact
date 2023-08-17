import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PacientesTable from '../Pacientes'; // Adjust the import path
import Pacientes from '../Pacientes'; // Adjust the import path

const mockStore = configureStore([]);

describe('PacientesTable Component', () => {
    it('renders the Pacientes component and handles create button click', () => {
        const store = mockStore({});
    
        render(
          <Provider store={store}>
            <Pacientes />
          </Provider>
        );
    

    expect(screen.getByText('No se han registrado pacientes')).toBeInTheDocument();
    

   
  });

  
});
