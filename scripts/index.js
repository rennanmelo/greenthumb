document.addEventListener("DOMContentLoaded", function() {

  const fetchData = (params) => {
    fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${params.sun}&water=${params.water}&pets=${params.pets}`)
      .then(function (response) {
        // The API call was successful!
        return response.json();
      }).then(function (data) {
        // This is the JSON from our response
        console.log(data);
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
});