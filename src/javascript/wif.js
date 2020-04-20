// handle searches
function wifExplanations() {

    var wif_id = $("meta[id=wif-id]").attr('content'),
        wif_name = $("meta[id=wif-id]").attr('name');
    var url = `https://akluxdxdoc.execute-api.us-east-1.amazonaws.com/prod/explanation?wif_id=${wif_id}`;

    $('#wif-name').html(`Simple explanation of ${wif_name}:`);

    // make API call and use result to replace contents
    fetch(url).then(resp => resp.json())
      .then(replace_explanations_body)
      .catch(function(e) {
      console.log(e);
    });
}

function replace_explanations_body(results_body) {
    var explanations_body = $("#explanations-list");

    if (results_body.length === 0) {
        $(no_search_results_HTML).appendTo(explanations_body);
    } else {
        console.log(results_body);

        results_body.forEach(function(one_explanation) {
            var title = one_explanation[0],
                explanation = one_explanation[1],
                tag1 = one_explanation[2];

            $(String.format(
                explanation_base_HTML,
                title,
                explanation,
                tag1
                )).appendTo(explanations_body);
        });
    }
    // stop loading spinner
    $('.progress').remove();
}


// set up on load
wifExplanations();