/** @jsx React.DOM */
//=require react/blog.react

var Blogs = React.createClass({
  render: function() {
    var blogs = [];
    this.props.blogs.forEach(function(blog){
      blogs.push( <Blog blog={blog} /> )
    });
    return (
      <section className="relative pad-t-12">
        <ul>
          {blogs}
        </ul>
      </section>
    )
  }
})