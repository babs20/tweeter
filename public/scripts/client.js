'use strict';

/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
    <p>${escape(tweetData.content.text)}</p>
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
    $.ajax('/tweets', {
      success: (data) => {
        renderTweets(data);
      }
    });
  };

  loadTweets();

  $(function () {
    const $form = $('#load-tweets');
    $form.on('submit', function (event) {
      event.preventDefault();

      const errorMsg = $(this).parent().children('label');
      const tweetLength = $(this)
        .children('#tweet-text')
        .val()
        .length;

      switch (true) {
        case tweetLength === 0:
          console.log('yes');
          errorMsg.text('Can not post an empty tweet.');
          errorMsg
            .addClass('error-shown')
            .slideDown()
            .removeClass('error-hidden');
          return;
        case tweetLength > 140:
          errorMsg.text('Your post is too long. Please shorten it.');
          errorMsg
            .addClass('error-shown')
            .slideDown()
            .removeClass('error-hidden');
          return;
        default:
      }

      errorMsg.slideUp();

      const formText = $(this).serialize();
      $.ajax('/tweets', { method: 'POST', data: formText, success: () => loadTweets() });

      $(this).children('#tweet-text').val('');
    });
  });

  // renderTweets(data);
});
