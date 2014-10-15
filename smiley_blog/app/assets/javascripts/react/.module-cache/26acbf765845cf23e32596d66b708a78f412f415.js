/** @jsx React.DOM */

var EditBlog = React.createClass({displayName: 'EditBlog',

  render: function() {
    var blog = this.props.blog;

    return (
      React.DOM.li({className: "inline mr1 bold"}, 
        React.DOM.a({href: "#", onClick: this.editBlog, className: "mid-gray"}, "edit")
      )
    )
  },

  editBlog: function(event) {
    event.preventDefault();
    BlogActions.showForm(this.props.blog);
  }

})