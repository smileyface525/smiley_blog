/** @jsx React.DOM */
//= require stores/tag_store
//=require actions/tag_actions

var Navbar = React.createClass({

  componentDidMount: function() {
    $('nav a').eq(0).addClass('orange');
  },

  render: function() {
    debugger
    return (
      <nav className="bor-dot-top bor-dot-bottom">
        <ul className="m1">
          {TagStore.permanentTags().map(function(tag) {
            return <li className="inline mr1"><a href="#" className="mid-gray italic" data-tag-name={tag} onClick={this.handleClick}>{tag}</a></li>
          }.bind(this))}
          {this.props.tags.map(function(tag) {
            return <li className="inline mr1"><a href="#"  className="mid-gray italic" key={tag.id} data-tag-name={tag.name} onClick={this.handleClick} >{tag.name}</a></li>
          }.bind(this))}
        </ul>
      </nav>
    )
  },

  handleClick: function(event) {
    event.preventDefault();
    var tagClicked = event.target.dataset.tagName;
    switch(tagClicked) {
      case "All":
        TagActions.showAllBlogs(tagClicked);
      break;
      case "Recent":
        TagActions.showRecentBlogs(tagClicked);
      break;
    }
  }

})