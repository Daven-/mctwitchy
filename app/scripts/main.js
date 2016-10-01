var streamers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
var offline = [];
var online = [];
$(document).ready(function() {


  for (var i = 0; i < streamers.length; i++) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + streamers[i] + '',
      headers: {
        'Client-ID': 'jsjf13ci2ft8uhkddria00jwyz7rmis'
      },
      success: function(data) {
        console.log(data);
        if (data.stream == null) {
          $.ajax({
            type: 'GET',
            url: data._links.channel,
            headers: {
              'Client-ID': 'jsjf13ci2ft8uhkddria00jwyz7rmis'
            },
            success: function(data) {
              $('.offline').append(createCardOffline(data));
            }
          });
        } else {
          //console.log(data);
          $('.online').append(createCardOnline(data.stream));
        }
      }
    });
  }

  $('#test5').click(function(e) {
    var target = e.target;
    console.log(target.checked);
    if (target.checked) {
      $('.online').attr('hidden', null);
    } else {
      $('.online').attr('hidden', 'true');
    }
  });

  $('#test6').click(function(e) {
    var target = e.target;
    console.log(target.checked);
    if (target.checked) {
      $('.offline').attr('hidden', null);
    } else {
      $('.offline').attr('hidden', 'true');
    }
  });

});


function createCardOffline(channel) {
  var status = channel.status != null ? channel.status : 'No Status';
  var url = channel.url;
  var name = channel.name;
  var img = channel.logo;

  var card = '<div class=\'card horizontal hoverable \'>' +
    '<div class=\'card-image\'>' +
    '<a target=\'_blank\' href=\'' + url + '\'><img style="width: 320px; height: 180px;" src=\'' + img + '\'></a>' +
    '</div>' +
    '<div class=\'card-stacked\'>' +
    '<div class=\'card-content\'>' +
    '<p>' + status + '</p>' +
    '<br>' +
    '<div class=\'chip btn-warning\'>Offline</div>' +
    '</div>' +
    '<div class=\'card-action\'>' +
    '<a target=\'_blank\' href=\'' + url + '\'>' + name + '</a>' +
    '</div>' +
    '</div>';
  return card;
}


function createCardOnline(stream) {
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

  var card = '<div class=\'card horizontal hoverable \'>' +
    '<div class=\'card-image\'>' +
    '<a target=\'_blank\' href=\'' + url + '\'><img src=\'' + img + '\'></a>' +
    '</div>' +
    '<div class=\'card-stacked\'>' +
    '<div class=\'card-content\'>' +
    '<p>' + status + '</p>' +
    '<br>' +
    '<div class=\'chip btn-warning\'>Game: ' + game + '</div>' +
    '<div class=\'chip btn-warning\'>Language: ' + lg + '</div>' +
    '<div class=\'chip btn-warning\'>Viewers: ' + viewers + '</div>' +
    '<div class=\'chip btn-warning\'>Followers: ' + followers + '</div>' +
    '<div class=\'chip btn-warning\'>Lifetime Views: ' + views + '</div>' +

    '</div>' +
    '<div class=\'card-action\'>' +
    '<a target=\'_blank\' href=\'' + url + '\'>' + name + '</a>' +
    '</div>' +
    '</div>';
  return card;
}
