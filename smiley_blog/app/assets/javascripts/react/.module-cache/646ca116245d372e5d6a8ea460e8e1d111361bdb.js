/** @jsx React.DOM */

var Header = React.createClass({displayName: 'Header',

  render: function() {
      var user = this.props.currentUser;
      var greeting = user === null ? null : ", " + user.email;

    return (
      React.DOM.header({className: "center"}, 
        React.DOM.h1(null, "sm", React.DOM.a({href: "#", className: "orange"}, ":)"), "eyblog"), 
        React.DOM.p(null, "hello", greeting, "!")
      )
    )
  }
})