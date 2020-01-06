[![NPM](https://nodei.co/npm/image-handler.png?compact=true)](https://nodei.co/npm/image-handler/)
# Installation

```
npm i image-handler
```

# Usage

```javascript
import imgHandler from 'image-handler'

imgHandler.compress(file, quality, maxSize)

```


**Params descript**
<table>
<thead>
<tr>
<th style="text-align:left">Params</th>
<th style="text-align:left">Type</th>
<th style="text-align:left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">file</td>
<td style="text-align:left">Object</td>
<td style="text-align:left">File Object</td>
</tr>
<tr>
<td style="text-align:left">quality</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">The quality of compressing（between 0 - 1）, default 0.5 </td>
</tr>
<tr>
<td style="text-align:left">maxSize</td>
<td style="text-align:left">Number</td>
<td style="text-align:left">if the size of file larger than maxSize, handle to compress,  default 400*1024 （400kb）</td>
</tr>
</tbody>
</table>

**Callback description**

return a Promise Object

```javascript
<Promise>.then((file) => {

 // file: after compressing file object

})
```
