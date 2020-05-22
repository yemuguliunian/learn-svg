---
title: stroke-dashoffset
---

## stroke-dashoffset

指定了 dash 模式到路径开始的距离

如果使用了一个 <百分比> 值， 那么这个值就代表了当前 viewport 的一个百分比。

值可以取为负值。

### 用法

| 类别 | 外观属性                                |
| ---- | --------------------------------------- |
| 值   | `<percentage>` \| `<length>` \| inherit |

### 示例

```html
<svg
    width="200"
    height="70"
    viewPort="0 0 200 300"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="dash-demo"
>
    <line stroke-dasharray="10, 5" x1="10" y1="10" x2="190" y2="10" />
    <line stroke-dasharray="10, 5" stroke-dashoffset="10" x1="10" y1="30" x2="190" y2="30" />
    <line stroke-dasharray="10, 5" stroke-dashoffset="-10" x1="10" y1="50" x2="190" y2="50" />
</svg>
```

<div class="demo">
    <svg width="200" height="70" viewPort="0 0 200 300" version="1.1" xmlns="http://www.w3.org/2000/svg" class="dash-demo">
        <line stroke-dasharray="10, 5" x1="10" y1="10" x2="190" y2="10" />
        <line stroke-dasharray="10, 5" stroke-dashoffset="10" x1="10" y1="30" x2="190" y2="30" />
        <line stroke-dasharray="10, 5" stroke-dashoffset="-10" x1="10" y1="50" x2="190" y2="50" />
    </svg>
</div>

`stroke-dashoffset="10"`，偏移正数，虚线整体左移了 10 个单位

`stroke-dashoffset="-3"`，偏移负数，虚线整体右移动了 3 个单位，由于 `dasharray` 是循环的，前面偏移的位置会有 `dasharray` 填充上

<style>
.dash-demo line{
    stroke: black;
    stroke-width: 2;
}
</style>
