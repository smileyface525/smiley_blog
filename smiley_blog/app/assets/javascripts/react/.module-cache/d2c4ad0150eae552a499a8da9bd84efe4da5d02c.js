/** @jsx React.DOM */

var BlogDetail = React.createClass({displayName: 'BlogDetail',

  render: function() {
    var blog = this.props.blog;
    return (
      React.DOM.section({className: "center"}, 
        React.DOM.h2({className: "regular orange"}, blog.title), 
        React.DOM.h5({className: "italic regular light-gray"}, "09-28-2014"), 
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