/** @jsx React.DOM */

var Header = React.createClass({

  render: function() {
      var user = this.props.currentUser;
      var greeting = user === null ? null : ", " + user.email;

    return (
      <header className="center">
        <h1>sm<a href="#" className="orange">:)</a>eyblog</h1>
        <p>hello{greeting}!</p>
      </header>
    )
  }
})