describe("createpost", () => {
  const loginurl = "http://localhost:3000/login";
  const posturl = "http://localhost:3000/create-post"
  it("valid post", () => {
    cy.visit(loginurl);

    cy.get("#email").type("lea_aromin@dlsu.edu.ph");
    cy.get("#password").type("DEMADALE");
    cy.get("#login").click();

    cy.visit(posturl);
    
    cy.get("#title").type("My First Post.")
    cy.get("#content").type("Today's adventure took me to unexpected places! From the bustling streets of the city to serene natural landscapes, every step was filled with surprises. Life is an unpredictable journey, and embracing the unknown can lead to the most memorable experiences. Here's to embracing spontaneity and finding joy in the unexpected twists and turns of life! 🌟 #AdventureAwaits #EmbraceTheUnknown");
    cy.get("#image").selectFile("cypress/fixtures/landscape.jpg");
    cy.get("#docu").selectFile("cypress/fixtures/samplepdf.pdf");
    cy.get("#post").click();
  })
})