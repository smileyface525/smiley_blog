//= require constants/tag_constants
//= require dispatchers/tag_dispatcher

var TagStore = (function() {
  var _defaultTags = ["All", "Recent"];
  var _tags = [];
  var _currentTag = _defaultTags[0];
  var TAGS_CHANGE_EVENT = "tagsChanged";
  var TAG_CHANGE_EVENT = "tagChanged";
  var TagActionTypes = TagConstants.ActionTypes;

  return {

    allTags: function() {
      return _defaultTags.concat(_tags);
    },

    tags: function() {
      return _tags;
    },

    currentTag: function() {
      return _currentTag;
    },

    getAllTags: function() {
      $.ajax({
        url: "/tags"
      })
      .done(function(allTags){
        allTags.forEach(function(tag){
          _tags.push(tag.name)
        });
        this.triggerTagsChange();
      }.bind(this))
    },

    updateCurrentTag: function(newTag) {
      _currentTag = newTag;
      this.triggerTagChange();
    },

    triggerTagsChange: function() {
      $(this).trigger(TAGS_CHANGE_EVENT);
    },

    triggerTagChange: function() {
      $(this).trigger(TAG_CHANGE_EVENT);
    },

    addTagsChangeEvent: function(callback) {
      $(this).on(TAGS_CHANGE_EVENT, callback);
    },

    addTagChangeEvent: function(callback) {
      $(this).on(TAG_CHANGE_EVENT, callback);
    },

    payload: function(payload) {
      var action = payload.action;

      switch(action.type) {
        case TagActionTypes.SHOW_BLOGS:
          this.updateCurrentTag(action.data);
        break;
      }

    }

  }
}());

TagDispatcher.register(TagStore.payload.bind(TagStore));