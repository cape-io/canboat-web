const _ = require('lodash/fp')
const fs   = require('fs').promises
const pgnInfo = require('@canboat/pgns')
const { fixInfo } = require('./fixPgns')

const FILENAME = 'build/index.json'
const prepSave = _.flow(
  fixInfo,
  _.partialRight(JSON.stringify, [null, 2]),
)
const saveJsonFile = pgns =>
  fs.writeFile(FILENAME, prepSave(pgns), { encoding: 'utf8' })

saveJsonFile(pgnInfo)
  .then(console.log)
