/** @jsx React.DOM */
//= require react/back.react
//= require react/delete_blog.react
//= require react/edit_blog.react

var BlogOptions = React.createClass({

  render: function() {
    var blog = this.props.blog;
    var user = this.props.currentUser;

    return (
      <ul>
        <Back />
        {user ? <DeleteBlog blog={blog} /> : null}
        {user ? <EditBlog blog={blog} /> : null}
      </ul>
    )
  }

})