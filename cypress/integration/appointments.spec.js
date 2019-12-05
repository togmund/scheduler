describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  });
  it("should book an interview", () => {
    cy.get("[alt=Add]").as("addButton");
    cy.get("@addButton")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]").type("Frank Rose");
    cy.get("[alt='Sylvia Palmer']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Frank Rose");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]").as("editButton");
    cy.get("@editButton")
      .invoke("show")
      .click();
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Frank Rose");
    cy.get("[alt='Tori Malcolm']").click();
    cy.contains("Save").click();
    cy.contains(".appointment__card--show", "Frank Rose");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").as("deleteButton");
    cy.get("@deleteButton")
      .invoke("show")
      .click();
    cy.get(".button.button--danger")
      .contains("Confirm")
      .as("confirmButton")
      .click();
    cy.contains("DELETING").should("exist");
    cy.contains("DELETING").should("not.exist");

    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
