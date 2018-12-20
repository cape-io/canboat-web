const _ = require('lodash/fp')
const { replaceField, setWith, transformHas } = require('cape-lodash')
const pgnInfo = require('@canboat/pgns/package.json')

// organizedPGNs

// FIELD
const fieldDefaults = {
  BitLength: 8,
  Signed: false
}
const fixField = _.defaults(fieldDefaults)

const fixFields = _.flow(
  transformHas('Field', Array),
  _.map(fixField),
)

// PGN
const pgnDefault = {
  Complete: false,
  Length: 8, // bytes
  RepeatingFields: 0,
}
const countBits = _.flow(_.map('BitLength'), _.sum)
const fixPgn = _.flow(
  _.defaults(pgnDefault),
  replaceField('Fields', fixFields),
  setWith('Bits', 'Fields', countBits),
  // setWith('Bytes', 'Bits', divideBy(8)),
)

const fixPgns = _.flow(_.map(fixPgn), _.groupBy('PGN'))

// INFO
const fixInfo = _.flow(
  _.set('Version', pgnInfo.version),
  _.set('Description', pgnInfo.description),
  replaceField('PGNs', fixPgns),
)

module.exports = {
  fixInfo,
}
