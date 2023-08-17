const addContext = require('mochawesome/addContext');
describe('Record creation (writing)', () => {
  it('Allows to create a record', () => {
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
    cy.get('[name="info_general.num_historia_clinica"]').type('999');
    cy.get('[name="info_general.nombres"]').type('Oscar');
    cy.get('[name="info_general.apellidos"]').type('Garcya Cypress');
    cy.get('[name="info_general.cedula"]').type('0982378222');
    cy.get('[name="info_general.celular"]').type('0988234933');
    cy.get('.PrivateSwitchBase-input[value="6"]').click();
    cy.get('[name="motivo_consulta"]').type('Limpieza general');
    cy.get('[name="enfermedad_problema_actual"]').type('Ligero Sarro');
    cy.get('[name="antecedentes_familiares.alergia_antibiotico"]').click();
    cy.get('[name="signos_vitales.presion_arterial"]').type('112');
    cy.get('[name="signos_vitales.frecuencia_cardiaca"]').type('14');
    cy.get('[name="signos_vitales.temperatura_centigrados"]').type('32');
    cy.get('[name="signos_vitales.frec_respiratoria_min"]').type('34');
    cy.get('[name="signos_vitales.anotaciones"]').type('El paciente se niega a tomarse presion arterial actual');
    cy.get('[name="sistema_estomatognatico.maxilar_superior"]').click();
    cy.contains('.MuiButton-root', '16').click();
    cy.contains('.MuiButton-root', '21').click();
    cy.contains('.MuiButton-root', '65').click();
    cy.contains('.MuiButton-root', '36').click();
    cy.contains('.MuiButton-root', '71').click();
    cy.contains('.MuiButton-root', '46').click();
    cy.get('[name="salud_bucal.tabla_higiene.placa.c1r1"]').clear().type('3');
    cy.get('[name="salud_bucal.tabla_higiene.calculo.c2r1"]').clear().type('2');
    cy.get('[name="salud_bucal.tabla_higiene.gingivitis.c3r1"]').clear().type('1');
    cy.get('[name="indices_cpo_cbo.rowD.DC1"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowD.DP"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowD.DO"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.dc2"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.de"]').type("1");
    cy.get('[name="indices_cpo_cbo.rowd.do"]').type("1");
    cy.contains('.MuiTab-root', 'Posterior').click();
    cy.get('[name="planes_varios.biometria"]').click();
    const patientData = {
      nombres: "Oscar",
      apellidos: "Garcya Cypress",
      cedula: "0982378222",
      celular: "0988234933",
      doctor_id: "649be3a8684dc54c7b7ba6db",
      sexo: 'masculino', 
      edad: 20,
      enfermedad_problema_actual: "Ligero Sarro",
      antecedentes_personales: "Alergia antibiotico",
      motivo_consulta: "Limpieza general",
      antecedentes_familiares: "",
      indices_cpo_cbo: "",
      info_general: "",
      planes_varios: "",
      salud_bucal: "",
      signos_vitales: "",
      sistema_estomatognatico: "",
      diagnosticos: "",
      tratamientos: "",
      // Otros campos de información del paciente
    };
    cy.intercept('POST', 'https://dtxbackend.onrender.com/api/patients/649be3a8684dc54c7b7ba6db', {
     statusCode: 200,
      body: {
        patientData,
      } // Respuesta simulada
    });
    cy.contains('.MuiButton-root', 'Enviar').click();
    cy.contains('Pacientes'); // Verifica que se muestre el mensaje de éxito
    cy.wait(1000)
    addContext(this, 'Report creation');
  });
});