/** @jsx React.DOM */

var DeleteBlog = React.createClass({displayName: 'DeleteBlog',

  render: function() {
    return (
      React.DOM.li({className: "inline mr1 bold"}, 
        React.DOM.a({href: "#", onClick: this.deleteBlog, className: "mid-gray"}, "delete")
      )
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogActions.destroy(this.props.blog.id);
  }

})