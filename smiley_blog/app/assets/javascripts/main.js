(function(){

  var app = angular.module('smileyblog', []);

  app.controller('BlogController', function(){
    this.blogs = myBlogs;
    this.user = user;
    this.currentBlog = 1;
    this.setCurrentBlogTo = function(id) {
      this.currentBlog = id;
    };
    this.currentBlogIs = function(id) {
      return this.currentBlog === id;
    };
  });

  var myBlogs = [
    {
      title: 'My Blog',
      content: 'This is my first angular blog',
      id: 1,
      updatedOn: 2014-09-25,
      confidential: false
    },
    {
      title: 'Next Blog',
      content: 'Second Blog',
      id: 2,
      updatedOn: 2014-05-25,
      confidential: true
    },
    {
      title: 'Third Blog',
      content: 'This is the thrid Blog',
      id: 3,
      updatedOn: 2014-08-25,
      confidential: false
    }
  ]

  var user = {
    loggedIn: true
  }

}());

