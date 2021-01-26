/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = function (tweetData) {
    let $tweet = `<article>
    <header>
      <div class="profile-icon">
        <img src=${tweetData.user.avatars} alt="Profile Pic">
        <span>${tweetData.user.name}</span>
      </div>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <span>10 days ago</span>
      <div>
        <img src="images/flags.png" alt="Flag">
        <img src="images/retweet.png" alt="Retweet">
        <img src="images/like.png" alt="Like">
      </div>
    </footer>
  </article>`;

    return $tweet;
  };

  const renderTweets = function (arrayOfTweets) {
    for (const tweet of arrayOfTweets) {
      const $tweet = createTweetElement(tweet);
      $('#tweets-container').append($tweet);
    }
  };

  renderTweets(data);

});