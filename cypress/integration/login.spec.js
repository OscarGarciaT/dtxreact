describe('Login and Sign Up', () => {
    it('Allows a user to log in', () => {
      cy.visit('/login'); // Asegúrate de ajustar la ruta si es necesario
  
      cy.get('[name="email"]').type('oscar@dentelx.com');
      cy.get('[name="password"]').type('abc123');
      cy.get('.MuiButton-containedPrimary') // Selecciona el botón por la clase 'MuiButton-containedPrimary'
        .should('have.text', 'Login in')  // Verifica el texto del botón si es necesario
        .click();  
      cy.contains('Login Exitoso'); // Verifica que se muestre el mensaje de éxito
      cy.intercept('GET', '**/*', (req) => {
        req.continue(); // Continuar con la solicitud sin mostrarla en la consola
      });
    });
  
    
  });