/** @jsx React.DOM */

var DeleteBlog = React.createClass({

  render: function() {
    return (
      <li className="inline mr1 bold">
        <a href="#" onClick={this.deleteBlog} className="mid-gray" >delete</a>
      </li>
    )
  },

  deleteBlog: function(event) {
    event.preventDefault();
    BlogActions.destroy(this.props.blog.id);
  }

})