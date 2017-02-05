var quoteUri = "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback";
var twitterUri = "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=";

$(document).ready(function() {
  $.ajaxSetup({cache : false});
  quoteGenerator();
  $("#getQuote").on("click", function() {
     quoteGenerator();
  });
  
  $("#twit").on("click", function() {
    var t_auth = $("#author").text().trim().substr(2, $("#author").text().trim().length - 2 ) + ": ";
    var remainingChars = 140 - t_auth.length - 8;
    var t_content =  remainingChars >  $("#content").text().length ? $("#content").text() : $("#content").text().substr(0, remainingChars);
    window.open(twitterUri + t_auth + t_content);
  })
});

function quoteGenerator() {  
  $("#getQuote").html("<i class='fa fa-spinner fa-spin  fa-fw'></i> loading...");
  $("#getQuote").prop("disabled", true);
  $("#error").hide();
  $.getJSON(quoteUri)
    .done(function(data) {
    $("#content").html(data[0].content);
    $("#author").html("<em> - " + data[0].title + "</em>");
  })
    .fail(function(jqXHR, textStatus, err) {
    $("#error").show();
    $("#error").html("<i class='fa fa-exclamation-triangle'> error: " + err + "</i>");
  })
    .always(function() {
    $("#getQuote").html("<i class='fa fa-comment'></i> say another");
    $("#getQuote").prop("disabled", false);
  });    
}