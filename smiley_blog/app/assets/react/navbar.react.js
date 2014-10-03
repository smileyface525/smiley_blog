/** @jsx React.DOM */
//= require stores/tag_store
//=require actions/tag_actions

var Navbar = React.createClass({

  render: function() {
    var currentTag = this.props.currentTag;
    var withOrange = "mid-gray italic orange";
    var noOrange = "mid-gray italic";

    return (
      <nav className="center bor-dot-top bor-dot-bottom">
        <ul className="m1">
          {this.props.tags.map(function(tag) {
            return <li className="inline mr1"><a href="#" className={ tag === currentTag ? withOrange : noOrange} data-tag-name={tag} onClick={this.handleClick}>{tag}</a></li>
          }.bind(this))}
        </ul>
      </nav>
    )
  },

  handleClick: function(event) {
    event.preventDefault();
    var tagClicked = event.target.dataset.tagName;
    TagActions.showBlogs(tagClicked);
  }

})