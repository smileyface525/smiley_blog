/** @jsx React.DOM */
//= require actions/blog_actions

var Blog = React.createClass({

  render: function() {
    var blog = this.props.blog
    return (
      <li><a ref="#" key={blog.id} ref="title" onClick={this.handleClick}>{blog.title}</a></li>
    )
  },
  handleClick: function(event) {
    event.preventDefault();
    BlogActions.showDetail(this.props.blog);
  }

})