function Developer(firstName, lastName) {
  this.firstName = firstName;
  this.lastName  = lastName;
}

Developer.prototype.first_name = function () {
  return '"' + this.firstName + '"';
};

Developer.prototype.last_name = function () {
  return '"' + this.lastName+ '"';
};

Developer.prototype.full_name = function () {
  return '"' + this.firstName + ' ' + this.middleName + ' ' + this.lastName + '"';
};

Developer.prototype.twitter = function () {
  return '<a href="https://twitter.com/samiljin"> https://twitter.com/samiljin </a>'
};
