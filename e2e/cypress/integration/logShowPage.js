/// <reference types="Cypress" />

describe("As a user visiting the show page of a log", () => {
  const visitLogShowPage = (id) => {
    cy.visit(`/logs/${id}`)
  }

  before(() => {
    cy.task("db:truncate", "User")
    cy.task("db:truncate", "Log")
    cy.task("db:truncate", "LogEntry")
    cy.task("db:truncate", "Consumable")

    cy.task("db:insert", {
      modelName: "User",
      json: {
        email: "user@example.com",
        password: "password"
      }
    })

    cy.task("db:insert", {
      modelName: "Consumable",
      json: {
        name: "pizza",
        unit: "slices",
        calories: 255,
        fat: 10,
        protein: 11,
        carbs: 32
      }
    })

    cy.task("db:find", {
      modelName: "User",
      conditions: {
        email: "user@example.com"
      }
    }).then((users) => {
      cy.visit("/user-sessions/new")
      cy.get("form").within(() => {
        cy.findByLabelText("Email").type("user@example.com");
        cy.findByLabelText("Password").type("password");
        cy.root().submit()
      })

      cy.task("db:insert", {
        modelName: "Log",
        json: {
          date: "6/24/2022",
          userId: users[0].id
        }
      })

      cy.task("db:find", {
        modelName: "Log",
        conditions: {
          date: "6/24/2022",
          userId: users[0].id
        }
      }).then((logs) => {
        cy.task("db:find", {
          modelName: "Consumable",
          conditions: {
            name: "pizza",
            unit: "slices"
          }
        }).then((consumables) => {
          cy.task("db:insert", {
            modelName: "LogEntry",
            json: {
              quantity: 2,
              logId: logs[0].id,
              consumableId: consumables[0].id
            }
          })
        })
      })
    })
  })

  it("should display log entry data dynamically based on its quantity", () => {
    cy.task("db:find", {
      modelName: "Log",
      conditions: {
        date: "6/24/2022"
      }
    }).then((logs) => {
      visitLogShowPage(logs[0].id)
    })
    
    cy.get(".entry-table")
      .find("tbody")
      .find("tr")
      .first()
      .find("td")
      .first().should("have.text", "pizza")
      .next().should("have.text", "slices")
      .next().should("have.text", "2")
      .next().should("have.text", "510")
      .next().should("have.text", "20g")
      .next().should("have.text", "22g")
      .next().should("have.text", "64g")
  })
})