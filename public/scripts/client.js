$(document).ready(() => {
  
  $("#formsubmit").on("submit", function (event) {
    event.preventDefault();
    
    const $input = $('#tweet-text');

    if ($input.val().length === 0) { 
      
    }
    if ($input.val().length > 140) { 
      
    } else {

    $.ajax("http://localhost:8080/tweets", {
      method: "POST",
      data: $(this).serialize(),
    }).then((res, status) => {
      $()
    });
  }
});
  
  const loadTweets = function(event) {
    $.ajax(`/tweets`, {
      method: "GET"
    }).then((res, status) => {
      renderTweets(res);
      
      console.log(res, status)
    });
  }
  loadTweets(true);
});

  // const tweetData = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd"
  //     },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function (tweets) {
    for (let tweet of tweets) {
      const element = createTweetElement(tweet);
      $('#tweetcontainer').prepend(element);
    }
  };

  const createTweetElement = function (tweet) {
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
</article>`)

    return $tweet;
  };

