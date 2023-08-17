const addContext = require('mochawesome/addContext');
describe('Indixes confirmation', () => {
  it('Formula of indixes are correct', () => {
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
    cy.intercept('GET', 'https://dtxbackend.onrender.com/api/patients/649be3a8684dc54c7b7ba6db', {
     statusCode: 200,
      body: {} // Respuesta simulada
    });
    cy.get('[data-testid="add-button"]').click();
    cy.contains('.MuiButton-root', '16').click();
    cy.contains('.MuiButton-root', '21').click();
    cy.contains('.MuiButton-root', '65').click();
    cy.contains('.MuiButton-root', '36').click();
    cy.contains('.MuiButton-root', '71').click();
    cy.contains('.MuiButton-root', '46').click();
    cy.get('[name="salud_bucal.tabla_higiene.placa.c1r1"]').clear().type('3');
    cy.get('[name="salud_bucal.tabla_higiene.placa.c1r2"]').clear().type('2');
    cy.get('[name="salud_bucal.tabla_higiene.placa.total_placa"]')
      .should('have.attr', 'value', '0.83');

    
    cy.get('[name="indices_cpo_cbo.rowD.DC1"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowD.DP"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowD.DO"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.dc2"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.de"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.do"]').type("1");
    cy.get('[name="indices_cpo_cbo.total_rowD"]')
      .should('have.attr','value','3');
    
  });
});