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

  //  const $tweet = $('<article>')
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

// ajax response param, loop, format , & append
const renderTweets = (tweets) => {
  for (const tweet of tweets) {
    $('.tweets-container').prepend(createTweetElement(tweet));
  }
};

const renderLastTweet = (tweets) => {
  const tweet = tweets.pop();
  $('.tweets-container').prepend(createTweetElement(tweet));
};

const loadTweets = (callback) => {
  $.ajax({
    url: '/tweets',
    type: 'GET',
    dataType: 'JSON',
    success: (response) => callback(response)
  });
};

const displayError = (message) => {
  $('.error-container').append("<span class='material-icons'>error_outline</span>")
  $('.error-container').append(`<p class='error-message'>${message}</p>`)
  $('.error-container').append("<span class='material-icons'>error_outline</span>")
  $('.error-container').addClass('display-error');
}

const clearError = () => {
  if ($('.error-container').hasClass('display-error')) {
    $('.error-container').empty().removeClass('display-error');
  }
}

// when document ready, fetch tweets from server via ajax, append to DOM
$('document').ready(function() {

  loadTweets(renderTweets);

  const $newTweet = $('.new-tweet form').on('submit', function(event) {
    
    const count = $newTweet.find('.counter').val();
    const text = $newTweet.find('#tweet-text').val();

    if (count < 0) {
      clearError();
      displayError("You've got too many characters, might we suggest a quick edit?");
      return false;
    } else if (text === "" || text === null) {
      clearError();
      displayError("Your tweet is empty. Tell us what's on your mind!");
      return false;
    } else {
      clearError();
      $.ajax({
        url: '/tweets',
        type: 'POST',
        data: $newTweet.serialize(),
        success: () => loadTweets(renderLastTweet)
      });
      $('#tweet-text').val('');
    }
    event.preventDefault();
  });

});