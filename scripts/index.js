document.addEventListener("DOMContentLoaded", function() {

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