describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    // cy.contains("li", "Tuesday").click().should("have.css", "background-color", "rgba(0, 0, 0, 0)");
    //updated to now check for the selected class and not the colour.
    cy.contains("[data-testid=day]", "Tuesday")
    .click()
    .should("have.class", "day-list__item--selected")
  });
});