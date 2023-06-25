import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pacientes from "../Pacientes";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { pushDialog } from "../../slices/dialogSlice";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import PacientesTable from "../Pacientes";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";


// Mock Redux store
const store = configureStore({
  reducer: {
    // Add your reducers here if needed
  },
});

jest.mock("../../slices/dialogSlice", () => ({
    pushDialog: jest.fn(),
  }));

jest.mock("../PatientInfo");

describe("Pacientes", () => {
  test("renders Pacientes component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pacientes />
        </MemoryRouter>
      </Provider>
    );

    // Assert the presence of the component or specific elements
    expect(screen.getByText("Pacientes")).toBeInTheDocument();
  });

  test("dispatches pushDialog action when add button is clicked", () => {
    const mockDispatch = jest.fn();
    jest.spyOn(store, "dispatch").mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pacientes />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("add_circle"));

    // Assert that the pushDialog action was dispatched
    expect(mockDispatch).toHaveBeenCalledWith(pushDialog({ id: "CREATE_PATIENT_VIEW" }));
  });

  test("updates search results when input value changes", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Pacientes />
        </MemoryRouter>
      </Provider>
    );
  
    const searchInput = screen.getByLabelText("Buscar");
  
    // Simulate typing "Oscar" in the search input
    fireEvent.change(searchInput, { target: { value: "Oscar" } });
  
    // Assert that the table displays the expected search results
    expect(screen.getByText("Oscar Moises")).toBeInTheDocument();
    
  });

  test("clicking add button calls pushDialog", () => {
    render(
        <MemoryRouter> 
          <Provider store={store}>
            <PacientesTable />
          </Provider>
        </MemoryRouter>
      );
    fireEvent.click(screen.getByText("add_circle"));
    expect(pushDialog).toHaveBeenCalledWith({ id: "CREATE_PATIENT_VIEW" });
  });
  

  test("displays paciente data", () => {
    render(
        <MemoryRouter> 
          <Provider store={store}>
            <PacientesTable />
          </Provider>
        </MemoryRouter>
      );
  
    // Verificar que haya al menos un elemento en la tabla de pacientes
    const tableRows = screen.getAllByRole("row");
    expect(tableRows.length).toBeGreaterThan(1); // Verificar que haya más de una fila (encabezado + al menos un paciente)
  
  });

});