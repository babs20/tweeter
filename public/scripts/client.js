'use strict';

/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
// i should just look up the rules for these and add them
// to the eslintrc but not too important right now.

// ESCAPE FUNCTION
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
      <div class="share-options">
        <img src="images/flags.png" alt="Flag">
        <img src="images/retweet.png" alt="Retweet">
        <img src="images/like.png" alt="Like">
      </div>
    </footer>
  </article>
  `;

    return $tweet;
  };

  const $renderTweets = function (arrayOfTweets) {
    for (const tweetData of arrayOfTweets) {
      const $tweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($tweet);
    }
  };

  const $loadTweets = function (isNewTweetSubmission) {
    $.ajax('/tweets')
      .done((data) => {
        const dataToAdd = isNewTweetSubmission ? data.slice(data.length - 1) : data;
        $renderTweets(dataToAdd);
      })
      .fail(() => console.log('Tweets are not loading right now. Try again later!'));
  };

  $loadTweets(); // initialize on page load

  const $toggleTweetBoxButton = $('.tweet-button');
  $toggleTweetBoxButton.on('click', function () {
    const $tweetForm = $(this).parent().siblings('main').find('.new-tweet');
    const $tweetTextArea = $(this).parent().siblings('main').find('#tweet-text');

    if ($tweetForm.hasClass('hidden')) {
      $tweetForm.slideDown().toggleClass('hidden');
      $tweetTextArea.focus();
    } else {
      $tweetForm.slideUp().toggleClass('hidden');
    }
  });

  const handleErrorOnSubmit = function (formElement) {
    const $errorMsgElement = $(formElement).parent().children('.error-box');
    const $tweetLength = $(formElement).children('#tweet-text').val().length;

    switch (true) {
      case $tweetLength === 0:
        $errorMsgElement
          .text('Can not post an empty tweet.')
          .slideDown();
        return true;
      case $tweetLength > 140:
        $errorMsgElement
          .text('Your post is too long. Please shorten it.')
          .slideDown();
        return true;
      default:
        $errorMsgElement.slideUp();
        return false;
    }
  };

  // SUBMIT TWEET FORM
  const $tweetForm = $('#load-tweets');
  $tweetForm.on('submit', function (event) {
    event.preventDefault();
    if (handleErrorOnSubmit(this)) return;

    const $formText = $(this).serialize();
    $.ajax('/tweets', { method: 'POST', data: $formText })
      .done(() => {
        $loadTweets(true);
      })
      .fail(() => console.log('Tweets are not sending right now. Try again later!'));

    $(this).children('#tweet-text').val('');
  });
});
