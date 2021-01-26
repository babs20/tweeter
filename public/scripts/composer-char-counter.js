'use strict';

$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    // parents > find class
    const lengthOfTweet = $(this).val().length;
    const counter = $(this).siblings('div').children('output');

    // toggle
    lengthOfTweet > 140 ? counter.addClass('negative-num') : counter.removeClass('negative-num');

    counter.text(140 - lengthOfTweet);
  });
});
