const _ = require('lodash/fp')
const fs   = require('fs').promises
const pgnInfoRaw = require('@canboat/pgns')
const { fixInfo } = require('./fixPgns')

const pgnInfo = fixInfo(pgnInfoRaw)

const prepSave = _.partialRight(JSON.stringify, [null, 2])

const saveJsonFile = ([filename, data]) =>
  fs.writeFile(`public/pgn/${filename}.json`, prepSave(data), { encoding: 'utf8' })

// const savePgn = data => saveJsonFile(data.PGN, data)
const savePgn = _.flow(_.over(['0.PGN', _.identity]), saveJsonFile)
saveJsonFile(['index', pgnInfo])
  .then(() => Promise.all(_.map(savePgn, pgnInfo.PGNs)))
  // .then(console.log)
  .then(() => console.log('DONE'))
