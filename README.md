# 压缩图片

## 引入
首先引入一个依赖 `exif-js` 用来兼容ios平台照片方向的
```
npm install exif-js
```
## 1. webpack项目

直接引入`compress-image.js`就可以
```javascript
import <NAME> from './compress-image.js'
```

## 2.如果需要js引入

```
npm run build
```
得到`bundle.js`之后通过`script`引入就可以
```javascript
<script src="bundle.js"></script>
```


**参数说明**
<table>
<thead>
<tr>
<th style="text-align:left">参数</th>
<th style="text-align:left">类型</th>
<th style="text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">file</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">File 对象</td>
</tr>
<tr>
<td style="text-align:left">quality</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">图片的压缩质量（0 - 1之间取值），默认是 0.5 </td>
</tr>
<tr>
<td style="text-align:left">maxSize</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">图片的临界压缩尺寸，只有图片大于这个尺寸才会被压缩，默认400*1024 （400kb）</td>
</tr>
</tbody>
</table>

**函数返回参数说明**

函数会返回一个Promise对象

```javascript
<Promise>.then((file) => {

 // file: 压缩后的 File对象

})
```


## 使用

### 1. element-ui Upload组件

> before-upload：上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传，保证函数返回Promise对象，并且then的返回参数是 `Blob` 或者 `File` 的实列

```javascript
// ...

<el-upload
  :before-upload="beforeUpload"
   />

// ...

beforeUpload (file) {

  // 1. 执行其他操作

  return _compress(file).then(file => {
    
    // 2. 执行其他操作

    return file
  })
}

```