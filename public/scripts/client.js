'use strict';

$(document).ready(function () {
  const createTweetElement = function (tweetData) {
    let $tweet = `
    <article>
      <header>
      <div class="profile-icon">
        <img src=${tweetData.user.avatars} alt="Profile Pic">
        <span>${tweetData.user.name}</span>
      </div>
      <span class="handle">${tweetData.user.handle}</span>
    </header>
    <p>${tweetData.content.text}</p>
    <footer>
      <span>${moment(tweetData.created_at).fromNow()}</span>
      <div>
        <img src="images/flags.png" alt="Flag">
        <img src="images/retweet.png" alt="Retweet">
        <img src="images/like.png" alt="Like">
      </div>
    </footer>
  </article>
  `;

    return $tweet;
  };

  const renderTweets = function (arrayOfTweets) {
    const reverseTweetsArray = arrayOfTweets.reverse();
    for (const tweetData of reverseTweetsArray) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax('/tweets')
      .then((data) => {
        renderTweets(data);
      })
      .catch((error => {
        console.log(error.statusText);
      }));
  };

  loadTweets();

  $(function () {
    const $form = $('#load-tweets');
    $form.on('submit', function (event) {
      event.preventDefault();

      const formText = $(this).serialize();

      $.ajax('/tweets', { method: 'POST', data: formText })
        .then((data) => {
          console.log(data);
        });
    });
  });

  // renderTweets(data);

});