/** @jsx React.DOM */
//= require stores/user_store

var Navbar = React.createClass({displayName: 'Navbar',
  render: function() {
    return (
      React.DOM.nav(null, 
        React.DOM.ul(null, 
          React.DOM.li(null, React.DOM.a({href: "#", onClick: this.createBlog}, "create")), 
          React.DOM.li(null, React.DOM.a({href: "#", onClick: this.logOut}, "logout"))
        )
      )
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