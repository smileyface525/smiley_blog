
var TagActions = {

  showAllBlogs: function(tagName) {
    TagDispatcher.handleViewAction({
      type: TagConstants.ActionTypes.SHOW_ALL_BLOGS,
      data: tagName
    })
  },

  showRecentBlogs: function(tagName) {
    TagDispatcher.handleViewAction({
      type: TagConstants.ActionTypes.SHOW_RECENT_BLOGS,
      data: tagName
    })
  }
}