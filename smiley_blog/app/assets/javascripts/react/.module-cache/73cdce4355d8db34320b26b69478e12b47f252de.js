/** @jsx React.DOM */

var BlogDetail = React.createClass({displayName: 'BlogDetail',
  render: function() {
    var blog = this.props.blogDetail;
    return (
      React.DOM.section(null, 
        React.DOM.h2(null, blog.title), 
         this.props.loggedIn ? this.option() : null, 
        React.DOM.p(null, blog.content)
      )
    )
  },

  option: function() {
    return (
      React.DOM.ul(null, 
        React.DOM.li(null, React.DOM.a({href: "#", onClick: this.deleteBlog}, "delete")), 
        React.DOM.li(null, React.DOM.a({href: "#", onClick: this.editBlog}, "edit"))
      )
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogStore.deleteBlog(this.props.blogDetail.id);
  },

  editBlog: function(event) {
    event.preventDefault();
    $(BlogDetail).trigger("editBlog", this.props.blogDetail);
  }
})