import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SideBarItem from "./SideBarItem";
import { ListItemText } from "@mui/material";

describe('SideBarItem', () => {
    const mockOnClick = jest.fn();j
    test('renderiza correctamente', () => {
      const { getByText, getByTestId } = render(
        <SideBarItem
          onClick={mockOnClick}
          currentPage="pacientes"
          icon={<i className="fa fa-users" />}
          label="Pacientes"
          tabId="pacientes"
        />
      );
  
      const listItem = getByTestId('sidebar-item');
      const icon = getByTestId('sidebar-item-icon');
      const label = getByText('Pacientes');
  
      expect(listItem).toBeInTheDocument();
      expect(icon).toBeInTheDocument();
      expect(label).toBeInTheDocument();
    });
  
    test('llama a la función onClick al hacer clic en el elemento', () => {
      const { getByTestId } = render(
        <SideBarItem
          onClick={mockOnClick}
          currentPage="pacientes"
          icon={<i className="fa fa-users" />}
          label="Pacientes"
          tabId="pacientes"
        />
      );
  
      const listItem = getByTestId('sidebar-item');
      fireEvent.click(listItem);
  
      expect(mockOnClick).toHaveBeenCalled();
    });
  
    test('aplica estilos diferentes si es la página actual', () => {
      const { getByTestId } = render(
        <SideBarItem
          onClick={mockOnClick}
          currentPage="pacientes"
          icon={<i className="fa fa-users" />}
          label="Pacientes"
          tabId="pacientes"
        />
      );
  
      const listItem = getByTestId('sidebar-item');
      expect(listItem).toHaveStyle('background-color: #39CAB0; color: #FFFDFD');
    });
  });