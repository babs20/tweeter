'use strict';

/* eslint-disable no-unused-expressions */
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
    for (const tweetData of arrayOfTweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($tweet);
    }
  };

  const loadTweets = function (isNewTweetSubmission) {
    $.ajax('/tweets', {
      success: (data) => {
        const dataToAdd = isNewTweetSubmission ? data.slice(data.length - 1) : data;
        renderTweets(dataToAdd);
      }
    });
  };

  loadTweets();

  $(function () {
    const writeNewTweet = $('.tweet-button');
    writeNewTweet.on('click', function () {
      const $tweetForm = $(this).parent().siblings('main').find('.new-tweet');
      const $tweetTextArea = $(this).parent().siblings('main').find('#tweet-text');
      if ($tweetForm.hasClass('hidden')) {
        $tweetForm.slideDown().toggleClass('hidden');
        $tweetTextArea.focus();
      } else {
        $tweetForm.slideUp().toggleClass('hidden');
      }
    });
  });

  $(function () {
    const $form = $('#load-tweets');
    $form.on('submit', function (event) {
      event.preventDefault();

      const errorMsg = $(this).parent().children('label');
      const tweetLength = $(this)
        .children('#tweet-text')
        .val()
        .length;

      switch (true) { // MAKE OWN FUNCTION
        case tweetLength === 0:
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
      $.ajax('/tweets', { method: 'POST', data: formText, success: () => loadTweets(true) });

      $(this).children('#tweet-text').val('');
    });
  });
});
