$(document).ready(function () {
  $('#tweet-text').on('input', function () {
    const lengthOfTweet = $(this).val().length;
    const counter = $(this).siblings('div').children('output');

    lengthOfTweet > 140 ? counter.addClass("negative-num") : counter.removeClass("negative-num");

    counter.val(140 - lengthOfTweet);
  });



});