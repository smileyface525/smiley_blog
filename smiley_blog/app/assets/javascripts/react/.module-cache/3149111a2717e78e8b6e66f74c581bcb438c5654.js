/** @jsx React.DOM */

var TagInput = React.createClass({displayName: 'TagInput',

  render: function() {
    var value = this.props.tagValue;
    var name = "newTag[tag" + this.props.position + "]";

    return(
      React.DOM.div({className: "block half-width mx-auto"}, 
        React.DOM.input({type: "text", 'data-tag-type': "newTag", name: name, placeholder: "new tag", value: value}), React.DOM.a({className: "mid-gray bold", onClick: this.props.removeTagInput}, " x")
      )
    )
  }

})