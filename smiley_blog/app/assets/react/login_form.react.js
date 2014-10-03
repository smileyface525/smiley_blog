/** @jsx React.DOM */
//= require actions/session_actions

var LoginForm = React.createClass({

  getInitialState: function() {
    return ({
      errorMsg: null
    });
  },

  inputNames: ['email', 'password'],

  componentDidMount: function() {
    SessionStore.addErrorEvent(function(event, errorMsg) {
      this.setState({ errorMsg: errorMsg });
    }.bind(this))
  },

  render: function() {
    return (
      <section className="center mt3 mb3">
        <h2 className="regular orange">Login</h2>
        <p>{this.state.errorMsg}</p>
        <form action="#" onSubmit={this.handleSubmit} className="">
          <input ref="email" type="email" placeholder="email" className="block mx-auto half-width" />
          <input ref="password" type="password" placeholder="password" className="block mx-auto half-width" />
          <input type="submit" value="Login" className="button-gray mx-auto"/>
        </form>
      </section>
    )
  },

  handleSubmit: function(event) {
    event.preventDefault()
    var loginData = this.getInputData(this.inputNames);
    this.clearForm(this.inputNames);
    SessionActions.login(loginData);
  },

  getInputData: function(inputNames) {
    var inputData = { user: {} };
    inputNames.forEach(function(name) {
      inputData.user[name] = this.refs[name].getDOMNode().value.trim();
    }.bind(this));
    return inputData;
  },

  clearForm: function(inputNames) {
    inputNames.forEach(function(name) {
      this.refs[name].getDOMNode().value = '';
    }.bind(this));
  }

})