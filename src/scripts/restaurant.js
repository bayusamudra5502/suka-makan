import RestaurantCard from "./components/Card";
import db from "../DATA.json";

export function loadRestaurant() {
  reloadSection(db.restaurants);
}

function reloadSection(data) {
  const result = document.querySelector("section.result");
  result.innerHTML = "";
  result.classList.remove("not-found");

  if (data.length > 0) {
    data.forEach((record) => {
      const card = new RestaurantCard();
      card.data = record;

      result.appendChild(card);
    });
  } else {
    const notFound = document.createElement("p");
    notFound.innerHTML = "Nama restoran tidak ditemukan :(";
    result.appendChild(notFound);
    result.classList.add("not-found");
  }
}

export function searchRestaurant(keyword) {
  const data = db.restaurants.filter(({ name }) => {
    return name.toLowerCase().includes(keyword.toLowerCase());
  });

  reloadSection(data);

  window.location.assign("#result");
}
