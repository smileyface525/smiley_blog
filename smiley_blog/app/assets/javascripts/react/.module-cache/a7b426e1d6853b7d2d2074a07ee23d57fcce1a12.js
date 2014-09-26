/** @jsx React.DOM */
//=require react/blog.react

var Blogs = React.createClass({displayName: 'Blogs',
  render: function() {
    var blogs = [];
    this.props.blogs.forEach(function(blog){
      blogs.push( Blog({blog: blog}) )
    });
    return (
      React.DOM.section({className: "relative pytop12"}, 
        React.DOM.ul(null, 
          blogs
        )
      )
    )
  }
})