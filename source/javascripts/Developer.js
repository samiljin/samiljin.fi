function Developer() {
  this.firstName = "Sami";
  this.lastName  = "Iljin";
}

Developer.prototype.first_name = function () {
  return '"' + this.firstName + '"';
};

Developer.prototype.last_name = function () {
  return '"' + this.lastName+ '"';
};

Developer.prototype.full_name = function () {
  return '"' + this.firstName + ' Johannes ' + this.lastName + '"';
};

Developer.prototype.twitter = function () {
  return '"https://twitter.com/samiljin"'
};
