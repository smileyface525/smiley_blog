/** @jsx React.DOM */
//= require stores/tag_store
//= require stores/blog_store
//= require stores/session_store
//= require react/header.react
//= require react/navbar.react
//= require react/login_form.react
//= require react/blogs.react
//= require react/blog_detail.react
//= require react/blog_form.react
//= require react/footer.react

var App = React.createClass({

  getInitialState: function() {
    return ({
      tags: TagStore.allTags(),
      currentTag: TagStore.currentTag(),
      blogs: BlogStore.blogs(),
      currentBlog: BlogStore.currentBlog(),
      currentPage: BlogStore.pageToShow(),
      currentUesr: SessionStore.currentUser()
    })
  },

  componentDidMount: function() {
    TagStore.addTagsChangeEvent(function() {
      this.setState({tags: TagStore.allTags()});
    }.bind(this));
    TagStore.addTagChangeEvent(function() {
      this.setState({currentTag: TagStore.currentTag()});
    }.bind(this));
    BlogStore.addChangeEvent(function() {
      this.setState({ blogs: BlogStore.blogs(), currentPage: BlogStore.pageToShow() });
    }.bind(this));
    BlogStore.addShowEvent(function() {
      this.setState({ currentBlog: BlogStore.currentBlog(), currentPage: BlogStore.pageToShow() });
    }.bind(this));
    SessionStore.addShowEvent(function() {
      this.setState({currentPage: SessionStore.pageToShow() });
    }.bind(this)),
    SessionStore.addChangeEvent(function() {
      this.setState({currentPage: SessionStore.pageToShow(), currentUesr: SessionStore.currentUser()})
    }.bind(this))
    TagStore.getAllTags();
    BlogStore.getBlogs(TagStore.currentTag());
    SessionStore.getCurrentUser();
  },

  render: function() {
    return (
      <div className="clearfix mr6 ml6">
        <Header currentUser={this.state.currentUesr} />
        <Navbar currentTag={this.state.currentTag} tags={this.state.tags} />
        { this.showCurrentPage() }
        <Footer currentUser={this.state.currentUesr} changeAppState={this.changeAppState} />
      </div>
    )
  },

  showCurrentPage: function() {
    var currentPage = this.state.currentPage;
    switch (currentPage) {
      case "blogDetail":
        return <BlogDetail currentUser={this.state.currentUesr} blog={this.state.currentBlog} />;
      break;
      case "loginForm":
        return <LoginForm />
      break;
      case "blogForm":
      return <BlogForm blog={BlogStore.blogToEdit()} tags={TagStore.tags()} />;
      break;
      default:
        return <Blogs currentTag={this.state.currentTag} blogs={this.state.blogs} />;
      break;
    }
  },

  changeAppState: function(state) {
    this.setState(state);
  }

})