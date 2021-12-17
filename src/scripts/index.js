import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import { loadRestaurant, searchRestaurant } from './restaurant';

// Burger Click
function openDrawer() {
  document.querySelector('.box-overlay').classList.remove('hide');
  document.querySelector('.navigation').classList.add('show-drawer');
}

function closeDrawer() {
  document.querySelector('.box-overlay').classList.add('hide');
  document.querySelector('.navigation').classList.remove('show-drawer');
}

document.querySelector('.burger').addEventListener('click', openDrawer);
document.querySelector('.box-overlay').addEventListener('click', closeDrawer);

// Initializing Event
document
  .querySelector('.close-button button')
  .addEventListener('click', closeDrawer);

// Load Restaurant List
loadRestaurant();

// Search
function search(e) {
  e.preventDefault();
  const keyword = e.target[0].value;
  searchRestaurant(keyword);
}

document.querySelector('.search-bar').addEventListener('submit', search);
