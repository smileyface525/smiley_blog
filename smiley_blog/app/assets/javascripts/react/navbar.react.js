/** @jsx React.DOM */
//= require stores/tag_store
//=require actions/tag_actions

var Navbar = React.createClass({displayName: 'Navbar',

  componentDidMount: function() {
    $('nav a').eq(0).addClass('orange');
  },

  render: function() {
    debugger
    return (
      React.DOM.nav({className: "bor-dot-top bor-dot-bottom"}, 
        React.DOM.ul({className: "m1"}, 
          TagStore.permanentTags().map(function(tag) {
            return React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic", 'data-tag-name': tag, onClick: this.handleClick}, tag))
          }.bind(this)), 
          this.props.tags.map(function(tag) {
            return React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic", key: tag.id, 'data-tag-name': tag.name, onClick: this.handleClick}, tag.name))
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