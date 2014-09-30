//=require dispatcher

var BlogDispatcher = $.extend(new Dispatcher(), {

  handleViewAction: function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  handleServerAction: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  }
});