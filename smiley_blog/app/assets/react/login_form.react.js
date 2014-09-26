/** @jsx React.DOM */
//= require stores/user_store

var LoginForm = React.createClass({
  render: function() {
    return (
      <div>
        <p>{ this.props.loginFailed ? "Please try again" : ' ' }</p>
        <form action="admin/sessions" onSubmit={this.loginUser} >
          <label>email: </label>
          <input ref="email" type="email" placeholder="email" className="input" />
          <label>password: </label>
          <input ref="password" type="password" placeholder="password"  />
          <input type="submit" value="Login" className="button-gray"/>
        </form>
      </div>
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