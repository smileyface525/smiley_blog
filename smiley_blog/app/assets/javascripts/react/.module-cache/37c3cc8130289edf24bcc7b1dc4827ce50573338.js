/** @jsx React.DOM */
//= require actions/session_actions
//= require actions/blog_actions


var Footer = React.createClass({displayName: 'Footer',

  render: function() {

    return (
      React.DOM.footer({className: "center bor-dot-top light-gray"}, 
         this.showNav(), 
        React.DOM.p({className: "m0 italic"}, "by eiko seino")
      )
    )
  },

  showNav: function() {
    var user = this.props.currentUser === null ? false : this.props.currentUser;

    return user ?
      React.DOM.p(null, 
        React.DOM.a({href: "#", className: "mx1 light-gray italic", onClick: this.handleLogout}, "logout"), 
        React.DOM.a({href: "#", className: "mx1 light-gray italic", onClick: this.handleCreate}, "create")
      )
    :
      React.DOM.p(null, 
        React.DOM.a({href: "#", className: "light-gray italic", onClick: this.handleLogin}, "login")
      )

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