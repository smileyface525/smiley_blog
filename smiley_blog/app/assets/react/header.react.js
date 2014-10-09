/** @jsx React.DOM */
//= require actions/tag_actions

var Header = React.createClass({

  render: function() {
      var user = this.props.currentUser;
      var greeting = user === null ? null : ", " + user.email;

    return (
      <header className="center">
        <h1>sm<a href="#" className="orange" onClick={this.showDefaultPage} >:)</a>eyblog</h1>
        <p>hello{greeting}!</p>
      </header>
    )
  },

  showDefaultPage: function(event) {
    event.preventDefault();
    TagActions.showBlogs(TagStore.defaultTag());
  }

})