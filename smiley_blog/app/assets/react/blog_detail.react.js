/** @jsx React.DOM */

var BlogDetail = React.createClass({

  render: function() {
    var blog = this.props.blog;
    return (
      <section className="center">
        <h2 className="regular orange">{blog.title}</h2>
        <h5 className="italic regular light-gray">09-28-2014</h5>
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