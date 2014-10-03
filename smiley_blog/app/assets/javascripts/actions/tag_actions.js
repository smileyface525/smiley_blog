
var TagActions = {

  showBlogs: function(tagName) {
    TagDispatcher.handleViewAction({
      type: TagConstants.ActionTypes.SHOW_BLOGS,
      data: tagName
    })
  }
}