/** @jsx React.DOM */
//= require stores/blog_store
//= require stores/user_store
//= require react/blogs.react
//= require react/blog_detail.react
//= require react/login_form.react
//= require react/navbar.react
//= require react/blog_form.react

var BlogBox = React.createClass({
  getInitialState: function() {
    UserStore.getCurrentUser();
    return ( {
      blogs: BlogStore.blogs,
    } )
  },

  componentDidMount: function() {
    BlogStore.addChangeEvent(function(){
      this.setState({blogs: BlogStore.blogs()})
    })
  },

  render: function() {
    return (
      <div className="clearfix mr6 ml6">
        <header className="center">
          <h1>sm<a href="#" className="orange">:)</a>eyblog</h1>
          <p>hello!</p>
          <nav className="bor-dot-top bor-dot-bottom">
            <ul className="m1">
              <li className="inline mr1"><a href="#" className="mid-gray italic orange">All</a></li>
              <li className="inline mr1"><a href="#"  className="mid-gray italic" >Recent</a></li>
              <li className="inline mr1"><a href="#"  className="mid-gray italic" >Rails</a></li>
              <li className="inline mr1"><a href="#"  className="mid-gray italic" >React</a></li>
              <li className="inline mr1"><a href="#"  className="mid-gray italic" >Angular</a></li>
              <li className="inline mr1"><a href="#"  className="mid-gray italic" >Backbone</a></li>
            </ul>
          </nav>
        </header>
        <section className="center mt3 mb3">
          <h2 className="regular orange">All</h2>
          <ul className="list-reset">
            <li>Blog1</li>
            <li>Blog2</li>
            <li>Blog3</li>
            <li>Blog4</li>
            <li>Blog5</li>
            <li>Blog6</li>
          </ul>
        </section>
        <footer className="center bor-dot-top light-gray">
          <p className="m0 italic">by eiko seino</p>
          <p><a href="" className="light-gray italic">login</a></p>
        </footer>
      </div>
    )
  }

})