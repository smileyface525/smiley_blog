/** @jsx React.DOM */

var BlogDetail = React.createClass({

  render: function() {
    var blog = this.props.blog;
    var user = this.props.currentUser;

    return (
      <section className="center">
        <h2 className="regular orange">{blog.title}</h2>
        <h5 className="italic regular light-gray">09-28-2014</h5>
        <p>{blog.content}</p>
        { user ? this.option() : null }
      </section>
    )
  },

  option: function() {
    return (
      <ul>
        <li className="inline mr1 bold"><a href="#" onClick={this.deleteBlog} className="mid-gray" >delete</a></li>
        <li className="inline mr1 bold"><a href="#" onClick={this.editBlog} className="mid-gray" >edit</a></li>
      </ul>
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogStore.deleteBlog(this.props.blog.id);
  },

  editBlog: function(event) {
    event.preventDefault();
    $(BlogDetail).trigger("editBlog", this.props.blogDetail);
  }
})