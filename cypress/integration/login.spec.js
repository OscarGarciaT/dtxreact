describe('Login and Sign Up', () => {
  it('Allows a user to log in', () => {
    cy.viewport(2000,650)
    cy.visit('/login'); // Asegúrate de ajustar la ruta si es necesario
    cy.get('[name="email"]').type('oscar@dentelx.com');
    cy.get('[name="password"]').type('abc123');
    cy.get('.MuiButton-containedPrimary') // Selecciona el botón por la clase 'MuiButton-containedPrimary'
      .should('have.text', 'Login in')  // Verifica el texto del botón si es necesario
      .click();  
    cy.intercept('GET', 'https://dtxbackend.onrender.com/api/patients/649be3a8684dc54c7b7ba6db?searchQuery=', {
      statusCode: 200,
      body: {} // Respuesta simulada
    });
    cy.wait(15000)
    cy.contains('Pacientes'); // Verifica que se muestre el mensaje de éxito
   
  });
  
  it('Allows a user to sign up as dentist', () => {
      cy.visit('/login'); // Asegúrate de ajustar la ruta si es necesario
      cy.get('.MuiLink-root ').click();
      cy.contains('Registro');
      cy.get('[name="nombres"]').type('Sara Gema');
      cy.get('[name="apellidos"]').type('Gonzales Suarez');
      cy.get('[name="email"]').type('saraGG2@gmail.com');//Change email when testing
      cy.get('[name="password"]').type('SarahG123');
      cy.get('#mui-component-select-cargo').click();
      cy.get('[data-value="DENTISTA"]').type('{enter}'); 
      cy.get('[name="telefono"]').type('0989705423');
      cy.get('.MuiButton-containedPrimary').click();
      cy.wait(15000)
      cy.intercept('POST', 'https://dtxbackend.onrender.com/api/users/signup', {
      statusCode: 200,
      body: {} // Respuesta simulada
      });

    });

    it('Allows a user to sign up as Ortod.', () => {
      cy.visit('/login'); // Asegúrate de ajustar la ruta si es necesario
      cy.get('.MuiLink-root ').click();
      cy.contains('Registro');
      cy.get('[name="nombres"]').type('Sara Gema');
      cy.get('[name="apellidos"]').type('Gonzales Suarez');
      cy.get('[name="email"]').type('saraGG3@gmail.com');//Change email when testing
      cy.get('[name="password"]').type('SarahG123');
      cy.get('#mui-component-select-cargo').click();
      cy.get('[data-value="DENTISTA"]').type('{downarrow}{enter}'); 
      cy.get('[name="telefono"]').type('0989705423');
      cy.get('.MuiButton-containedPrimary').click();
      cy.intercept('POST', 'https://dtxbackend.onrender.com/api/users/signup', {
      statusCode: 200,
      body: {} // Respuesta simulada
      });
      

    });
  
});