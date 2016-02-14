var Line = React.createClass({

  getInitialState: function() {
    return {value: this.props.content};
  },

  componentDidUpdate: function() {
    
  },

  handleChange: function(event) {
    this.setState({value: event.target.value}, function() {
      console.log(this.state);
    });
  },

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
              <input
                ref          = "line"
                className    = 'line'
                onKeyPress   = {this.props.onKeyPress}
                disabled     = {disabled}
                defaultValue = {this.props.content}
                value        = {this.state.value}
                onChange     = {this.handleChange} />
            </span>
    } else {
      line = <span>
               <div
                 className               = "line response"
                 dangerouslySetInnerHTML = {{__html: this.props.content}} />
             </span>
    }

    return (
      <span>
        {line}
      </span>
    );
  }
});
