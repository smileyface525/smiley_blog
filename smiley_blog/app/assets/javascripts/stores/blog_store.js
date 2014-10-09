//= require constants/blog_constants
//= require constants/tag_constants
//= require dispatchers/blog_dispatcher
//= require dispatchers/tag_dispatcher
//= require stores/tag_store
//= require actions/tag_actions

var BlogStore = (function() {

  var _blogs = [];
  var _current_blog = null;
  var _blogToEdit = null;
  var _pageToShow = "blogList";
  var CHANGE_EVENT = 'change';
  var SHOW_EVENT = 'show';
  var BlogActionTypes = BlogConstants.ActionTypes;
  var TagActionTypes = TagConstants.ActionTypes;

  var setPageToShow = function(newPage) {
    _pageToShow = newPage;
  };
  var addBlogToList = function(newBlog) {
    _blogs.unshift(newBlog);
  };
  var updateBlogs = function(blogs) {
    _blogs = blogs;
  };
  var deleteBlogFromList = function(deletedBlog) {
    var index = _blogs.length - 1;
    _blogs.forEach(function(blog) {
      if(blog.id === deletedBlog.id) {
        _blogs.splice(index, 1);
        index--;
      }
    })
  };

  return {

    blogs: function() {
      return _blogs;
    },

    currentBlog: function() {
      return _current_blog;
    },

    pageToShow: function() {
      return _pageToShow;
    },

    blogToEdit: function() {
      return _blogToEdit;
    },

    setCurrentBlog: function(blog) {
      _current_blog = blog;
      _pageToShow = "blogDetail";
      this.triggerShow();
    },

    unsetCurrentBlog: function() {
      _current_blog = null;
      _pageToShow = "blogList";
      this.triggerShow();
    },

    showForm: function(blog) {
      _blogToEdit = blog;
      setPageToShow("blogForm");
      if (blog !== null) {
        TagStore.addTagsReceivedEvent(function(event, tags) {
          _blogToEdit.tags = tags.map(function(tag){
            return tag.name;
          })
          this.triggerShow();
        }.bind(this));
        TagStore.getTagsForBlog(blog.id);
      }
      else {
        this.triggerShow();
      }
    },

    getBlogs: function(tag) {
      $.ajax({
        url: "/blogs",
        data: {tag: tag},
        success: function(allBlogs) {
          _blogs = allBlogs;
          setPageToShow("blogList");
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
      .done(function(newBlog) {
        if(newBlog.newTags.length > 0) {
          TagStore.addTags(newBlog.newTags);
        }
        addBlogToList(newBlog.blog);
        setPageToShow("blogList");
        TagStore.getAllTags();
        this.triggerChange();
      }.bind(this))
    },

    updateBlog: function(blog) {
      var url = "/blogs/" + blog.id;
      $.ajax({
        url: url,
        type: "PUT",
        data: blog.inputs
      })
      .done(function(allBlogs) {
        updateBlogs(allBlogs);
        setPageToShow("blogList");
        TagStore.getAllTags();
        this.triggerChange();
      }.bind(this))
      .fail(function(a, b, c) {
        debugger
      })
    },

    deleteBlog: function(blogId) {
      var url = "/blogs/" + blogId
      $.ajax({
        url: url,
        type: "DELETE"
      })
      .done(function(deletedBlog) {
        deleteBlogFromList(deletedBlog);
        setPageToShow("blogList");
        TagStore.getAllTags();
        _blogs.length === 0 ? TagActions.showBlogs(TagStore.defaultTag()) : this.triggerChange();
      }.bind(this))
    },

    triggerChange: function() {
      $(this).trigger(CHANGE_EVENT)
    },

    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },

    triggerShow: function(pageToShow) {
      $(this).trigger(SHOW_EVENT, pageToShow);
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
        case BlogActionTypes.SHOW_FORM:
          this.showForm(action.data);
        break;
        case BlogActionTypes.CREATE_BLOG:
          this.postBlog(action.data);
        break;
        case BlogActionTypes.UPDATE_BLOG:
          this.updateBlog(action.data);
        break;
        case BlogActionTypes.DELETE_BLOG:
          this.deleteBlog(action.data);
        break;
        case TagActionTypes.SHOW_BLOGS:
          this.unsetCurrentBlog();
          this.getBlogs(action.data);
        break;
      }
    }
  }

}());

BlogDispatcher.register(BlogStore.payload.bind(BlogStore));
TagDispatcher.register(BlogStore.payload.bind(BlogStore));
