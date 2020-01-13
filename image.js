// 压缩图片
import EXIF from 'exif-js'
export function compressImage (file, quality = 0.5, maxSize = 400*1024) {
  return new Promise((resolve, reject) => {
    if (window.FileReader === undefined || window.File === undefined || !file.type.includes('image/')) {
      resolve(file)
    }
    // 如果图片小于压缩尺寸就不压缩
    if (file.size < maxSize) {
      resolve(file)
    }
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      const result = this.result
      let img = new Image()
      img.src = result
      img.onload = function () {
        resolve(compressFn(img, quality, file))
      }
      img.onerror = function (err) {
        reject(err)
      }
    }
    reader.onerror = function (err) {
      reject(err)
    }
  })
}

function compressFn (img, quality, file) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  let targetHeight = img.height
  let targetWidth = img.width
  canvas.width = targetWidth
  canvas.height = targetHeight
  // 清除画布
  ctx.clearRect(0, 0, targetWidth, targetHeight)
  if (isIOS()) {
    return adjustIosOrient(img, file, ctx)
    .then(() => {
      // 图片压缩
      const data = canvas.toDataURL('image/jpeg', quality) // data url的形式
      return base64ToFile(data)
    })
  } else {
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
    const data = canvas.toDataURL('image/jpeg', quality) // data url的形式
    return base64ToFile(data)
  }
}

// 是否是iPhone手机，iPhone 拍照之后的压缩是逆时针旋转90，针对iphone做一下处理
function adjustIosOrient (img, file, ctx) { // translate是平移变换，scale(-1,1)是向左翻转，rotate是顺时针旋转。
  return new Promise((resolve) => {
    EXIF.getData(file, () => {
      let orientation = EXIF.getTag(file, 'Orientation')
      switch (Number(orientation)) {
        case 2:
            ctx.translate(img.width, 0)
            ctx.scale(-1, 1)
            ctx.drawImage(img, 0, 0, img.width, img.height)
            break
          case 3:
            ctx.rotate(180 * Math.PI / 180)
            ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
            break
          case 4:
            ctx.translate(img.width, 0)
            ctx.scale(-1, 1)
            ctx.rotate(180 * Math.PI / 180)
            ctx.drawImage(img, -img.width, -img.height, img.width, img.height)
            break
          case 5:
            ctx.translate(img.width, 0)
            ctx.scale(-1, 1)
            ctx.rotate(90 * Math.PI / 180)
            ctx.drawImage(img, 0, -img.width, img.height, img.width)
            break
          case 6:
            ctx.rotate(90 * Math.PI / 180)
            ctx.drawImage(img, 0, 0, img.width, -img.height)
            break
          case 7:
            ctx.translate(img.width, 0)
            ctx.scale(-1, 1)
            ctx.rotate(270 * Math.PI / 180)
            ctx.drawImage(img, -img.height, 0, img.height, img.width)
            break
          case 8:
            ctx.rotate(270 * Math.PI / 180)
            ctx.drawImage(img, -img.height, 0, img.height, img.width)
            break
          default:
            ctx.drawImage(img, 0, 0, img.width, img.height)
      }
      resolve()
    })
  })
}

// file对象转化为本地url
const files = {}
export function fileToUrl (file) {
  for (const key in files) {
    if (files.hasOwnProperty(key)) {
      const oldFile = files[key]
      if (oldFile === file) {
        return key
      }
    }
  }
  var url = (window.URL || window.webkitURL).createObjectURL(file)
  files[url] = file
  return url
}

// base64转化为file对象
function base64ToFile (base64) {
  base64 = base64.split(',')
  var type = base64[0].match(/:(.*?);/)[1]
  var str = window.atob(base64[1])
  var n = str.length
  var array = new Uint8Array(n)
  while (n--) {
    array[n] = str.charCodeAt(n)
  }
  var filename = `${Date.now()}.${type.split('/')[1]}`
  return new File([array], filename, { type: type })
}

// 判断是否ios平台
function isIOS () {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}