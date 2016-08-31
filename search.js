$(document).ready(function() {
  var searchTerm;
  
  $("#search").submit(function(event) {
    formatCSS();
    searchTerm = $("#search-input").val();
    callAPI(searchTerm);
    event.preventDefault();
  });

  function callAPI(searchTerm) {
    var searchURL = "https://en.wikipedia.org/w/api.php?action=query&format=json&callback=?&list=search&srsearch=" + searchTerm
    $.getJSON(searchURL, function(data) {
      var html = "";
      html += '<h5 id="announceResults">Wikipedia results for "' + searchTerm + '":</h5>';
      var search = data.query.search;
      for (i in search) {
        var link = "https://en.wikipedia.org/wiki/" + search[i].title;
        html += "<a href='" + link + "' target='_blank' rel='noopener noreferrer'>";
        html += "<div class='result' style='display: none'>";
        html += "<h4>" + search[i].title + "</h4>";
        html += "<p>" + search[i].snippet + "</p>";
        html += "</div>";
        html += "</a>";

      }
      $("#results").html(html);
      $(".result").slideDown("fast");
    });
  };
  
  function formatCSS() {
    $("h1").remove();
    $("img").remove();
    $("#search").css("display", "inline-block");
    $("#random").css("display", "inline-block");
    $("#search").css("margin", "50px 0px 25px 7%");
    $("#random").css("margin", "-50px 20px 25px 40px");
    if ($(window).width()<493) {
      $("#random").css("display", "block");
      $("#search").css("margin", "50px 0px 0px 7%");
      $("#random").css("margin", "20px 20px 20px 7%");
    }
  };
});