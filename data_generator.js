/*
 * NOTE: This file generates fake tweet data, and is not intended to be part of your implementation.
 * You can safely leave this file untouched, and confine your changes to index.html.
 */

// set up data structures

window.streams = {};
streams.home = [];
streams.users = {};
streams.users.shawndrost = [];
streams.users.sharksforcheap = [];
streams.users.mracus = [];
streams.users.douglascalhoun = [];
streams.users.nunotheawesome = [];
streams.users.trollsontheloose = [];
streams.users.momster = [];
window.users = Object.keys(streams.users);

// utility function for adding tweets to our data structures
var addTweet = function(newTweet){
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// utility function
var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

// random tweet generator
var opening = ['just', 'DUDE', '', '', '', 'ask me how i', 'completely', 'nearly', 'productively', 'efficiently', 'last night i', 'cheetoface', 'that wizard', 'a ninja', 'a bag of doritos'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'trashed', 'experienced', 'navigated', 'aided', 'enjoyed', 'sold', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of', 'a bag of doritos'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'grumloxes', 'money', 'way of life', 'belief system', 'nail clippings', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#sf', 'but only i know how', 'for real', '#sxsw', '#ballin', '#omg', '#yolo', '#magic', '#lol', '', '', ''];

var randomMessage = function(){
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// generate random tweets on a random schedule
var generateRandomTweet = function(){
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.created_at = new Date();
  tweet.message = randomMessage();
  addTweet(tweet);
};

for(var i = 0; i < 20; i++){
  generateRandomTweet();
}

var scheduleNextTweet = function(){
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 1500);
};
scheduleNextTweet();

function fetchTweets(){

  var $mainBody = $('.main');
  $mainBody.html('');

  var $refreshButton = $('<span class="button" id="button" style="background: linear-gradient(rgb(255, 196, 119) 5%, rgb(251, 158, 37) 100%) rgb(255, 196, 119); border-radius: 13px; border: 2px solid rgb(238, 180, 79); display: inline-block; cursor: pointer; color: rgb(255, 255, 255); font-family: Arial; font-size: 15px; font-weight: bold; padding: 1px 31px; text-decoration: none; margin: 10px, align: center;">Refresh Tweets!</span>');

  $refreshButton.appendTo($mainBody);

  $(".button").click(function(){
    fetchTweets();
  })

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    var $tweetTime = $('<div></div>');
    var $tweetUser = $('<div id="user"></div>');
    var $tweetRelativeTime = $('<div></div>');
    var timeDff = Date.now() - tweet.created_at;

    $tweetUser.text('@' + tweet.user);
    $tweetUser.css({'font-size': '1.5em', 'font-style': 'bolder', 'padding-top': '20px', 'padding-bottom': '0px'});

    $tweet.text(tweet.message);
    $tweet.css({'font-size': '2em', 'font-style': 'bolder', 'padding-top': '0px', 'padding-bottom': '0px'});

    $tweetTime.text('Tweeted at: ' + tweet.created_at.toLocaleString());
    $tweetTime.css({'font-style': 'italic', 'padding-top': '10px'});

    $tweetUser.appendTo($mainBody);
    $tweet.appendTo($mainBody);
    $tweetTime.appendTo($mainBody);

    index -= 1;
  }
}

function fetchUserTweets(user){
  var $sidebarRight = $('.sidebar-right');
  $sidebarRight.html('').css({'background-color': '#9BBBCA'});

  var tweets = userTweets(user);
  var index = tweets.length - 1;
  while (index >= 0){
    var tweet = tweets[index];
    var $tweet = $('<div></div>');
    var $tweetTime = $('<div></div>');
    var $tweetRelativeTime = $('<div></div>');
    var timeDff = parseInt((Date.now() - tweet.created_at)/1000);

    $tweet.text('@' + tweet.user + ': ' + tweet.message);

    $tweetTime.text('Tweeted ' + timeDff + ' seconds ago');
    $tweetTime.css({'font-size': '0.75em', 'font-style': 'italic', 'padding-top': '0px', 'padding-bottom': '20px'});

    $tweet.text('@' + tweet.user + ': ' + tweet.message);

    $tweet.appendTo($sidebarRight);
    $tweetTime.appendTo($sidebarRight);

    index-= 1;

  }
}

var userTweets = function(user) {
  return streams.users[user].splice(-10);
}

// utility function for letting students add "write a tweet" functionality
// (note: not used by the rest of this file.)
var writeTweet = function(message){
  if(!visitor){
    throw new Error('set the global visitor property!');
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  addTweet(tweet);
};