String.format = function() {
  var s = arguments[0];
  for (var i = 0; i < arguments.length - 1; i++) {
      var reg = new RegExp("\\{" + i + "\\}", "gm");
      s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}

var no_search_results_HTML = `
  <div class="column is-centered">
    <div class="notification is-warning is-light">
      No results. Please try again!
    </div>
  </div>
  `;

var tile_base_HTML = `
  <div class="column is-3-desktop is-12-mobile">
    <a href='src/wifs/what-is-{0}-for.html'>
      <div class="box">
        <article class="media">
          <div class="media-left">
            <span class="icon is-small">
              <i class="fas fa-{1}" aria-hidden="true"></i>
            </span>
          </div>
          <div class="media-content">
            <p><strong>{2}</strong></p>
          </div>
        </article>
        <div class="tags">
          <span class="tag">{3}</span>
        </div>
      </div>
    </a>
  </div>
`;

var explanation_base_HTML = `
<div id='card-container'>
  <div class="card">
    <div class="card-content">
      <div class="columns">
        <div class='column is-8'>
          <h3 class="subtitle is-5">
            {0}
          </h3>
        </div>
        <div class='column is-4'>
          <div class="tags has-addons is-pulled-right">
            <span class="tag">Rating:</span>
            <span class="tag is-primary">79%</span>
          </div>
        </div>
      </div>

    <p class="is-medium">
      {1}
    </p>

    </div>

    <footer class="card-footer">
      <p class="card-footer-item">
        Clear + accurate?
        <i class="fas fa-thumbs-up"></i>
        <i class="fas fa-thumbs-down"></i>
      </p>
      <p class="card-footer-item">
        <button class="button is-warning is-light is-small">Suggest Revision</button>
      </p>
      <p class="card-footer-item">
        <span>
          Share:
          <a href="#"><i class='fab fa-facebook'></i></a>
          <a href="#"><i class='fab fa-twitter'></i></a>
          <a href="#"><i class='fas fa-copy'></i></a>
        </span>
      </p>
    </footer>
  </div>
</div>
<br>
`;