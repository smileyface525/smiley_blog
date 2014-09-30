//= require dispatchers/blog_dispatcher
//= require constants/blog_constants

var BlogActions = {
  showDetail: function(blog) {
    BlogDispatcher.handleViewAction({
      type: BlogConstants.ActionTypes.SHOW_DETAIL,
      data: blog
    })
  }
}