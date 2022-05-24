// Carousel
new Glide('.glide', {
  type: 'carousel',
  startAt: 0,
  gap: 20,
  perView: 5,
  focusAt: 'center',
  breakpoints: {
    800: {
      perView: 3
    },
    500: {
      perView: 2
    }
  }
}).mount();

// Stats
let options = {method: 'GET', headers: {Accept: 'application/json'}};
let collectionName = 'unf01d';
let apiUrl = 'api.opensea.io';

if (1 === 1) {
  apiUrl = 'testnets-api.opensea.io';
  collectionName = 'nftcoins-v4';
}

if (sessionStorage.getItem("floor_price") === null && sessionStorage.getItem("num_holders") === null) {

  fetch(`https://${apiUrl}/api/v1/collection/${collectionName}/stats`, options)
    .then(response => response.json())
    .then((response) => {

      console.log("AJAX!");

      document.getElementById("floor_price").innerText = response.stats.floor_price;
      document.getElementById("num_holders").innerText = `${response.stats.num_owners}+`;

      sessionStorage.setItem("floor_price", response.stats.floor_price);
      sessionStorage.setItem("num_holders", response.stats.num_owners);
    })
    .catch(err => console.error(err));
} else {
  console.log("CACHE!");
  document.getElementById("floor_price").innerText = sessionStorage.getItem("floor_price");
  document.getElementById("num_holders").innerText = `${sessionStorage.getItem("num_holders")}+`;
}