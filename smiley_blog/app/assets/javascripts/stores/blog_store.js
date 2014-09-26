var BlogStore = {

  getAllBlogs: function() {
    $.ajax({
      url: "/blogs",
      success: function(allBlogs) {
        this.blogList = allBlogs;
        $(this).trigger('change');
      }.bind(this)
    })
  },

  postBlog: function(event, blogData) {
    $.ajax({
      url: event.target.action,
      type: "POST",
      data: blogData
    })
    .done(function(newBlogs) {
      this.blogList = newBlogs;
      $(this).trigger('change');
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
      $(this).trigger('change');
    }.bind(this))
  }

}