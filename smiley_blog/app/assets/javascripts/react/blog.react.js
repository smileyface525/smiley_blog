/** @jsx React.DOM */

var Blog = React.createClass({displayName: 'Blog',

  render: function() {
    var blog = this.props.blog
    return (
      React.DOM.li(null, React.DOM.a({href: "#", 'data-blog-id': blog.id, onClick: this.showDetail, className: "mid-gray"}, blog.title), blog.updated_at)
    )
  },

  showDetail: function(event) {
    event.preventDefault();
    $(Blog).trigger('showDetail', this.props.blog);
  }
})