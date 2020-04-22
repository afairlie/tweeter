/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 // format tweet with HTML
const createTweetElement = (tweet) => {
  const {name, avatars, handle} = tweet.user
  const text = tweet.content.text;
  const created_at = tweet.created_at;

  //  const $tweet = $('<article>')
  return (`
    <article class='tweet'>
      <header>
        <div><img src='${avatars}'>${name}</div>
        <div><span>${handle}</span></div>
      </header>
      <p>
        ${text}
      </p>
      <footer>
        <div>${created_at} "days"</div>
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
  `)
}

// ajax response param, loop, format , & append
const renderTweets = (tweets) => {
  const markupArray = [];

  for (const tweet of tweets) {
    markupArray.push(createTweetElement(tweet))
  }

  // return markupArray.join('');
  $('.tweets-container').append(markupArray.join(''));
}

// when document ready, fetch tweets from server via ajax, append to DOM
$('document').ready(function(){
  $.ajax({
    url: 'http://localhost:8080/tweets',
    type: 'GET',
    dataType: 'JSON'
  })
  .then((response) => {
    // populat tweets on DOM in .container in HTML
    renderTweets(response);
  })
  .catch((error) => {
    console.log(error);
  })

    // jQuery, we can use event handlers to prevent the existing form submission, and instead, submit the form data using AJAX.
    // $.ajax({
    //   url: '/tweets',
    //   type: 'POST',
    //   dataType: 'JSON'
    // })

 })