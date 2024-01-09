describe("Success tests.", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Tests form and get success.", () => {
    cy.get('[data-cy="name-input"]')
      .type("Emre Şahiner")
      .should("have.value", "Emre Şahiner");
    cy.get('[data-cy="email-input"]')
      .type("emresahiner@gmail.com")
      .should("have.value", "emresahiner@gmail.com");
  });
});
