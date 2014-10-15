/** @jsx React.DOM */

var TagInput = React.createClass({displayName: 'TagInput',

  render: function() {
    return(
      React.DOM.input({type: "text", ref: "tag", placeholder: "new tag", className: "block mx-auto half-width"})
    )
  }

})