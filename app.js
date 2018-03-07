/*
Notes-
Make more dynamic? If few results (under 6)?, change columns?
if undefined remove result
*/

let beerInput;
let beerToSearch = document.getElementById('beerToSearch');
let beerResults = document.getElementById('beerResults');
let suggestedStyles = document.getElementById('suggestedStyles');
let columnOne = document.getElementById('c1');
let columnTwo = document.getElementById('c2');
let columnThree = document.getElementById('c3');
let beerStyles = [];

let showBeer = () => {
  beerInput = document.getElementById('beerInput');
  beerToSearch.innerText = beerInput.value;
  beerInput.value = '';
  beerResults.innerHTML = '';
  columnOne.innerHTML = '';
  columnTwo.innerHTML = '';
  columnThree.innerHTML = '';
  searchBeer(beerToSearch.innerText);
  suggestedStyles.innerHTML = '';
  beerStyles = [];
}

let searchBeer = (b) => {
  axios.get('http://api.brewerydb.com/v2/search?q=' + b + '&type=beer&key=69c8131efc2cb16e7997753319d8257d')
    .then(function(response) {
      let beerData = response.data.data;
      if (beerData === undefined) {
        beerResults.innerHTML = 'We couldn\'t find anything with that name, please search for someting else.'
        console.log('no results');
      } else {
        beerData.slice(0, 6).map(beer => {
          let beerCard = document.createElement('div');
          let beerCardHeader = document.createElement('header');
          let beerName = document.createElement('p');
          let beerCardContent = document.createElement('div');
          let beerContent = document.createElement('div');
          let beerAbv = document.createElement('p');
          let beerDescription = document.createElement('p');
          let beerFooter = document.createElement('footer');
          let beerFooterSearch = document.createElement('a');
          beerCard.setAttribute('class', 'card');
          beerCardHeader.setAttribute('class', 'card-header');
          beerName.setAttribute('class', 'card-header-title');
          beerCardContent.setAttribute('class', 'card-content');
          beerContent.setAttribute('class', 'content');
          beerFooter.setAttribute('class', 'card-footer');
          beerFooterSearch.setAttribute('class', 'card-footer-item');
          beerName.textContent = beer.nameDisplay;
          beerAbv.innerHTML = 'ABV:';
          beerAbv.textContent = beerAbv.innerHTML + ' ' + beer.abv + '%';
          beerDescription.innerHTML = 'Description:';
          beerFooterSearch.innerHTML = '<a href="https://encrypted.google.com/search?hl=en&q=' + beerName.textContent + ' beer' + '" target="_blank">Search on (Encrypted) Google</a>';

          if (beer.description === undefined) {
            beerDescription.textContent = 'Description is unavailble.'
          } else {
            beerDescription.textContent = beerDescription.innerHTML + ' ' + beer.description;
          }
          beerStyles.push(beer.style.name);
          if (beerStyles.length <= 2) {
            columnOne.appendChild(beerCard);
            beerCard.appendChild(beerCardContent);
            beerCard.insertBefore(beerCardHeader, beerCardContent);
            beerCardHeader.appendChild(beerName);
            beerCardContent.appendChild(beerContent);
            beerContent.appendChild(beerAbv);
            beerAbv.appendChild(beerDescription);
            beerCard.insertBefore(beerFooter, beerCard.fifthChild);
            beerFooter.appendChild(beerFooterSearch);
          } else if (beerStyles.length <= 4) {
            columnTwo.appendChild(beerCard);
            beerCard.appendChild(beerCardContent);
            beerCard.insertBefore(beerCardHeader, beerCardContent);
            beerCardHeader.appendChild(beerName);
            beerCardContent.appendChild(beerContent);
            beerContent.appendChild(beerAbv);
            beerAbv.appendChild(beerDescription);
            beerCard.insertBefore(beerFooter, beerCard.fifthChild);
            beerFooter.appendChild(beerFooterSearch);
          } else {
            columnThree.appendChild(beerCard);
            beerCard.appendChild(beerCardContent);
            beerCard.insertBefore(beerCardHeader, beerCardContent);
            beerCardHeader.appendChild(beerName);
            beerCardContent.appendChild(beerContent);
            beerContent.appendChild(beerAbv);
            beerAbv.appendChild(beerDescription);
            beerCard.insertBefore(beerFooter, beerCard.fifthChild);
            beerFooter.appendChild(beerFooterSearch);
          }
          console.log(beerStyles);
        })
      }
      beerStyles.map(b => {
        let hi = document.createElement('p');
        hi.textContent = b;
        suggestedStyles.appendChild(hi);
      })
      console.log(beerData);
    })
    .catch(function(error) {
      console.log(error);
    });
}