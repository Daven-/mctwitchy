$(document).ready(function() {
  var streamers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  for (var i = 0; i < streamers.length; i++) {
    $.getJSON("https://api.twitch.tv/kraken/streams/"+streamers[i]+"?callback=?", function(data) {
      console.log(data);
      $(".cards").append(createCard(data.stream));
    });
  }

});

function createCard(stream){
  var game = stream.game;
  var viewers = stream.viewers;


  var channel = stream.channel;
  var url = channel.url;
  var status = channel.status;
  var name = channel.name
  var followers = channel.followers;
  var views = channel.views;
  var lg = channel.broadcaster_language;
  var partner = channel.partner;

  var preview = stream.preview;
  var img = preview.medium;

  var card = "<div class='card horizontal hoverable '>" +
      "<div class='card-image'>"+
        "<a target='_blank' href='"+url+"'><img src='"+img+"'></a>" +
      "</div>"+
      "<div class='card-stacked'>"+
        "<div class='card-content'>"+
          "<p>"+status+"</p>"+
          "<br>"+
          "<div class='chip'>Game: "+game+"</div>"+
          "<div class='chip'>Language: "+lg+"</div>"+
          "<div class='chip'>views: "+views+"</div>"+
          "<div class='chip'>Followers: "+followers+"</div>"+
          "<div class='chip'>Partner: "+partner+"</div>"+
        "</div>"+
        "<div class='card-action'>"+
          "<a target='_blank' href='"+url+"'>"+name+"</a>"+
        "</div>"+
      "</div>";
  return card;
}
