var Line = React.createClass({
  render: function() {

    if (this.props.currentLine == true) {
      var disabled = false
    } else {
      var disabled = true
    }

    var classNames = "line";
    var startingMarker;

    if (this.props.content == undefined) {
      startingMarker = <span> {">"} </span>;
    } else {
      classNames += " response";
    }

    return (
      <span>
        {startingMarker}
        <input ref="line" className={classNames} onKeyPress={this.props.onKeyPress}
          disabled={disabled} value={this.props.content} />
      </span>
    );
  }
});

var Terminal = React.createClass({

  getDefaultProps: function() {
    return { lines: [<Line />] }
  },

  handleTyping: function(event) {
    if (event.charCode == 13) {
      var lines = this.props.lines

      if (event.target.value == "") {
        lines.push(<Line />)
      } else {
        var inputHandler = new InputHandler();

        var response = inputHandler.responseTo(event.target.value)

        lines.push(<Line content={response} />)
        lines.push(<Line />)
      }

      this.setProps({lines: lines});
    }
  },

  componentDidMount: function() {
    var firstLine = this.refs['line-0'].refs.line
    React.findDOMNode(firstLine).focus();
  },

  componentDidUpdate: function(prevProps, prevState) {
    var currentLine = this.refs['line-' + (this.props.lines.length + -1)].refs.line
    React.findDOMNode(currentLine).focus();
  },

  render: function() {
    return (
      <div className="terminal">
        {this.props.lines.map(function(line, i){

          var line = React.cloneElement(line, {
            key: i, ref: 'line-' + i, currentLine: false
          });

          // If last line
          if (i+1 == this.props.lines.length) {
            var line = React.cloneElement(line, {
              onKeyPress: this.handleTyping, currentLine: true
            });
          }

          return ( line );
        }, this)}
      </div>
    );
  }
});
