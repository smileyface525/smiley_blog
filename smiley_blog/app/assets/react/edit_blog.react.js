/** @jsx React.DOM */

var EditBlog = React.createClass({

  render: function() {
    var blog = this.props.blog;

    return (
      <li className="inline mr1 bold">
        <a href="#" onClick={this.editBlog} className="mid-gray" >edit</a>
      </li>
    )
  },

  editBlog: function(event) {
    event.preventDefault();
    BlogActions.showForm(this.props.blog);
  }

})