var UserStore = (function() {
  var session, email, loginStatus
  return {
    setCurrentUser: function(userData) {
      session = userData.id;
      email = userData.email;
      $(this).trigger('userLoggedIn');
    },

    getCurrentUser: function() {
      $.ajax({
        url: '/admin/sessions',
      })
      .done(function(currentUser){
        if(currentUser === null) {
          loginStatus = false;
        }
        else {
          loginStatus = true;
          this.setCurrentUser(currentUser);
        }
      }.bind(this))
    },

    getLoginStatus: function() {
      return loginStatus;
    },

    logOutUser: function() {
      $.ajax({
        url: "/admin/sessions/"+ session,
        type: "DELETE"
      })
      .done(function() {
        session = '';
        email = '';
        loginStatus = false;
        $(this).trigger('userLoggedOut');
      }.bind(this))
    }
  }
})();