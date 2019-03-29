const result = require('./dataformat').result
const program = require('commander')

// var argv = process.argv.splice(2)
// console.log(argv)

program.option('-p,--platform [type]', 'runtime env').parse(process.argv)
if (program.platform) console.log(program.platform)