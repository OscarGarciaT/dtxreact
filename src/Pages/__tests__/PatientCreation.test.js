import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'
import '@testing-library/jest-dom'
import PatientCreation from "../PatientCreation"

describe("PatientCreation component", () => {
  test("renders the component correctly", () => {
    render(
        <Router>
          <PatientCreation />
        </Router>
      );

    expect(screen.getByText("Información General")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombres")).toBeInTheDocument();
    expect(screen.getByLabelText("Apellidos")).toBeInTheDocument();
    // Agregar más aserciones para otros elementos en el componente
  });


  test("changes tab when clicked", () => {
    const { getByText, getByRole } = render(
        <Router>
          <PatientCreation />
        </Router>
      );
    const tab1 = getByText("Frontal");
    const tab2 = getByText("Posterior");
    const tabPanel1 = getByRole("tabpanel", { name: "Frontal" });
    

    // Initially, only the first tab panel should be visible
    expect(tabPanel1).toBeVisible();

    // Click the second tab and check visibility
    fireEvent.click(tab2);
    const tabPanel2 = getByRole("tabpanel", { name: "Posterior" });
    expect(tabPanel1).not.toBeVisible();
    expect(tabPanel2).toBeVisible();

    // Click the first tab and check visibility again
    fireEvent.click(tab1);
    expect(tabPanel1).toBeVisible();
  });

  

});