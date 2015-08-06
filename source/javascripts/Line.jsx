var Line = React.createClass({
  render: function() {

    if (this.props.currentLine == true) {
      var disabled = false
    } else {
      var disabled = true
    }

    var line;

    if (this.props.response == undefined) {
      line = <span>
              <span> {">"} </span>
              <input ref="line" className='line' onKeyPress={this.props.onKeyPress} disabled={disabled} value={this.props.content} />
            </span>
    } else {
      line = <span>
               <div className="line response" dangerouslySetInnerHTML={{__html: this.props.content}}></div>
             </span>
    }

    return (
      <span>
        {line}
      </span>
    );
  }
});
