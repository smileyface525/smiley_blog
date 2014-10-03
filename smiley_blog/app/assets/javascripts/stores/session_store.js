//= require dispatchers/session_dispatcher
//= require constants/session_constants

var SessionStore = (function() {

  var _current_user = null;
  var _pageToShow = null;
  var SessionActionTypes = SessionConstants.ActionTypes;
  var SHOW_EVENT = 'show';
  var CHANGE_EVENT = 'change';
  var ERROR_EVENT = "error";

  return {

    getCurrentUser: function() {
      $.ajax({
        url: '/admin/sessions'
      })
      .done(this.setCurrentUser.bind(this))
    },

    currentUser: function() {
      return _current_user;
    },

    pageToShow: function() {
      return _pageToShow;
    },

    setCurrentUser: function(user) {
      _current_user = user;
      _pageToShow = "blogList";
      this.triggerChange();
    },

    triggerShow: function() {
      $(this).trigger(SHOW_EVENT);
    },

    triggerChange: function() {
      $(this).trigger(CHANGE_EVENT);
    },

    triggerError: function(error) {
      var errorMsg = error.responseJSON.msg;
      $(this).trigger(ERROR_EVENT, errorMsg);
    },

    addShowEvent: function(callback) {
      $(this).on(SHOW_EVENT, callback);
    },

    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },

    addErrorEvent: function(callback) {
      $(this).on(ERROR_EVENT, callback);
    },

    showForm: function() {
      _pageToShow = "loginForm";
      this.triggerShow();
    },

    login: function(loginData) {
      $.ajax({
        url: '/admin/sessions',
        type: 'POST',
        data: loginData
      })
      .done(this.setCurrentUser.bind(this))
      .fail(this.triggerError.bind(this))
    },

    logout: function(user) {
      var url = '/admin/sessions/' + user.id;
      $.ajax({
        url: url,
        type: 'DELETE'
      })
      .done(this.setCurrentUser.bind(this))
    },

    payload: function(payload) {
      var action = payload.action;

      switch(action.type) {
        case SessionActionTypes.SHOW_FORM:
          this.showForm();
        break;
        case SessionActionTypes.LOGIN:
          this.login(action.data);
        break;
        case SessionActionTypes.LOGOUT:
          this.logout(action.data);
        break;
      }
    }

  }
}());

SessionDispatcher.register(SessionStore.payload.bind(SessionStore));

