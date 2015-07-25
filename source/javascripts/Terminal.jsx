var Terminal = React.createClass({

  getDefaultProps: function() {
    return { lines: [<input className="line" />] }
  },

  handleTyping: function(event) {
    if (event.charCode == 13) {
      var newLine = <input className="line" />

      var lines = this.props.lines
      lines.push(newLine)
      this.setProps({lines: lines}, function() {});
    }
  },

  componentDidMount: function() {
    React.findDOMNode(this.refs['line-0']).focus();
  },

  componentDidUpdate: function(prevProps, prevState) {
    React.findDOMNode(this.refs['line-' + (this.props.lines.length + -1)]).focus();
  },

  render: function() {
    return (
      <div className="terminal">
        {this.props.lines.map(function(line, i){
          var line = React.cloneElement(line, {ref: 'line-' + i});
          if (i == 0 || i+1 == this.props.lines.length) {
            var line = React.cloneElement(line, {
              onKeyPress: this.handleTyping
            });
          }
          return ( line );
        }, this)}
      </div>
    );
  }
});
