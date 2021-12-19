import iconApp from '@img/icon/icon.png';
import burgerIcon from '@img/assets/burger.png';
import xIcon from '@img/assets/x.svg';
import searchIcon from '@img/assets/search.svg';
import Component from '../lib/Component';
import './Link';

export default class HeaderApp extends Component {
  #openDrawer = () => {
    document.querySelector('.box-overlay').classList.remove('hide');
    this.querySelector('.navigation').classList.add('show-drawer');
  };

  #closeDrawer = () => {
    document.querySelector('.box-overlay').classList.add('hide');
    this.querySelector('.navigation').classList.remove('show-drawer');
  };

  async render() {
    this.innerHTML = `
      <header>
        <img class="logo" src="${iconApp}" alt="Logo Suka Makan">
        <h1>Suka Makan</h1>
        <button class="burger" aria-label="Buka Laci Navigasi">
            <img src="${burgerIcon}" alt="">
        </button>
        <nav>
            <ul class="navigation" id="navigation">
                <li class="close-button">
                    <button aria-label="Tutup Drawer">
                        <img src="${xIcon}" alt="x">
                    </button>
                </li>
                <li>
                    <link-component 
                        data-content="Home" 
                        data-href="/" 
                        data-style="header-link"></link-component>
                </li>
                <li>
                    <link-component 
                      data-content="Favorit" 
                      data-href="/favorite" 
                      data-style="header-link"></link-component>
                </li>
                <li>
                    <a class="header-link" href="https://github.com/bayusamudra5502">Tentang Kami</a>
                </li>
                <li>
                  <link-component 
                    data-content='<img src="${searchIcon}" alt="Pencarian">' 
                    data-href="/search" 
                    data-style="header-link"></link-component>

                </li>
                <li class="skip">
                    <a href="#navigation" class="header-link">Kembali ke Navigasi</a>
                </li>
            </ul>
        </nav>
      </header>
    `;

    this.#setListener();
  }

  #setListener() {
    this
      .querySelector('.burger')
      .addEventListener('click', this.#openDrawer);

    document
      .querySelector('.box-overlay')
      .addEventListener('click', this.#closeDrawer);

    this
      .querySelector('.close-button button')
      .addEventListener('click', this.#closeDrawer);

    this.querySelectorAll('li a').forEach((item) => {
      item.addEventListener('click', this.#closeDrawer);
    });
  }
}

Component.register('header-app', HeaderApp);
