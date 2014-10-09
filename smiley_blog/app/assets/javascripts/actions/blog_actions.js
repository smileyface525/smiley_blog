//= require dispatchers/blog_dispatcher
//= require constants/blog_constants

var BlogActions = {

  showDetail: function(blog) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.SHOW_DETAIL,
      data: blog
    })
  },

  showForm: function(blog) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.SHOW_FORM,
      data: blog
    })
  },

  create: function(blog) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.CREATE_BLOG,
      data: blog
    })
  },

  update: function(blog) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.UPDATE_BLOG,
      data: blog
    })
  },

  destroy: function(blogID) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.DELETE_BLOG,
      data: blogID
    })
  }

}