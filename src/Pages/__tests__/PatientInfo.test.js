import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useForm } from 'react-hook-form';
import { updatePatient, createPatient } from '../../services/patientServices';
import { useSelector, useDispatch } from 'react-redux';
import PatientInfo from '../PatientInfo';

// Mocking patientServices.js
jest.mock('../../services/patientServices', () => ({
  updatePatient: jest.fn(),
  createPatient: jest.fn(),
}));

// Mocking useSelector and useDispatch
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe('PatientInfo Component', () => {
  // Mocking useSelector and useDispatch behaviors
  const mockSelector = useSelector;
  const mockDispatch = useDispatch;

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    mockSelector.mockReturnValue({ user: { doctorId: '123' } });
    mockDispatch.mockReturnValue(jest.fn());
  });

  it('renders correctly', () => {
    render(<PatientInfo />);

    // Assertions for rendering content
    expect(screen.getByText('Información general')).toBeInTheDocument();
    // Add more assertions as needed
  });

 

  

  
});