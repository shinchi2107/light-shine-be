const stackTrace = require("stack-trace");

function log(...args) {
  const trace = stackTrace.get()[1];
  const file = trace.getFileName();
  const line = trace.getLineNumber();
  console.log(`[${file}:${line}]`, ...args);
}

module.exports = {
  log,
};