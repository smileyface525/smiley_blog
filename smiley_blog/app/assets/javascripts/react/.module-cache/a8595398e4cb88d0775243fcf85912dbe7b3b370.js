/** @jsx React.DOM */
//=require react/blog.react

var Blogs = React.createClass({displayName: 'Blogs',
  render: function() {
    return (
      React.DOM.section({className: "center mt3 mb3"}, 
        React.DOM.h2({className: "regular orange"}, this.props.currentTag), 
        React.DOM.ul({className: "list-reset"}, 
          this.props.blogs.map(function(blog) {
            return Blog({blog: blog})
          })
        )
      )
    )
  }
})