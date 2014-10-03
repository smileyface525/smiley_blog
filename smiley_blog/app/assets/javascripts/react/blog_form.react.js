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
    var blog = this.props.blogToBeEdited === null ? false : this.props.blogToBeEdited;
    var tags = this.props.tags;
    return (
      React.DOM.section({className: "center mt3 mb3"}, 
        React.DOM.h2({className: "regular orange"},  blog ? "Update" : "New"), 
        React.DOM.p(null, this.state.errorMsg), 
        React.DOM.form({action: "#", onSubmit: this.handleSubmit}, 
          React.DOM.p(null, "tags: "), 
          tags.map(function(tag) {
            return React.DOM.label(null, React.DOM.input({type: "checkbox", ref: "tag", value: tag}), tag);
          }), 
          React.DOM.a({href: "#", id: "addTag", className: "mx1 light-gray italic", onClick: this.addTagInput}, "add"), 
           this.state.tagInputs, 
          React.DOM.input({type: "text", ref: "title", placeholder: "title", value: blog ? blog.title : null, className: "block mx-auto half-width"}), 
          React.DOM.textarea({ref: "content", className: "block mx-auto half-width y15 h5"}, blog ? blog.content : null), 
          React.DOM.input({type: "submit", value: blog ? "update blog" : "create blog", className: "button-gray mx-auto"})
        )
      )
    )
  },

  addTagInput: function(event) {
    event.preventDefault();
    var newTagInputs = this.state.tagInputs;
    newTagInputs.push(TagInput(null));
    this.setState({tagInputs: newTagInputs});
  },

  handleSubmit: function(event) {
    event.preventDefault();
    var title = this.refs.title.getDOMNode().value.trim();
    var content = this.refs.content.getDOMNode().value.trim();
    var blogData = { blog: { title: title, content: content } }
    BlogStore.postBlog(event, blogData);
    this.refs.title.getDOMNode().value = ''
    this.refs.content.getDOMNode().value = ''
  }

})