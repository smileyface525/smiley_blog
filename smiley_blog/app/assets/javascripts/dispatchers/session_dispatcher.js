//=require dispatcher

var SessionDispatcher = $.extend(new Dispatcher(), {

  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  handleServerAction: function(action) {
    var payload = {
      ource: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

})