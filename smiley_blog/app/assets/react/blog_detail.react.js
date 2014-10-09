/** @jsx React.DOM */
//=require react/blog_options.react

var BlogDetail = React.createClass({

  render: function() {
    var blog = this.props.blog;
    var user = this.props.currentUser;

    return (
      <section className="center">
        <h2 className="regular orange">{blog.title}</h2>
        <h5 className="italic regular light-gray">{this.format_date(blog.updated_at)}</h5>
        <p>{blog.content}</p>
        <BlogOptions blog={blog} currentUser={user} />
      </section>
    )
  },

  format_date: function(date) {
    formatted_date = new Date(date);
    return formatted_date.toDateString();
  }

})