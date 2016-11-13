'use strict'

const { counter } = require('../common/util')

module.exports = {
  seq() {
    const seq = counter()

    return next => action => {
      action.meta = {
        ...action.meta,
        seq: seq.next(),
        now: Date.now()
      }

      return next(action)
    }
  }
}
