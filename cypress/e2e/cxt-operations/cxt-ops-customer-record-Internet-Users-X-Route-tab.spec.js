import customerRecordPage from "../../support/Pages/customerRecordPage";
import internetPage from "../../support/Pages/internetPage";
describe("Maintenance record Internet Users X Route tab", () => {
  before(() => {
    cy.session("cxtOpsLoginSession", () => {
      cy.visit(Cypress.env("BASE_URL"));
      cy.login(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"));
    });
  });
  it("should verify 'Internet Users' text and click the 'Search  Field' ", () => {
    internetPage.visitCustomers();
    cy.wait(3000);
  });

  it("should verify the 'Internet Users' text and click the 'Create New' button", () => {
    internetPage.clickCreateNewButton();
  });
  it("should click the X Route tab", () => {
    customerRecordPage.clickXRouteTab();
  });
  it("should check the Advanced Driver Permissions checkbox", () => {
    cy.wait(3000);
    customerRecordPage.checkAdvancedDriverPermissions();
  });
  it("should click the 'Enable All' button on the X Route   Button", () => {
    cy.wait(5000);
    customerRecordPage.clickEnableAllCustomProcedures();
  });
  it("should click the 'Disable All' button on the X Route  Button", () => {
    cy.wait(2000);
    customerRecordPage.clickDisableAllButton();
  });
  it("should check the Advanced Driver Permissions checkbox", () => {
    customerRecordPage.checkAdvancedDriverPermissions();
  });
  it("should toggle all 'Internet Users X Route option' checkboxes", () => {
    cy.wait(2000);
    const checkboxLabels = [
      "Aaren Ryhorovich - 14783",
      "Aaren Ovill - 19184",
      "Aaren Bourley - 22098",
      "Aaren Wheowall - 23099",
      "Aarika Radband - 21167",
      "Aarika Toppes - 26965",
      "Aaron Newman - 125",
      "Aaron Newman - 501",
      "Aaron Pudding - 18891",
      "Aaron Hillborne - 21885",
      "Aaron Cartin - 28905",
      "Ab Stoad - 16890",
      "Ab Lamont - 23787",
      "Ab Shackleton - 26810",
      "Abagail Pitson - 17448",
      "Abba Langthorne - 10979",
      "Abba Threadgall - 19427",
      "Abba Burnsall - 22206",
      "Abbe Whitcher - 10668",
      "Abbe Fraanchyonok - 23323",
      "Abbe Castellani - 24782",
      "Abbe Rumble - 27142",
      "Abbe Girardoni - 29290",
      "Abbey Costan - 12540",
      "Abbey Daniels - 13402",
      "Abbey MacAdie - 17507",
      "Abbey Frede - 25838",
      "Abbey Gadaud - 28411",
      "Abbi Winscomb - 12469",
      "Abbie Sim - 11826",
      "Abbie Morcombe - 13871",
      "Abbie Heninghem - 18227",
      "Abbie Moppett - 19421",
      "Abbie Cohan - 23908",
      "Abbie Alexandrescu - 25668",
      "Abbie Willows - 26045",
      "Abbie Revening - 27611",
      "Abbie Afield - 29498",
      "Abbot Pedlar - 15533",
      "Abbot Dargue - 15575",
      "Abbott Kier - 10087",
      "Abbott Idale - 14720",
      "Abbott Stanner - 27946",
      "Abby Coppenhall - 12304",
      "Abby Rucklidge - 15240",
      "Abby Killingback - 16936",
      "Abby Duddin - 17829",
      "Abbye Jeenes - 14158",
      "Abbye Sebyer - 14274",
      "Abbye Pettiford - 16609",
      "Abbye Bachelor - 17968",
      "Abe McGillivrie - 14870",
      "Abe Hawse - 28113",
      "Abe McGuirk - 29928",
      "Abel Whitman - 15828",
      "Abel Viccars - 16048",
      "Abelard Mengo - 16540",
      "Abeu Lowndes - 11725",
      "Abeu M'Chirrie - 13123",
      "Abeu Dunaway - 17424",
      "Abeu Bowditch - 19225",
      "Abeu Karel - 27016",
      "Abeu Sobczak - 29360",
      "Abey Noice - 18171",
      "Abey Prati - 23635",
      "Abey Hargroves - 27338",
      "Abie O'Cannavan - 20285",
      "Abigail Mellenby - 19401",
      "Abigail McCreadie - 27235",
      "Abigail Cranshaw - 28125",
      "Abigail Seery - 29522",
      "Abigale Janecki - 15338",
      "Abigale Elmar - 21576",
      "Abner McManamen - 14576",
      "Abra Armitage - 10687",
      "Abraham Hesse - 21013",
      "Abraham Sutter - 21133",
      "Abrahan Rodriguez - 19954",
      "Abrahan Grushin - 21413",
      "Abram Challicum - 17954",
      "Abram Ivanisov - 25334",
      "Abramo Dyster - 21403",
      "Abramo Frye - 23518",
      "Ad Saye - 13064",
      "Ad Ripping - 18283",
      "Ad Poulett - 24160",
      "Ada Tulip - 11316",
      "Ada Colnett - 18852",
      "Ada Giacubbo - 25037",
      "Adaline Blackleech - 14478",
      "Adaline Moncaster - 16721",
      "Adaline Hubbold - 22654",
      "Adam Cozens - 13668",
      "Adams Ormiston - 22400",
      "Adan Kibble - 11984",
      "Adan Stolz - 20478",
      "Adara Janku - 22013",
      "Adda Krysztowczyk - 14191",
      "Addi Keeping - 24325",
      "Addia Wollard - 19565",
      "Addia Brittin - 19660",
      "Addia Grewer - 26070",
      "Addia Liggens - 29723",
      "Addie Dumingos - 13031",
      "Addie Levesley - 20531",
      "Addison Dumbrell - 11616",
      "Addison Verzey - 25883",
      "Addy Voysey - 13273",
      "Addy Bools - 15065",
      "Addy Fergyson - 18128",
      "Addy Shivell - 19786",
      "Addy Pirozzi - 24068",
      "Addy Joscelyne - 28740",
    ];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelXRouteWithScroll(label);
    });
  });
  it("should search for 'Abigail Cranshaw - 28125' in the shipping X Route label search field", () => {
    cy.wait(3000);
    const option = "Advanced Driver Permissions";
    customerRecordPage.searchDriver(option);
  });

  it("should toggles a X Route checkbox by label with scroll and conditional check/uncheck logic", () => {
    cy.wait(2000);
    const checkboxLabels = ["Advanced Driver Permissions"];

    checkboxLabels.forEach((label) => {
      customerRecordPage.toggleCheckboxByLabelXRouteWithScroll(label);
    });
  });
});
