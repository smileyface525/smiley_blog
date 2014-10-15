/** @jsx React.DOM */
//=require react/blog_options.react

var BlogDetail = React.createClass({displayName: 'BlogDetail',

  render: function() {
    var blog = this.props.blog;
    var user = this.props.currentUser;

    return (
      React.DOM.section({className: "center"}, 
        React.DOM.h2({className: "regular orange"}, blog.title), 
        React.DOM.h5({className: "italic regular light-gray"}, "09-28-2014"), 
        React.DOM.p(null, blog.content), 
        BlogOptions({blog: blog, currentUser: user})
      )
    )
  }

})