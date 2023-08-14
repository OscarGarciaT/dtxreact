describe('Login and API Requests', () => {
    it('Allows a user to log in and access protected API routes', () => {
      cy.visit('/login');
  
      // Simular el login exitoso
      cy.get('[name="email"]').type('oscar@dentelx.com');
      cy.get('[name="password"]').type('abc123');
      cy.get('.MuiButton-containedPrimary').click();
      //cy.contains('Login Exitoso');
      cy.wait(3000)
      // Obtener el token de la respuesta del login
      cy.getCookie('tokenDentelX').then((tokenCookie) => {
        const token = tokenCookie.value;
  
        // Realizar solicitudes a la API con el token
        cy.request({
          method: 'GET',
          url: 'https://dtxbackend.onrender.com/api/patients/649be3a8684dc54c7b7ba6db?searchQuery=',
          headers: {
            Authorization: `Bearer ${token}` // Incluir el token en las cabeceras
          }
        }).then((response) => {
          // Aquí puedes realizar verificaciones en la respuesta de la API
          // ...
        });
      });
    });
  });