function InputHandler() {
  this.samiljin = new Developer();
}

InputHandler.prototype.responseTo = function (command) {
  var samiljin = this.samiljin

  try {
    var response = eval(command + "()")
    return response
  } catch (e) {
    return "Unknown command: '" + command + "'";
  }
};
