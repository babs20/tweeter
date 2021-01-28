'use strict';

$(document).ready(function () {
  const buttonToTop = $('.jump-to-top');

  $(window).on('scroll', function () {
    buttonToTop.toggleClass('hidden', $(window).scrollTop() < 500);
  });

  $(buttonToTop).on('click', function () {
    const $tweetForm = $('.new-tweet');
    const $tweetTextArea = $('#tweet-text');
    $tweetForm.slideDown().toggleClass('hidden');
    $tweetTextArea.focus();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
