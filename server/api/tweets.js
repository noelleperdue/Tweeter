"use strict";

const User    = require("../lib/user-helper")
const express = require('express');
const tweets  = express.Router();

module.exports = function(db) {

  tweets.get("/", function(req, res) {
    let tweets = db.collection("tweets").find().sort({"created_at": -1});
    tweets.toArray((err, results) => {
      console.log(results);
      // simulate delay
      setTimeout(() => {
        return res.json(results);
      }, 300);
    });
  });

  tweets.post("/", function(req, res) {
    console.log("New Tweet, Body:", req.body);
    if (!req.body.text) {
      res.status(400);
      return res.send("{'error': 'invalid request'}\n");
    }

    const user = req.body.user ? req.body.user : User.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };
    db.collection("tweets").insertOne(tweet, (err, result) => {
      res.json(result);
    });
  });

  return tweets;

}
// "use strict";

// const User    = require("../lib/user-helper")
// const express = require('express');
// const tweets  = express.Router();

// module.exports = function(db) {

// tweets.post("/tweets", function(req, res) {
//   console.log(req);
//   if (!req.body.text) {
//     res.status(400);
//     return res.send("{'error': 'invalid request'}\n");
//   }

//   const user = req.body.user ? req.body.user : User.generateRandomUser();
//   const tweet = {
//     user: user,
//     content: {
//       text: req.body.text
//     },
//     created_at: Date.now()
//   };
//     db.collection("tweets").insertOne(tweet, (err, result) => {
//       res.json(result);
//     });
//     return tweets;
//   });

//   tweets.get("/", function(req, res) {
//     let tweets = db.collection("tweets").find().sort({"created_at": -1});
//     tweets.toArray((err, results) => {
//       // simulate delay
//       setTimeout(() => {
//         return res.json(results);
//       }, 300);
//     });
//   });



//   tweets.post("/", function(req, res) {
//     // console.log("New Tweet, Body:", req.body);
//     if (!req.body.text) {
//       res.status(400);
//       return res.send("{'error': 'invalid request'}\n");
//     }

//     const user = req.body.user ? req.body.user : User.generateRandomUser();
//     const tweet = {
//       user: user,
//       content: {
//         text: req.body.text
//       },
//       created_at: Date.now()
//     };
//     db.collection("tweets").insertOne(tweet, (err, result) => {
//       res.json(result);
//     });
//   });

//   return tweets;

// }


// // const createTweet = () => {
// //     // an inner function to render all the articles from JSON data
// //     const renderTweets = (???) => {
// //       // fetch the HTML element where we will render articles using jQuery
// //       const tweetsElm = $('#articles');
// //       // append each article into the element
// //       articles.forEach((article) => {
// //         tweetsElm.append(buildArticleHTML(article));
// //       })
// //     }

