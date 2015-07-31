function InputHandler() {
  this.samiljin = new Developer("Sami", "Iljin");

  this.responseTo = function(command) {
    var samiljin        = this.samiljin;
    samiljin.middleName = "Johannes";

    try {
      var response = eval(command + "()");
      return response;
    } catch (e) {
      return "Unknown command: '" + command + "'";
    }
  }
}
