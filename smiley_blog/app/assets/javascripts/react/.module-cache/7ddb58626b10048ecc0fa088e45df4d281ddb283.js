/** @jsx React.DOM */
//= require stores/user_store

var LoginForm = React.createClass({displayName: 'LoginForm',
  render: function() {
    return (
      React.DOM.div(null, 
        React.DOM.p(null,  this.props.loginFailed ? "Please try again" : ' '), 
        React.DOM.form({action: "admin/sessions", onSubmit: this.loginUser}, 
          React.DOM.label(null, "email: "), 
          React.DOM.input({ref: "email", type: "email", placeholder: "email", className: "input"}), 
          React.DOM.label(null, "password: "), 
          React.DOM.input({ref: "password", type: "password", placeholder: "password"}), 
          React.DOM.input({type: "submit", value: "Login", className: "button-gray"})
        )
      )
    )
  },

  loginUser: function(event) {
    event.preventDefault()
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    var loginData = {user: { email: email, password: password }}
    this.submitLoginForm(event, loginData);
    this.refs.email.getDOMNode().value = '';
    this.refs.password.getDOMNode().value = '';
  },

  submitLoginForm: function(event, loginData) {
    $.ajax({
      url: event.target.action,
      type: "POST",
      data: loginData
    })
    .done(function(userData){
      userData.notFound ? $(LoginForm).trigger('notFound') : UserStore.setCurrentUser(userData)
    })
  }
})