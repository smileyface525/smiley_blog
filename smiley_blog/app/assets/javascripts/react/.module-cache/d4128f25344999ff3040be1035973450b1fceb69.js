/** @jsx React.DOM */
//= require stores/blog_store
//= require stores/user_store
//= require react/blogs.react
//= require react/blog_detail.react
//= require react/login_form.react
//= require react/navbar.react
//= require react/blog_form.react

var BlogBox = React.createClass({displayName: 'BlogBox',
  getInitialState: function() {
    UserStore.getCurrentUser();
    return ( {
      blogs: BlogStore.blogs,
    } )
  },

  componentDidMount: function() {
    BlogStore.addChangeEvent(function(){
      this.setState({blogs: BlogStore.blogs()})
    })
  },

  render: function() {
    return (
      React.DOM.div({className: "clearfix mr6 ml6"}, 
        React.DOM.header({className: "center"}, 
          React.DOM.h1(null, "sm", React.DOM.a({href: "#", className: "orange"}, ":)"), "eyblog"), 
          React.DOM.p(null, "hello!"), 
          React.DOM.nav({className: "bor-dot-top bor-dot-bottom"}, 
            React.DOM.ul({className: "m1"}, 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic orange"}, "All")), 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic"}, "Recent")), 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic"}, "Rails")), 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic"}, "React")), 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic"}, "Angular")), 
              React.DOM.li({className: "inline mr1"}, React.DOM.a({href: "#", className: "mid-gray italic"}, "Backbone"))
            )
          )
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