import { compressImage, fileToUrl } from './image'

const imgHandler = Object.create(null)
imgHandler.version = '0.0.6'
imgHandler.compressImage = compressImage
imgHandler.fileToUrl = fileToUrl
;(function () {
  'use strict'

  const WIN = typeof window === 'object'
  if (!WIN) throw Error('window is not defined.')
  const COMMON_JS = typeof module === 'object' && module.exports
  const AMD = typeof define === 'function' && define.amd

  if (COMMON_JS) {
    module.exports = imgHandler
  } else {
    this.imgHandler = imgHandler
    if (AMD) {
      define(function () {
        return imgHandler
      })
    }
  }
}).call(this || (typeof window !== 'undefined' ? window : global))