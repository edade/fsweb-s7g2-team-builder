describe("Success tests.", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });
  it("Tests form and get success.", () => {
    cy.get('[data-cy="name-input"]')
      .type("Eda Kalaycioglu")
      .should("have.value", "Eda Kalaycioglu");
    cy.get('[data-cy="email-input"]')
      .type("edakalaycioglu@gmail.com")
      .should("have.value", "edakalaycioglu@gmail.com");
  });
});

describe("Error tests.", () => {
  beforeEach(() => {
    cy.visit("/signup");
  });
  it("Tests email input and gets error as expected . ", () => {
    cy.get('[data-cy="email-input"]')
      .type("emre.sahinergmail.com")
      .should("have.value", "emre.sahinergmail.com");
    cy.contains("Geçerli bir email giriniz!");
  });
});
