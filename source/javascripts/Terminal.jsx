var UPKEY   = 38;
var ENTER   = 13;
var DOWNKEY = 40;

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

var Terminal = React.createClass({

  getDefaultProps: function() {
    return { lines: [<Line />], givenCommands: [], upkeyPressedCount: 0 }
  },

  handleKeyDown: function(event) {
    switch (event.keyCode) {
      case UPKEY:
        if (this.props.givenCommands.length > 0) {
          console.log("Rekisteröity...");
          if (this.props.upkeyPressedCount != this.props.givenCommands.length) {
            var upkeyPressedCount = this.props.upkeyPressedCount;
            upkeyPressedCount++;

            this.setProps({upkeyPressedCount: upkeyPressedCount}, function() {
              var commandIndex = this.props.givenCommands.length - this.props.upkeyPressedCount;
              var command = this.props.givenCommands[commandIndex];
              console.log(command); // TODO: Put into focused input
            });
          } else {
            var command = this.props.givenCommands[0];
            console.log(command); // TODO: Put into focused input
          }
        }
        break;
      case DOWNKEY:
        if (this.props.upkeyPressedCount > 0) {
          console.log("Rekisteröity...");
          var upkeyPressedCount = this.props.upkeyPressedCount;
          upkeyPressedCount--;

          this.setProps({upkeyPressedCount: upkeyPressedCount}, function() {
            var commandIndex = this.props.givenCommands.length - this.props.upkeyPressedCount;
            var command = this.props.givenCommands[commandIndex];

            if (command == undefined) {
              command = ""
            }

            console.log(command); // TODO: Put into focused input
          });
        }

        break;
      default: return;
    }
  },

  handleTyping: function(event) {
    if (event.charCode == ENTER) {
      var lines         = this.props.lines;
      var givenCommands = this.props.givenCommands;

      if (event.target.value == "") {
        lines.push(<Line />)
      } else {
        var command      = event.target.value;
        var inputHandler = new InputHandler();

        var response = inputHandler.responseTo(command)

        lines.push(<Line response={true} content={response} />)
        lines.push(<Line />)
        givenCommands.push(command);
      }

      this.setProps({lines: lines, givenCommands: givenCommands});
    }
  },

  componentDidMount: function() {
    var firstLine = this.refs['line-0'].refs.line
    React.findDOMNode(firstLine).focus();
    window.addEventListener('keydown', this.handleKeyDown);
  },

  componentDidUpdate: function(prevProps, prevState) {
    var currentLine = this.refs['line-' + (this.props.lines.length - 1)].refs.line
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
              currentLine: true,
              onKeyPress: this.handleTyping
            });
          }

          return ( line );
        }, this)}
      </div>
    );
  }
});
