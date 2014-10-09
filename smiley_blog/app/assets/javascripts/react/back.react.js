/** @jsx React.DOM */

var Back = React.createClass({displayName: 'Back',

  render: function() {

    return (
      React.DOM.li({className: "inline mr1 bold"}, 
        React.DOM.a({href: "#", onClick: this.backToList, className: "mid-gray"}, "back")
      )
    )
  },

  backToList: function(event) {
    event.preventDefault();
    TagActions.showBlogs(TagStore.currentTag());
  }

})