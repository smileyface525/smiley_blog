//= require dispatcher

var TagDispatcher = $.extend(new Dispatcher(), {

  handleViewAction: function(action) {
    var payload = {
      sourece: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  },

  handleServerAvtion: function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

})