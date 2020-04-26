/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// format tweet with HTML
const createTweetElement = (tweet) => {
  const {name, avatars, handle} = tweet.user;
  const text = tweet.content.text;
  const created_at = Math.floor((Date.now() - tweet.created_at) / (1000 * 60));

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  return (`
    <article class='tweet'>
      <header>
        <div><img src='${avatars}'>${name}</div>
        <div><span>${handle}</span></div>
      </header>
      <p>
        ${escape(text)}
      </p>
      <footer>
        <div>${created_at} mins</div>
        <div>
          <a href='#'><span class="material-icons">
            flag
            </span></a>
          <a href='#'><span class="material-icons">
            repeat
            </span></a>
          <a href='#'><span class="material-icons">
            favorite
            </span></a>
        </div>
      </footer>
    </article>
  `);
};

// get tweets from "db"
const loadTweets = (callback) => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'JSON',
    success: (response) => callback(response)
  });
};

// render tweets to DOM
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

const renderLastTweet = (tweets) => {
  const tweet = tweets.pop();
  $('.tweets-container').prepend(createTweetElement(tweet));
};

$('document').ready(function() {

  loadTweets(renderTweets);

  $('.compose').on('click', function(){
    $('.new-tweet').slideToggle(600);
    $('#tweet-text').focus();
  })

  const $newTweet = $('.new-tweet form').on('submit', function(event) {
    const count = $newTweet.find('.counter').val();
    const text = $newTweet.find('#tweet-text').val();

    $('.new-tweet button').blur()
    $('#tweet-text').focus();

    if (count < 0) {
      $('.error-container:visible').slideToggle();
      $('.error-message p').text("You've got too many characters, might we suggest a quick edit?");
      $('.error-container').slideToggle(600);
    } else if (text === "" || text === null) {
      $('.error-container:visible').slideToggle();
      $('.error-message p').text("Your tweet is empty. Tell us what's on your mind!");
      $('.error-container').slideToggle(600);
    } else {
      $('.error-container:visible').slideToggle();
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $newTweet.serialize(),
        success: () => loadTweets(renderLastTweet)
      });
      $('#tweet-text').val('');
      $('.counter').val(140);
    }
    event.preventDefault();
  });

});