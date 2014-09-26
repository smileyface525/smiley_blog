/** @jsx React.DOM */
//= require stores/user_store
//= require react/blogs.react
//= require react/blog_detail.react
//= require react/login_form.react
//= require stores/blog_store
//= require react/navbar.react
//= require react/blog_form.react

var BlogBox = React.createClass({displayName: 'BlogBox',
  getInitialState: function() {
    UserStore.getCurrentUser();
    return ( {
      blogs: [],
      showDetail: false,
      loggedIn: UserStore.getLoginStatus(),
      loginFailed: false,
      showCreateForm: false,
      blogToBeEdited: null
    } )
  },

  componentDidMount: function() {
    BlogStore.getAllBlogs();
    this.bindListeners();
  },

  render: function() {

    if (this.state.showDetail === true && this.state.blogDetail !== undefined) {
      return (
        React.DOM.div(null, 
          this.header(), 
          BlogDetail({blogDetail: this.state.blogDetail, loggedIn: this.state.loggedIn}), 
          React.DOM.a({href: "#", onClick: this.showList}, "Back to list")
        )
      )
    }

    else if (this.state.showCreateForm === true) {
      return (
        React.DOM.div(null, 
          this.header(), 
          BlogForm({blogToBeEdited: this.state.blogToBeEdited})
        )
      )
    }

    else {
      return (
        React.DOM.div(null, 
          this.header(), 
          Blogs({blogs: this.state.blogs, showDetail: this.state.showDetail})
        )
      )
    }
  },

  bindListeners: function() {
    $(BlogStore).on('change', function() {
      this.setState({blogs: BlogStore.blogList, showDetail: false, showCreateForm: false, blogToBeEdited: null  });
    }.bind(this))
    $(Blog).on('showDetail', function(event, blogDetail) {
      console.log('here');
      this.setState({showDetail: true, blogDetail: blogDetail});
    }.bind(this))
    $(LoginForm).on('notFound', function() {
      this.setState( {loginFailed: true});
    }.bind(this))
    $(UserStore).on('userLoggedIn', function() {
      this.setState({loggedIn: true, loginFailed: false});
    }.bind(this))
    $(UserStore).on('userLoggedOut', function() {
      document.location.reload(true);
    }.bind(this))
    $(Navbar).on('createBlog', function() {
      this.setState({showCreateForm: true});
    }.bind(this))
    $(BlogDetail).on("editBlog", function(event, blog) {
      this.setState({showDetail: false, showCreateForm: true, blogToBeEdited: blog})
    }.bind(this))
  },

  showList: function(event) {
    event.preventDefault();
    this.setState({showDetail: false});
  },

  header: function() {
    return (
      React.DOM.header({className: "absolute m0 center bg-orange"}, 
         this.state.loggedIn ? Navbar(null) : LoginForm({loginFailed: this.state.loginFailed}), 
        React.DOM.h1({className: "bold"}, "sm:)eyblog")
      )
    )
  }

})