//= require constants/tag_constants
//= require dispatchers/tag_dispatcher

var TagStore = (function() {

  var _defaultTags = ["All", "Recent"];
  var _tags = [];
  var _currentTag = _defaultTags[0];
  var TAGS_CHANGE_EVENT = "tagsChanged";
  var TAG_CHANGE_EVENT = "tagChanged";
  var TAG_RECEIVED_EVENT = "tagsReceived";
  var TagActionTypes = TagConstants.ActionTypes;

  var setTags = function(newTags) {
    _tags = newTags.map(function(tag){ return tag.name; });
  };

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

    addTags: function(newTags) {
      newTags.forEach(function(newTag) {
        _tags.push(newTag);
      })
      this.triggerTagsChange();
    },

    defaultTag: function() {
      return _defaultTags[0];
    },

    getAllTags: function() {
      $.ajax({
        url: "/tags"
      })
      .done(function(allTags){
        setTags(allTags);
        this.triggerTagsChange();
      }.bind(this))
    },

    getTagsForBlog: function(blogID) {
      var url = "/blogs/" + blogID + "/tags";
      var allTags = null;
      $.ajax({
        url: url
      })
      .done(this.triggerTagsReceived.bind(this))
    },

    changeToDefault: function() {
      _currentTag = this.defaultTag();
      this.triggerTagChange();
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

    triggerTagsReceived: function(tags) {
      $(this).trigger(TAG_RECEIVED_EVENT, [tags])
    },

    addTagsChangeEvent: function(callback) {
      $(this).on(TAGS_CHANGE_EVENT, callback);
    },

    addTagChangeEvent: function(callback) {
      $(this).on(TAG_CHANGE_EVENT, callback);
    },

    addTagsReceivedEvent: function(callback) {
      $(this).on(TAG_RECEIVED_EVENT, callback);
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