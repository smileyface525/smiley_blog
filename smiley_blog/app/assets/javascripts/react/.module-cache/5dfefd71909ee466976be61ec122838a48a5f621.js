/** @jsx React.DOM */
//= require actions/tag_actions

var Header = React.createClass({displayName: 'Header',

  render: function() {
      var user = this.props.currentUser;
      var greeting = user === null ? null : ", " + user.email;

    return (
      React.DOM.header({className: "center"}, 
        React.DOM.h1(null, "sm", React.DOM.a({href: "#", className: "orange", onClick: this.showDefaultPage}, ":)"), "eyblog"), 
        React.DOM.p(null, "hello", greeting, "!")
      )
    )
  },

  showDefaultPage: function(event) {
    event.preventDefault();
    TagActions.showBlogs(TagStore.defaultTag());
  }

})