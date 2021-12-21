Feature('sample');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('See a header', ({ I }) => {
  I.seeElement('header');
});
