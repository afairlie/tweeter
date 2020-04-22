/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweet = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

 // createTweetElement that takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet.

 const createTweetElement = (tweet) => {
   const {name, avatars, handle} = tweet.user
   const {text} = tweet.content
   const {created_at} = tweet
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

 $('document').ready(function(){
   $('.tweets-container').append(createTweetElement(tweet));
 })