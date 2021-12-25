Feature('Make a restaurant favorite and not favorite');

Before(({ I }) => {
  I.amOnPage('/');
  I.wait(1);
});

Scenario('See card with like button', ({ I }) => {
  I.seeElement('.card');
  I.seeElement('favorite-button');

  I.seeAttributesOnElements('favorite-button button', {
    title: 'Tambahkan favorit',
  });
});

Scenario('Make restaurant Favorite', ({ I }) => {
  I.seeElement('favorite-button');

  I.seeAttributesOnElements('favorite-button button', {
    title: 'Tambahkan favorit',
  });

  const clickNthLike = (positionNumber) => {
    const buttonElement = locate('favorite-button').at(positionNumber);
    I.click(buttonElement);

    I.see('Berhasil menambahkan ke daftar favorit');

    I.seeAttributesOnElements(locate('favorite-button button').at(positionNumber), {
      title: 'Hapus favorit',
    });
  };

  clickNthLike(2);

  I.wait(2.5);
  I.dontSee('Berhasil menambahkan ke daftar favorit');

  clickNthLike(3);
  clickNthLike(8);
});

Scenario('Make restaurant favorite and cancling it', ({ I }) => {
  I.seeElement('favorite-button');

  I.seeAttributesOnElements('favorite-button button', {
    title: 'Tambahkan favorit',
  });

  const clickNthLike = (positionNumber) => {
    const buttonElement = locate('favorite-button').at(positionNumber);
    I.click(buttonElement);
  };

  const clickNthUnlike = (positionNumber) => {
    const buttonElement = locate('favorite-button').at(positionNumber);

    I.click(buttonElement);
    I.see('Berhasil menghapus dari daftar favorit');

    I.seeAttributesOnElements(locate('favorite-button button').at(positionNumber), {
      title: 'Tambahkan favorit',
    });
  };

  clickNthLike(1);
  clickNthUnlike(1);

  clickNthLike(2);
  clickNthLike(8);

  clickNthUnlike(2);
  clickNthUnlike(8);
});
