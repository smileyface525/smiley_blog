/** @jsx React.DOM */

var BlogDetail = React.createClass({displayName: 'BlogDetail',

  render: function() {
    var blog = this.props.blog;
    var user = this.props.currentUser;

    return (
      React.DOM.section({className: "center"}, 
        React.DOM.h2({className: "regular orange"}, blog.title), 
        React.DOM.h5({className: "italic regular light-gray"}, "09-28-2014"), 
        React.DOM.p(null, blog.content), 
         user ? this.option() : null
      )
    )
  },

  option: function() {
    return (
      React.DOM.ul(null, 
        React.DOM.li({className: "inline mr1 bold"}, React.DOM.a({href: "#", onClick: this.deleteBlog, className: "mid-gray"}, "delete")), 
        React.DOM.li({className: "inline mr1 bold"}, React.DOM.a({href: "#", onClick: this.editBlog, className: "mid-gray"}, "edit"))
      )
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogStore.deleteBlog(this.props.blog.id);
  },

  editBlog: function(event) {
    event.preventDefault();
    $(BlogDetail).trigger("editBlog", this.props.blogDetail);
  }
})