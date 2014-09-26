/** @jsx React.DOM */
//=require stores/blog_store

var BlogForm = React.createClass({

  render: function() {
  var blog = this.props.blogToBeEdited;
  if (blog === null) {
    blog = {};
    blog.title = '';
    blog.content = '';
  }
    return (
      <form action="/blogs" onSubmit={this.submitBlog} >
        <input type="text" ref="title" placeholder="title"  value={blog.title} />
        <textarea ref="content">{blog.content}</textarea>
        <input type="submit" value="create" />
      </form>
    )
  },

  submitBlog: function(event) {
    event.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();
    var blogData = { blog: { title: title, content: content } }
    BlogStore.postBlog(event, blogData);
    this.refs.title.getDOMNode().value = ''
    this.refs.content.getDOMNode().value = ''
  }

})