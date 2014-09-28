var BlogStore = (function(){

  var _blogs = [];
  var CHANGE_EVENT = 'change';
  var ActionTypes = BlogConstants.ActionTypes;

  return {

    blogs: function() {
      return _blogs;
    },

    getAllBlogs: function() {
      $.ajax({
        url: "/blogs",
        success: function(allBlogs) {
          this.blogList = allBlogs;
          $(this).trigger('change');
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

    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.CREATE_BLOG:
          this.postBlog(blogData);
        break;
        case ActionTypes.DELETE_BLOG:
          this.deleteBlog(blogId);
        break;
      }
    }

  }()
);


}