/** @jsx React.DOM */
//= require actions/blog_actions

var Blog = React.createClass({displayName: 'Blog',

  render: function() {
    var blog = this.props.blog
    return (
      React.DOM.li(null, React.DOM.a({ref: "#", key: blog.id, ref: "title", onClick: this.handleClick}, blog.title))
    )
  },
  handleClick: function(event) {
    event.preventDefault();
    BlogActions.showDetail(this.props.blog);
  }

})