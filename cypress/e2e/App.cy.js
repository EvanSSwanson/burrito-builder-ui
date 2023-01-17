describe('Burrito builder', () => {
  beforeEach(() => {
    cy.intercept("http://localhost:3001/api/v1/orders",
    {fixture: "mockOrders.json"})
    cy.visit("http://localhost:3000/")
  })
  it("should have a page title", () => {
    cy.get(".site-title").contains("Burrito Builder").should("be.visible")
  })
  it("should have a form to make an order", () => {
    cy.get(".input-bar").should("be.visible")
    cy.get(".order-form").children().should("have.length", 15).contains("beans")
    cy.get(".order-declaration").should("be.visible")
    cy.get(".submit-button").contains("Submit Order").should("be.visible")
  })
  it("should have three cards loaded", () => {
    cy.get(".order").should("have.length", 3)
    cy.get(".order").eq(0).contains("Frank")
    cy.get(".order").eq(0).contains("beans")
    cy.get(".order").eq(0).contains("carnitas")
    cy.get(".order").eq(2).contains("Lionel")
    cy.get(".order").eq(2).contains("lettuce")
    cy.get(".order").eq(2).contains("sour cream")
  })
  it("should be able to add order", () => {
    cy.intercept("http://localhost:3001/api/v1/orders",
    {method:"POST", fixture: "newMockOrder.json"})
    cy.get(".input-bar").clear().type("Ron")
    cy.get(".beans").click()
    cy.get(".sofritas").click()
    cy.get(".submit-button").click()
    cy.get(".order").should("have.length", 4)
    cy.get(".order").eq(3).contains("Dan")
    cy.get(".order").eq(3).contains("carnitas")
    cy.get(".order").eq(3).contains("sour cream")
  })
  it("should not add a card with no name", () => {
    cy.intercept("http://localhost:3001/api/v1/orders",
    {method:"POST", fixture: "newMockOrder.json"})
    cy.get(".input-bar").clear()
    cy.get(".beans").click()
    cy.get(".sofritas").click()
    cy.get(".submit-button").click()
    cy.get(".order").should("have.length", 3)
  })
  it("should not add a card with no ingredients", () => {
    cy.intercept("http://localhost:3001/api/v1/orders",
    {method:"POST", fixture: "newMockOrder.json"})
    cy.get(".input-bar").clear().type("Ryan")
    cy.get(".submit-button").click()
    cy.get(".order").should("have.length", 3)
  })
})