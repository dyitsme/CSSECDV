describe("editpost", () => {
  const id = 6;
  const loginurl = "http://localhost:3000/login";
  const posturl = `http://localhost:3000/edit-post/${id}`
  it("valid post", () => {
    cy.visit(loginurl);
    cy.get("#email").type("lea_aromin@dlsu.edu.ph");
    cy.get("#password").type("DEMADALE");
    cy.get("#login").click();

    cy.visit(posturl);
    cy.get("#title").clear();
    cy.get("#title").type("My Post.")

    cy.get("#content").clear();
    cy.get("#content").type("This is my status for today! #life");
    
    cy.get("#image").selectFile("cypress/fixtures/landscape.jpg");
    cy.get("#docu").selectFile("cypress/fixtures/samplepdf.pdf");
    cy.get("#post").click();

  })
  it("missing both files", () => {
    cy.visit(loginurl);

    cy.get("#email").type("lea_aromin@dlsu.edu.ph");
    cy.get("#password").type("DEMADALE");
    cy.get("#login").click();

    cy.visit(posturl);
    
    cy.get("#title").type("My Post.")
    cy.get("#content").type("This is my status for today! #life");
    cy.get("#post").click();
  })
  it("missing image", () => {
    cy.visit(loginurl);
    cy.get("#email").type("lea_aromin@dlsu.edu.ph");
    cy.get("#password").type("DEMADALE");
    cy.get("#login").click();

    cy.get("#title").type("My Post.")
    cy.get("#content").type("This is my status for today! #life");
    cy.get("#docu").selectFile("cypress/fixtures/samplepdf.pdf");
    cy.get("#post").click();
  })
  it("missing docu", () => {
    cy.visit(loginurl);
    cy.get("#email").type("lea_aromin@dlsu.edu.ph");
    cy.get("#password").type("DEMADALE");
    cy.get("#login").click();

    cy.get("#title").type("My Post.")
    cy.get("#content").type("This is my status for today! #life");
    cy.get("#image").selectFile("cypress/fixtures/landscape.jpg");
    cy.get("#docu").selectFile("cypress/fixtures/samplepdf.pdf");
    cy.get("#post").click();
  })
})