var UPKEY   = 38;
var ENTER   = 13;
var DOWNKEY = 40;

var Terminal = React.createClass({

  getDefaultProps: function() {
    return { lines: [<Line />], givenCommands: [], upkeyPressedCount: 0 }
  },

  focusCurrentLine: function() {
    var currentLine = this.refs['line-' + (this.props.lines.length - 1)].refs.line
    React.findDOMNode(currentLine).focus();
  },

  handleClick: function(event) {
    this.focusCurrentLine();
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
    this.focusCurrentLine();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('click', this.handleClick);
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.focusCurrentLine();
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
