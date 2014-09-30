//= require constants/blog_constants
//= require constants/tag_constants
//= require dispatchers/blog_dispatcher
//= require dispatchers/tag_dispatcher

var BlogStore = (function(){

  var _blogs = [];
  var _current_blog = null;
  var CHANGE_EVENT = 'change';
  var SHOW_EVENT = 'show';
  var BlogActionTypes = BlogConstants.ActionTypes;
  var TagActionTypes = TagConstants.ActionTypes;


  return {

    blogs: function() {
      return _blogs;
    },

    currentBlog: function() {
      return _current_blog;
    },

    setCurrentBlog: function(blog) {
      _current_blog = blog;
      this.triggerShow();
    },

    unsetCurrentBlog: function() {
      _current_blog = null;
      this.triggerShow();
    },

    getBlogs: function(tag) {
      $.ajax({
        url: "/blogs",
        data: {tag: tag},
        success: function(allBlogs) {
          _blogs = allBlogs;
          this.triggerChange();
        }.bind(this)
      })
    },

    postBlog: function(blogData) {
      $.ajax({
        url: '/blogs',
        type: "POST",
        data: blogData
      })
      .done(function(newBlogs) {
        this.blogList = newBlogs;
        this.triggerChange();
      }.bind(this))
    },

    deleteBlog: function(blogId) {
      var url = "/blogs/" + blogId
      $.ajax({
        url: url,
        type: "DELETE"
      })
      .done(function(blogs) {
        this.blogList = blogs;
        this.triggerChange();
      }.bind(this))
    },

    triggerChange: function() {
      $(this).trigger(CHANGE_EVENT)
    },

    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },

    triggerShow: function() {
      $(this).trigger(SHOW_EVENT);
    },

    addShowEvent: function(callback) {
      $(this).on(SHOW_EVENT, callback);
    },

    payload: function(payload) {
      var action = payload.action;

      switch(action.type) {
        case BlogActionTypes.SHOW_DETAIL:
          this.setCurrentBlog(action.data);
        break;
        case BlogActionTypes.CREATE_BLOG:
          this.postBlog(action.data);
        break;
        case BlogActionTypes.DELETE_BLOG:
          this.deleteBlog(blogId);
        break;
        case TagActionTypes.SHOW_ALL_BLOGS:
          this.unsetCurrentBlog();
          this.getBlogs(action.data);
        break;
        case TagActionTypes.SHOW_RECENT_BLOGS:
          this.unsetCurrentBlog();
          this.getBlogs(action.data);
        break;
      }
    }
  }

}());

BlogDispatcher.register(BlogStore.payload.bind(BlogStore));
TagDispatcher.register(BlogStore.payload.bind(BlogStore));
