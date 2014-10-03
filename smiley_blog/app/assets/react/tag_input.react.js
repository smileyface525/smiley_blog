/** @jsx React.DOM */

var TagInput = React.createClass({

  render: function() {
    return(
      <input type="text" ref="tag" placeholder="new tag" className="block mx-auto half-width" />
    )
  }

})