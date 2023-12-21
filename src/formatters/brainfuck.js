function format(tokens) {
  return tokens.length ? '>'.repeat(tokens[0].count) : '';
}

module.exports = {
  default: format,
  format,
};
