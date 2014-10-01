/** @jsx React.DOM */
//= require stores/tag_store
//=require actions/tag_actions

var Navbar = React.createClass({displayName: 'Navbar',

  componentDidMount: function() {
    $('nav a').eq(0).addClass('orange');
  },

  render: function() {
    var currentTag = this.props.currentTag;
    var withOrange = "mid-gray italic orange";
    var noOrange = "mid-gray italic";

    return (
      React.DOM.nav({className: "bor-dot-top bor-dot-bottom"}, 
        React.DOM.ul({className: "m1"}, 
          TagStore.tags().map(function(tag) {
            return React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className:  tag === currentTag ? withOrange : noOrange, 'data-tag-name': tag, onClick: this.handleClick}, tag))
          }.bind(this))
        )
      )
    )
  },

  handleClick: function(event) {
    event.preventDefault();
    var tagClicked = event.target.dataset.tagName;
    switch(tagClicked) {
      case "All":
        TagActions.showAllBlogs(tagClicked);
      break;
      case "Recent":
        TagActions.showRecentBlogs(tagClicked);
      break;
    }
  }

})