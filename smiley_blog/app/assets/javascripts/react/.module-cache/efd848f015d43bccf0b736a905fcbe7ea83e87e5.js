/** @jsx React.DOM */
//= require stores/tag_store
//=require actions/tag_actions

var Navbar = React.createClass({displayName: 'Navbar',

  componentDidMount: function() {
    $('nav a').eq(0).addClass('orange');
  },

  render: function() {
    return (
      React.DOM.nav({className: "bor-dot-top bor-dot-bottom"}, 
        React.DOM.ul({className: "m1"}, 
          React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic", onClick: this.handleClick}, "hello")), 
          TagStore.permanentTags().map(function(tag) {
            return React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic", 'data-tag-name': tag, onClick: this.handleClick}, tag))
          }), 
          this.props.tags.map(function(tag) {
            return React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic", key: tag.id, 'data-tag-name': tag.name, onClick: this.handleClick}, tag.name))
          })
        )
      )
    )
  },

  handleClick: function(event) {
    debugger
    event.preventDefault();
    switch(event.target.dataset.tagName) {
      case "All":
        TagActions.showAllBlogs();
      break;
    }
  }

})