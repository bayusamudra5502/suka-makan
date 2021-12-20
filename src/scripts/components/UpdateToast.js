import Component from '../lib/Component';
import ToastBaseComponent from '../lib/ToastBase';

export default class UpdateToast extends ToastBaseComponent {
  #onAccepted;

  constructor({ onAccepted }) {
    super();
    this.#onAccepted = onAccepted;
  }

  async render() {
    super.render();
    this.classList.add('updater-toast');

    this.innerHTML = `
      <h2>Notifikasi Update</h2>
      <p>Tersedia update aplikasi versi terbaru. 
        Apakah anda ingin menginstallnya saat ini?</p>

      <button class="btn install-now">Install Sekarang</button>
      <button class="install-later">Nanti saja</button>      
    `;

    await this.update();
  }

  async update() {
    this.querySelector('.install-now').onclick = () => {
      this.#onAccepted();
    };

    this.querySelector('.install-later').onclick = () => {
      this.hide();
    };
  }
}

Component.register('updater-toast', UpdateToast);
