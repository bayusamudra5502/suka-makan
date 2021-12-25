Feature('Search movies');

Before(({ I }) => {
  I.amOnPage('/?/search');
  I.wait(1);
});

Scenario('See search page with it\'s components', ({ I }) => {
  I.see('Pencarian');

  I.seeElement('.search-bar input');
  I.seeElement('.search-bar button');

  I.see('Masukan Kata Kunci');
  I.see('Untuk memulai pencarian');
});

Scenario('Searching movies but not any movies found', ({ I }) => {
  I.seeElement('.search-bar input');
  I.seeElement('.search-bar button');

  I.fillField('.search-bar input', 'aakasdfkjfd');
  I.click('.search-bar button');

  I.see('Yah..');
  I.see('Tidak ada hasil yang ditemukan');
});

Scenario('Searching movies with results', ({ I }) => {
  I.seeElement('.search-bar input');
  I.seeElement('.search-bar button');

  I.fillField('.search-bar input', 'cafe');
  I.click('.search-bar button');

  I.seeElement('.card');
});
