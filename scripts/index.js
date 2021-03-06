import customSelect from 'custom-select';

// Require icons
const noSun = require("/images/icons/no-sun.svg"),
      sun = require("/images/icons/low-sun.svg"),
      rarelyWater = require("/images/icons/1-drop.svg"),
      regularlyWater = require("/images/icons/2-drops.svg"),
      dailyWater = require("/images/icons/3-drops.svg"),
      toxicity = require("/images/icons/toxic.svg"),
      noToxicity = require("/images/icons/pet.svg");

const filterIcons = {
  sunlight: {
    no: noSun,
    low: sun,
    high: sun
  },
  water: {
    rarely: rarelyWater,
    regularly: regularlyWater,
    daily: dailyWater
  },
  pets: {
    true: toxicity,
    false: noToxicity
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const noResultsContent = document.querySelector('#no-results');
  const withResultsContent = document.querySelector('#with-results');
  const grid = document.querySelector('.grid');

  // Creates custom selects
  customSelect('select');

  const fetchData = (params) => {
    fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${params.sun}&water=${params.water}&pets=${params.pets}`)
      .then(function (response) {
        // The API call was successful!
        return response.json();
      }).then(function (data) {
        // This is the JSON from our response
        let gridItems = [];
        grid.innerHTML = '';

        if (data.length > 0) {
          withResultsContent.classList.add('results__content--show');
          noResultsContent.classList.add('results__content--hide');

          data.map(plant => {
            let gridItem = `
            <div class='grid__item ${(plant.staff_favorite === true) ? "grid__item--favorite" : ""}'>
              <div class='grid__illustration'>
                <img class='grid__image' src=${plant.url} alt=${plant.name}/>        
              </div>
              <div class='grid__info'>
                <h3 class='grid__name'>${plant.name}</h3>
                <div class='grid__price-icons'>
                  <span class='grid__price'>$${plant.price}</span>
                  <div class='grid__icons'>
                    <img class='grid__icon' src=${filterIcons.sunlight[params.sun]} />
                    <img class='grid__icon' src=${filterIcons.water[params.water]} />
                    <img class='grid__icon' src=${filterIcons.pets[params.pets]} />
                  </div>
                </div>
              </div>
            </div>`
            
            if (plant.staff_favorite === true) {
              gridItems.unshift(gridItem);
            } else {
              gridItems.push(gridItem);
            }
          });
          gridItems.map(item => {
            grid.innerHTML = grid.innerHTML + item;
          })
        } else {
          withResultsContent.classList.remove('results__content--show');
          noResultsContent.classList.remove('results__content--hide');
        } 
      }).catch(function (err) {
        // There was an error
        console.warn('Something went wrong.', err);
      });
    }
  
  const buildFilter = () => {
    let params = {};

    // Get all select filters
    document.querySelectorAll('.filter__select').forEach(filter => {
      // Get the value when it changes
      filter.addEventListener("change", event => {
        params[event.target.id] = event.target.value;

        // Make a call to the API
        if (Object.keys(params).length === 3) {
          fetchData(params)
        }
      })
    });
  }

  buildFilter();

  const scrollBehavior = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }

  scrollBehavior();
});