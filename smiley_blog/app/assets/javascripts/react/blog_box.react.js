/** @jsx React.DOM */
//= require stores/tag_store
//= require react/navbar.react

var App = React.createClass({displayName: 'App',
  getInitialState: function() {
    return ({
      tags: TagStore.tags()
    })
  },

  componentDidMount: function() {
    TagStore.addChangeEvent(function(){
      this.setState({tags: TagStore.tags()})
    }.bind(this))
    TagStore.getAllTags();
  },

  render: function() {
    return (
      React.DOM.div({className: "clearfix mr6 ml6"}, 
        React.DOM.header({className: "center"}, 
          React.DOM.h1(null, "sm", React.DOM.a({href: "#", className: "orange"}, ":)"), "eyblog"), 
          React.DOM.p(null, "hello!"), 
          Navbar({tags: this.state.tags})
        ), 
        React.DOM.section({className: "center mt3 mb3"}, 
          React.DOM.h2({className: "regular orange"}, "All"), 
          React.DOM.ul({className: "list-reset"}, 
            React.DOM.li(null, "Blog1"), 
            React.DOM.li(null, "Blog2"), 
            React.DOM.li(null, "Blog3"), 
            React.DOM.li(null, "Blog4"), 
            React.DOM.li(null, "Blog5"), 
            React.DOM.li(null, "Blog6")
          )
        ), 
        React.DOM.footer({className: "center bor-dot-top light-gray"}, 
          React.DOM.p({className: "m0 italic"}, "by eiko seino"), 
          React.DOM.p(null, React.DOM.a({href: "", className: "light-gray italic"}, "login"))
        )
      )
    )
  }

})