$(document).ready(() => {
  
  $("#formsubmit").on("submit", function(event) {
    event.preventDefault();
    let error = false;
    const $input = $('#tweet-text');
    //includes .delay to remove alerts
    if ($input.val().length === 0) {
      $("#alert-boxA").slideDown('slow');
      $("#alert-boxA").delay(1000).slideUp('slow');
      error = true;
    }
    if ($input.val().length > 140) {
      $("#alert-boxB").slideDown('slow');
      $("#alert-boxB").delay(1000).slideUp('slow');
      error = true;
    }
    if (error === false) {
    //AJAX Post
      $.ajax("http://localhost:8080/tweets", {
        method: "POST",
        data: $(this).serialize(),
      }).then(() => {
        loadTweets();
      });
    }
  });

  const loadTweets = function() {
    $.ajax(`/tweets`, {
      method: "GET"
    }).then((res) => {
      renderTweets(res);
      
    });
  };
  loadTweets();
});

const renderTweets = function(tweets) {
  $("#tweetcontainer").empty();
  for (let tweet of tweets) {
    const element = createTweetElement(tweet);
    $('#tweetcontainer').prepend(element);
  }
};

const createTweetElement = function(tweet) {
  const ago = timeago.format(tweet.created_at);
  const $tweet = $(`
  <article class="tweetarticle">
    <header class="tweethead">
    <img src="${tweet.user.avatars}">
    <span>${tweet.user.name}</span>
    <span>${tweet.user.handle}</span>
</header>
<body class="tweetbody">
${tweet.content.text}
<body/>
<footer class="footer">
  <span>${ago}</span>
    <span class="icons">
       <i class="fa-solid fa-flag"></i>
       <i class="fa-solid fa-retweet"></i>
       <i class="fa-solid fa-heart"></i>
    </span>
</footer>
</article>`);

  return $tweet;
};

