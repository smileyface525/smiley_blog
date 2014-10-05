/** @jsx React.DOM */

var TagInput = React.createClass({

  render: function() {
    var value = this.props.tagValue;
    var name = "newTag[tag" + this.props.position + "]";

    return(
      <div className="block half-width mx-auto">
        <input type="text" data-tag-type="newTag" name={name} placeholder="new tag" value={value} /><a className="mid-gray bold" onClick={this.props.removeTagInput} > x</a>
      </div>
    )
  }

})