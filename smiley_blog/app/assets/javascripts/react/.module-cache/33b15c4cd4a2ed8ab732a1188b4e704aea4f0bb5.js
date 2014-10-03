/** @jsx React.DOM */
//= require stores/tag_store
//= require react/navbar.react
//= require stores/blog_store
//= require react/blogs.react
//= require react/blog_detail.react

var App = React.createClass({displayName: 'App',

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
      debugger
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
      React.DOM.div({className: "clearfix mr6 ml6"}, 
        React.DOM.header({className: "center"}, 
          React.DOM.h1(null, "sm", React.DOM.a({href: "#", className: "orange"}, ":)"), "eyblog"), 
          React.DOM.p(null, "hello!"), 
          Navbar({tags: this.state.tags})
        ), 
         this.state.currentBlog === null ?
          Blogs({currentTag: this.state.currentTag, blogs: this.state.blogs}) :
          BlogDetail({blog: this.state.currentBlog}), 
        
        React.DOM.footer({className: "center bor-dot-top light-gray"}, 
          React.DOM.p({className: "m0 italic"}, "by eiko seino"), 
          React.DOM.p(null, React.DOM.a({href: "", className: "light-gray italic"}, "login"))
        )
      )
    )
  }

})