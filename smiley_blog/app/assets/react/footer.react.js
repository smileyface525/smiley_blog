/** @jsx React.DOM */
//= require actions/session_actions
//= require actions/blog_actions


var Footer = React.createClass({

  render: function() {

    return (
      <footer className="center bor-dot-top light-gray">
        { this.showNav() }
        <p className="m0 italic">by eiko seino</p>
      </footer>
    )
  },

  showNav: function() {
    var user = this.props.currentUser === null ? false : this.props.currentUser;

    return user ?
      <p>
        <a href="#" className="mx1 light-gray italic" onClick={this.handleLogout}>logout</a>
        <a href="#" className="mx1 light-gray italic" onClick={this.handleCreate}>create</a>
      </p>
    :
      <p>
        <a href="#" className="light-gray italic" onClick={this.handleLogin}>login</a>
      </p>

  },

  handleLogin: function(event) {
    event.preventDefault();
    SessionActions.showForm();
  },

  handleLogout: function(event) {
    event.preventDefault();
    SessionActions.logout(this.props.currentUser);
  },

  handleCreate: function(event) {
    event.preventDefault();
    var blog = null;
    BlogActions.showForm(blog);
  }

})