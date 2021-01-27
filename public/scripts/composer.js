'use strict';

$(document).ready(function () {
  const buttonToTop = $('.to-top');
  $(window).on('scroll', function () {
    buttonToTop.toggleClass('hidden', $(window).scrollTop() < 500);
  });

  $(buttonToTop).on('click', function () {
    window.scrollTo(0, 0);

    // Could possibly make a helper function for this
    const $tweetForm = $('.new-tweet');
    const $tweetTextArea = $('#tweet-text');
    $tweetForm.slideDown().toggleClass('hidden');
    $tweetTextArea.focus();
  });
});
