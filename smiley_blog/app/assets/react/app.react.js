/** @jsx React.DOM */
//= require stores/tag_store
//= require react/navbar.react
//= require stores/blog_store
//= require react/blogs.react
//= require react/blog_detail.react

var App = React.createClass({

  getInitialState: function() {
    return ({
      tags: TagStore.tags(),
      currentTag: TagStore.currentTag(),
      blogs: BlogStore.blogs(),
      currentBlog: BlogStore.currentBlog()
    })
  },

  componentDidMount: function() {
    TagStore.addTagsChangeEvent(function() {
      this.setState({tags: TagStore.tags()});
    }.bind(this));
    TagStore.addTagChangeEvent(function() {
      this.setState({currentTag: TagStore.currentTag()});
    }.bind(this));
    BlogStore.addChangeEvent(function() {
      this.setState({blogs: BlogStore.blogs()});
    }.bind(this));
    BlogStore.addShowEvent(function() {
      this.setState({currentBlog: BlogStore.currentBlog()});
    }.bind(this));
    TagStore.getAllTags();
    BlogStore.getBlogs(TagStore.currentTag());
  },

  render: function() {
    return (
      <div className="clearfix mr6 ml6">
        <header className="center">
          <h1>sm<a href="#" className="orange">:)</a>eyblog</h1>
          <p>hello!</p>
          <Navbar currentTag={this.state.currentTag} tags={this.state.tags} />
        </header>
        { this.state.currentBlog === null ?
          <Blogs currentTag={this.state.currentTag} blogs={this.state.blogs} /> :
          <BlogDetail blog={this.state.currentBlog} />
        }
        <footer className="center bor-dot-top light-gray">
          <p className="m0 italic">by eiko seino</p>
          <p><a href="" className="light-gray italic">login</a></p>
        </footer>
      </div>
    )
  }

})