/** @jsx React.DOM */
//= require stores/user_store

var Navbar = React.createClass({
  render: function() {
    return (
      <nav>
        <ul>
          <li><a href="#" onClick={this.createBlog}>create</a></li>
          <li><a href="#" onClick={this.logOut}>logout</a></li>
        </ul>
      </nav>
    )
  },

  createBlog: function(event) {
    event.preventDefault();
    $(Navbar).trigger("createBlog")
  },

  logOut: function(event) {
    event.preventDefault();
    UserStore.logOutUser();
  }

})