/** @jsx React.DOM */
//= require react/tag_input.react

var BlogForm = React.createClass({displayName: 'BlogForm',

  getInitialState: function() {
    return ({
      tagInputs: [],
      errorMsg: null
    })
  },

  inputNames: ['title', 'content'],

  render: function() {
    var blog = this.props.blog === null ? false : this.props.blog;
    var allTags = this.props.tags;
    var tags = blog ? blog.tags : [];

    return (
      React.DOM.section({className: "center mt3 mb3"}, 
        React.DOM.h2({className: "regular orange"},  blog ? "Update" : "New"), 
        React.DOM.p(null, this.state.errorMsg), 
        React.DOM.form({action: "#", onSubmit: this.handleSubmit}, 
          React.DOM.p({className: "mid-gray"}, "tags: "), 
          allTags.map(function(tag) {
            var name = "tag[" + tag + "]";
            var checked = $.inArray(tag, tags) === -1 ? null : "checked";
    debugger
            return React.DOM.label({className: "mid-gray"}, 
                    React.DOM.input({
                      name: name, 
                      type: "checkbox", 
                      value: tag, 
                      null: true}), tag);
          }), 
          React.DOM.a({href: "#", id: "addTag", className: "mx1 light-gray italic", onClick: this.addTagInput}, "add"), 
           this.state.tagInputs, 
          React.DOM.input({type: "text", name: "blog[title]", placeholder: "title", value: blog ? blog.title : null, className: "block mx-auto half-width"}), 
          React.DOM.textarea({name: "blog[content]", className: "block mx-auto half-width y15 h5"}, blog ? blog.content : null), 
          React.DOM.input({type: "submit", value: blog ? "update blog" : "create blog", className: "button-gray mx-auto"})
        )
      )
    )
  },

  addTagInput: function(event) {
    event.preventDefault();
    var position = this.state.tagInputs.length;
    this.state.tagInputs.push(TagInput({tagValue: null, position: position, removeTagInput: this.removeTagInput}));
    this.forceUpdate();
  },

  removeTagInput: function(event) {
    event.preventDefault();
    var value = event.target.previousElementSibling.value;
    var tagValues = [];
    $('input[data-tag-type="newTag"]').each(function() { if(value !== this.value) tagValues.push( this.value.trim()) });
      this.updateTagInputs(tagValues);
  },

  updateTagInputs: function(tagValues) {
    var position = 0;
    this.state.tagInputs = [];
    tagValues.forEach(function(val) {
      this.state.tagInputs.push(TagInput({tagValue: val, position: position, removeTagInput: this.removeTagInput}))
      position++
    }.bind(this))
    this.forceUpdate();
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var blogInputs = $(event.target).serialize();
    BlogActions.create(blogInputs);
  }

})