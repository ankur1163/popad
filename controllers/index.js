var PollsController = require("./PollsController");
var CommentController = require("./CommentController");
var Yelpcontroller = require("./Yelpcontroller");
var BooksController = require("./BooksController");
var ImagesController = require("./ImagesController");
var I = require("./icontroller");

module.exports = {
    comment: CommentController,
    polls: PollsController,
    yelp:Yelpcontroller,
    books:BooksController,
    Images:ImagesController,
    I:I
};