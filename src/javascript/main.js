// hot-key to focus search bar
document.addEventListener('keyup', (e) => {
  if (e.code === 'Slash') {
    $('#search-bar').focus();
  }
});

// hot-key to search
document.addEventListener('keyup', (e) => {
  if (e.code === 'Enter') {
    $('#search-button').click();
  }
});


// handle searches
function searchResults() {

  // start loading spinner
  $('#search-button').addClass('is-loading');

  var search_string = document.getElementById("search-bar").value;
  var url = `https://akluxdxdoc.execute-api.us-east-1.amazonaws.com/prod/search?search_string=${search_string}`;

  // make API call and use result to replace contents
  fetch(url).then(resp => resp.json())
    .then(replace_search_results)
    .catch(function(e) {
    console.log(e);
  });
}

function replace_search_results(results_body) {
  var searchbar = $("#search-results");

  searchbar.empty();

  if (results_body.length === 0) {
    $(no_search_results_HTML).appendTo(searchbar);
  }

  results_body.forEach(function(one_wif) {
    var wif_name = one_wif[0],
      wif_icon = one_wif[1],
      tag_name = one_wif[2],
      wif_html_name = wif_name.replace('/', ' ').replace(' ', '-');

      $(String.format(
        tile_base_HTML,
        wif_html_name,
        wif_icon,
        wif_name,
        tag_name
        )).appendTo(searchbar);
  });

  // stop loading spinner
  $('#search-button').removeClass('is-loading');
}


// set up on load
searchResults();