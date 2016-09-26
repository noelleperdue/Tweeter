$(function() {
  function renderTweets(tweets) {
    $('#tweets-container').empty();
    $.each(tweets, function(index, tweet) {
      // console.log(tweet);
      var $eachTweet = createTweetElement(tweet);
      $eachTweet.appendTo("#tweets-container");
    });

  }

  function createTweetElement(tweet) {
    var $tweet = $('<article>').addClass('tweet');
    $tweet.html(

      `<div class="header">
      <img class="avatar" src="${tweet.user.avatars.small}"" width="80px" height="80px">
      <div class="username">
      ${tweet.user.name}
      </div>
      <div class="userHandle">
      ${tweet.user.handle}
      </div>
      </div>
      <div class="main">
      <div class="text">
      ${tweet.content.text}
      </div>
      </div>
      <div class="footer">
      <div class="time">
      10 days ago
          <i class="glyphicon glyphicon-heart"></i>
          <i class="glyphicon glyphicon-flag"></i>
          <i class="glyphicon glyphicon-retweet"></i>
      </div>
      </div>`)
    return $tweet;
  }

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json'
    }).then(function (tweets) {
      renderTweets(tweets);
    });
  }

  loadTweets();

  $( "button" ).click(function() {
    $( "#compose-tweet" ).slideToggle();
    $(".text").focus();
  });

  $("#submitTweet").on("click", function(event) {
    event.preventDefault();
    if ($('textarea.text').val().length > 140) {
      return;
    }
    console.log($('#tweetForm').serialize());
    $.ajax({
      method: 'POST',
      url: "/tweets",
      data: $('#tweetForm').serialize()
    }).then(loadTweets());
   });
  }
)



