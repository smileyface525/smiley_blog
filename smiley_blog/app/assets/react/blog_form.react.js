/** @jsx React.DOM */
//= require react/tag_input.react

var BlogForm = React.createClass({

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
      <section className="center mt3 mb3">
        <h2 className="regular orange" >{ blog ? "Update" : "New" }</h2>
        <p>{this.state.errorMsg}</p>
        <form action="#" onSubmit={this.handleSubmit} >
          <p>tags: </p>
          {tags.map(function(tag) {
            return <label><input type="checkbox" ref="tag" value={tag} />{tag}</label>;
          })}
          <a href="#" id="addTag" className="mx1 light-gray italic" onClick={this.addTagInput}>add</a>
          { this.state.tagInputs }
          <input type="text" ref="title" placeholder="title"  value={blog ? blog.title : null} className="block mx-auto half-width" />
          <textarea ref="content" className="block mx-auto half-width y15 h5">{blog ? blog.content : null}</textarea>
          <input type="submit" value={blog ? "update blog" : "create blog"} className="button-gray mx-auto"/>
        </form>
      </section>
    )
  },

  addTagInput: function(event) {
    event.preventDefault();
    var newTagInputs = this.state.tagInputs;
    newTagInputs.push(<TagInput />);
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