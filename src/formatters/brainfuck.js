function format(tokens) {
  return tokens.length ? {
    RIGHT_SHIFT: '>',
    LEFT_SHIFT: '<',
    INCREMENT: '+',
  }[tokens[0].type].repeat(tokens[0].count) : '';
}

module.exports = {
  default: format,
  format,
};
