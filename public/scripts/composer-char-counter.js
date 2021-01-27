'use strict';

$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    const lengthOfTweet = $(this).val().length;
    const counter = $(this).parent().find('.counter');

    counter.toggleClass('change-text-red', lengthOfTweet > 140);

    counter.text(140 - lengthOfTweet);
  });
});
