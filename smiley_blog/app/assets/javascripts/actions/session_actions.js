//= require dispatchers/session_dispatcher
//= require constants/session_constants

var SessionActions = {

  showForm: function() {
    SessionDispatcher.handleViewAction({
      type: SessionConstants.ActionTypes.SHOW_FORM,
      data: null
    })
  },

  login: function(loginData) {
    SessionDispatcher.handleViewAction({
      type: SessionConstants.ActionTypes.LOGIN,
      data: loginData
    })
  },

  logout: function(user) {
    SessionDispatcher.handleViewAction({
      type: SessionConstants.ActionTypes.LOGOUT,
      data: user
    })
  }

}