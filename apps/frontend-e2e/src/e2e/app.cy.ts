describe('frontend-e2e', () => {
  beforeEach(() => cy.visit('/'));
  afterEach(() => {
    cy.screenshot();
  });

  it('renders correctly with initial data', () => {
    cy.get('table').should('exist');
    cy.get('table')
      .find('input[type="checkbox"]')
      .should('have.length.greaterThan', 1);
  });

  it('selects all rows when toolbar checkbox is clicked', () => {
    cy.get('.selected-status input').click();
    cy.get('table tbody tr').each(($row) => {
      cy.wrap($row).find('input[type="checkbox"]').should('be.checked');
    });
  });

  it('updates data when individual row checkbox is clicked', () => {
    cy.contains('tr', 'Mario').find('input[type="checkbox"]').click();
    cy.contains('tr', 'Mario').should('have.class', 'selected');
  });
});
