// const KEY = `69c8131efc2cb16e7997753319d8257d`;
// const URL = `http://api.brewerydb.com/v2//search?q=chocolate&type=beer&key=`;

let beerInput;
let beerToSearch = document.getElementById('beerToSearch');
let beerResults = document.getElementById('beerResults');
let suggestedStyles = document.getElementById('suggestedStyles');
let beerStyles = [];

let showBeer = () => {
  beerInput = document.getElementById('beerInput');
  beerToSearch.innerText = beerInput.value;
  beerInput.value = '';
  beerResults.innerHTML = '';
  searchBeer(beerToSearch.innerText);
  suggestedStyles.innerHTML = '';
  beerStyles = [];
}

let searchBeer = (b) => {
  axios.get('http://api.brewerydb.com/v2/search?q=' + b + '&type=beer&key=69c8131efc2cb16e7997753319d8257d')
  .then(function (response) {
    let beerData = response.data.data;
    if (beerData === undefined) {
      beerResults.innerHTML = 'We couldn\'t find anything with that name, please search for someting else.'
      console.log('no results');
    } 
    else {
      beerData.slice(0,5).map( beer => {
      let beerName = document.createElement('div');
      let beerAbv = document.createElement('p');
      let beerDescription = document.createElement('p');
      beerName.textContent = beer.nameDisplay;
      beerDescription.innerHTML = 'Description';
      beerAbv.innerHTML = 'ABV';
      beerAbv.textContent = beerAbv.innerHTML + ' ' + beer.abv;
      if (beer.description === undefined) {
        beerDescription.textContent = 'There is currently no description.'
      } else {
        beerDescription.textContent = beerDescription.innerHTML + ': ' + beer.description;
      }
      beerStyles.push(beer.style.name);
      beerResults.appendChild(beerName);
      beerName.appendChild(beerAbv);
      beerAbv.appendChild(beerDescription);
    })
    }
    beerStyles.map(b => {
      let hi = document.createElement('p');
      hi.innerHTML = b;
      suggestedStyles.appendChild(hi);
    })    
    console.log(beerData);    
  })
  .catch(function (error) {
    console.log(error);
  });
}