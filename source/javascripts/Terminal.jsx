var UPKEY   = 38;
var ENTER   = 13;
var DOWNKEY = 40;

var Terminal = React.createClass({

  getDefaultProps: function() {
    return { lines: [<Line />], givenCommands: [], upkeyPressedCount: 0 }
  },

  setCommandToLine: function(command) {
    var lines = this.props.lines
    var currentLine = React.cloneElement(lines[lines.length - 1], {content: command});
    lines.pop();
    lines.push(currentLine);
    this.setProps({lines: lines}, function() {
      this.focusCurrentLine();
    });
  },

  currentLine: function() {
    return this.refs['line-' + (this.props.lines.length - 1)].refs.line;
  },

  focusCurrentLine: function() {
    var domNode = React.findDOMNode(this.currentLine());
    domNode.focus();
    domNode.setSelectionRange(domNode.value.length, domNode.value.length);
  },

  handleClick: function(event) {
    this.focusCurrentLine();
  },

  handleKeyDown: function(event) {
    switch (event.keyCode) {
      case UPKEY:
        if (this.props.givenCommands.length > 0) {
          if (this.props.upkeyPressedCount != this.props.givenCommands.length) {
            var upkeyPressedCount = this.props.upkeyPressedCount;
            upkeyPressedCount++;

            this.setProps({upkeyPressedCount: upkeyPressedCount}, function() {
              var commandIndex = this.props.givenCommands.length - this.props.upkeyPressedCount;
              var command = this.props.givenCommands[commandIndex];
              this.setCommandToLine(command);
            });
          } else {
            var command = this.props.givenCommands[0];
            this.setCommandToLine(command);
          }
        }

        break;
      case DOWNKEY:
        if (this.props.upkeyPressedCount > 0) {
          var upkeyPressedCount = this.props.upkeyPressedCount;
          upkeyPressedCount--;

          this.setProps({upkeyPressedCount: upkeyPressedCount}, function() {
            var commandIndex = this.props.givenCommands.length - this.props.upkeyPressedCount;
            var command = this.props.givenCommands[commandIndex];

            if (command == undefined) {
              command = ""
            }

            this.setCommandToLine(command);
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
