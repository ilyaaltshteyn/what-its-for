function runSearch() {
    // start loading spinner
    $('#search-button').addClass('is-loading');

    var searchbar_text = $("#search-bar").val();

    if (searchbar_text != "") {
      updateSearchParam('search', searchbar_text);
    }

    var search_string = getParameterByName('search');

    if (search_string == null) {
      // there was no search string, user must have just loaded the homepage
      search_string = '';
    }

    var url = `https://akluxdxdoc.execute-api.us-east-1.amazonaws.com/prod/search?search_string=${search_string}`;

    // make API call and use result to replace contents
    fetch(url).then(resp => resp.json())
      .then(replace_search_results)
      .catch(function(e) {
      console.log(e);
    });
  }

// handle searches from non-homepage
function goHomePageWithSearch() {
  var search_string = $("#search-bar").val();
  // redirect to homepage with a query string
  window.location = `src/?search=${search_string}`;
}
