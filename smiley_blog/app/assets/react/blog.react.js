/** @jsx React.DOM */

var Blog = React.createClass({

  render: function() {
    var blog = this.props.blog
    return (
      <li><a href="#" data-blog-id={blog.id} onClick={this.showDetail} className="mid-gray">{blog.title}</a>{blog.updated_at}</li>
    )
  },

  showDetail: function(event) {
    event.preventDefault();
    $(Blog).trigger('showDetail', this.props.blog);
  }
})