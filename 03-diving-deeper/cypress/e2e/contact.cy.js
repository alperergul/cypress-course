/// <reference types="Cypress" />;

describe("contact form", () => {
  it("should submit the form", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-input-message"]').type("Hello World");
    cy.get('[data-cy="contact-input-name"]').type("Alper");
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el.attr("disabled")).to.be.undefined;
      expect(el.text()).to.be.equal("Send Message");
    });
    cy.screenshot();
    cy.get('[data-cy="contact-input-email"]').type("alper@alper.com{enter}");

    // cy.get("@submitBtn")
    // .contains("Send Message")
    // .and("not.have.attr", "disabled");

    cy.screenshot();
    cy.get('[data-cy="contact-btn-submit"]').as("submitBtn");
    // cy.get("@submitBtn").click();
    cy.get("@submitBtn").contains("Sending...");
    cy.get("@submitBtn").should("have.attr", "disabled");
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");
  });

  it("should validate the form input", () => {
    cy.visit("http://localhost:5173/about");
    cy.get('[data-cy="contact-btn-submit"]').click();
    cy.get('[data-cy="contact-btn-submit"]').then((el) => {
      expect(el).to.not.have.attr("dissabled");
      expect(el.text()).to.not.equal("Sending...");
    });
    cy.get('[data-cy="contact-btn-submit"]').contains("Send Message");

    cy.get('[data-cy="contact-input-message"]').as("msgInput");
    cy.get("@msgInput").blur();
    cy.get("@msgInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-name"]').as("nameInput");
    cy.get("@nameInput").focus().blur();
    cy.get("@nameInput")
      .parent()
      .should("have.attr", "class")
      .and("match", /invalid/);

    cy.get('[data-cy="contact-input-name"]').as("emailInput");
    cy.get("@emailInput").focus().blur();
    cy.get("@emailInput")
      .parent()
      .should((el) => {
        expect(el.attr("class")).not.to.be.undefined;
        expect(el.attr("class")).contains("invalid");
      });
  });
});
