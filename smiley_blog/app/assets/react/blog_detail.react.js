/** @jsx React.DOM */

var BlogDetail = React.createClass({
  render: function() {
    var blog = this.props.blogDetail;
    return (
      <section>
        <h2>{blog.title}</h2>
        { this.props.loggedIn ? this.option() : null }
        <p>{blog.content}</p>
      </section>
    )
  },

  option: function() {
    return (
      <ul>
        <li><a href="#" onClick={this.deleteBlog} >delete</a></li>
        <li><a href="#" onClick={this.editBlog} >edit</a></li>
      </ul>
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogStore.deleteBlog(this.props.blogDetail.id);
  },

  editBlog: function(event) {
    event.preventDefault();
    $(BlogDetail).trigger("editBlog", this.props.blogDetail);
  }
})