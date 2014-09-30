/** @jsx React.DOM */
//=require react/blog.react

var Blogs = React.createClass({
  render: function() {
    return (
      <section className="center mt3 mb3">
        <h2 className="regular orange">{this.props.currentTag}</h2>
        <ul className="list-reset">
          {this.props.blogs.map(function(blog) {
            return <Blog blog={blog} />
          })}
        </ul>
      </section>
    )
  }
})