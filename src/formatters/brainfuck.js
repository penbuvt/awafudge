function format(tokens) {
  return tokens.length ? '>' : '';
}

module.exports = {
  default: format,
  format,
};
