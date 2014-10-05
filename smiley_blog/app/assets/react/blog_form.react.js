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
          <p className="mid-gray">tags: </p>
          {tags.map(function(tag) {
            var name = "tag[" + tag + "]";
            return <label className="mid-gray"><input name={name} type="checkbox"  value={tag} />{tag}</label>;
          })}
          <a href="#" id="addTag" className="mx1 light-gray italic" onClick={this.addTagInput}>add</a>
          { this.state.tagInputs }
          <input type="text"  name="blog[title]" placeholder="title"  value={blog ? blog.title : null} className="block mx-auto half-width" />
          <textarea  name="blog[content]" className="block mx-auto half-width y15 h5">{blog ? blog.content : null}</textarea>
          <input type="submit" value={blog ? "update blog" : "create blog"} className="button-gray mx-auto"/>
        </form>
      </section>
    )
  },

  addTagInput: function(event) {
    event.preventDefault();
    var position = this.state.tagInputs.length;
    this.state.tagInputs.push(<TagInput tagValue={null} position={position} removeTagInput={this.removeTagInput} />);
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
      this.state.tagInputs.push(<TagInput tagValue={val} position={position} removeTagInput={this.removeTagInput} />)
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