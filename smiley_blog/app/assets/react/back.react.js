/** @jsx React.DOM */

var Back = React.createClass({

  render: function() {

    return (
      <li className="inline mr1 bold">
        <a href="#" onClick={this.backToList} className="mid-gray" >back</a>
      </li>
    )
  },

  backToList: function(event) {
    event.preventDefault();
    TagActions.showBlogs(TagStore.currentTag());
  }

})