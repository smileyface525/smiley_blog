/** @jsx React.DOM */
//= require actions/session_actions

var LoginForm = React.createClass({displayName: 'LoginForm',

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
      React.DOM.section({className: "center mt3 mb3"}, 
        React.DOM.h2({className: "regular orange"}, "Login"), 
        React.DOM.p(null, this.state.errorMsg), 
        React.DOM.form({action: "#", onSubmit: this.handleSubmit, className: ""}, 
          React.DOM.input({ref: "email", type: "email", placeholder: "email", className: "block mx-auto half-width"}), 
          React.DOM.input({ref: "password", type: "password", placeholder: "password", className: "block mx-auto half-width"}), 
          React.DOM.input({type: "submit", value: "Login", className: "button-gray mx-auto"})
        )
      )
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