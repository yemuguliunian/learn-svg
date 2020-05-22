---
title: stroke-dasharray
---

## stroke-dasharray

用于创建虚线

### 用法

| 类别 | 外观属性                         |
| ---- | -------------------------------- |
| 值   | none \| `<dasharray>` \| inherit |

**`<dasharray>`**

长度和间距的数列，数与数之间用逗号或者空白隔开，指定短划线和缺口的长度。

`stroke-dasharray = '10'` 表示：虚线长 10，间距 10，然后重复 虚线长 10，间距 10

`stroke-dasharray = '10, 5'` 表示：虚线长 10，间距 5，然后重复 虚线长 10，间距 5

`stroke-dasharray = '20, 10, 5'` 表示：虚线长 20，间距 10，虚线长 5，接着是间距 20，虚线 10，间距 5，之后开始如此循环

### 示例

```html
<svg
    width="200"
    height="200"
    viewPort="0 0 200 300"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="dasharray-demo"
>
    <line stroke-dasharray="5, 5" x1="10" y1="10" x2="190" y2="10" />
    <line stroke-dasharray="5, 10" x1="10" y1="30" x2="190" y2="30" />
    <line stroke-dasharray="10, 5" x1="10" y1="50" x2="190" y2="50" />
    <line stroke-dasharray="5, 1" x1="10" y1="70" x2="190" y2="70" />
    <line stroke-dasharray="1, 5" x1="10" y1="90" x2="190" y2="90" />
    <line stroke-dasharray="0.9" x1="10" y1="110" x2="190" y2="110" />
    <line stroke-dasharray="15, 10, 5" x1="10" y1="130" x2="190" y2="130" />
    <line stroke-dasharray="15, 10, 5, 10" x1="10" y1="150" x2="190" y2="150" />
    <line stroke-dasharray="15, 10, 5, 10, 15" x1="10" y1="170" x2="190" y2="170" />
    <line stroke-dasharray="5, 5, 1, 5" x1="10" y1="190" x2="190" y2="190" />
</svg>

<style>
    .dasharray-demo line {
        stroke: black;
        stroke-width: 2;
    }
</style>
```

<div class="demo">
    <svg width="200" height="200" viewPort="0 0 200 300" version="1.1" xmlns="http://www.w3.org/2000/svg" class="dash-demo">
        <line stroke-dasharray="5, 5"              x1="10" y1="10" x2="190" y2="10" />
        <line stroke-dasharray="5, 10"             x1="10" y1="30" x2="190" y2="30" />
        <line stroke-dasharray="10, 5"             x1="10" y1="50" x2="190" y2="50" />
        <line stroke-dasharray="5, 1"              x1="10" y1="70" x2="190" y2="70" />
        <line stroke-dasharray="1, 5"              x1="10" y1="90" x2="190" y2="90" />
        <line stroke-dasharray="0.9"               x1="10" y1="110" x2="190" y2="110" />
        <line stroke-dasharray="15, 10, 5"         x1="10" y1="130" x2="190" y2="130" />
        <line stroke-dasharray="15, 10, 5, 10"     x1="10" y1="150" x2="190" y2="150" />
        <line stroke-dasharray="15, 10, 5, 10, 15" x1="10" y1="170" x2="190" y2="170" />
        <line stroke-dasharray="5, 5, 1, 5"        x1="10" y1="190" x2="190" y2="190" />
    </svg>
</div>

<style>
.dash-demo line{
    stroke: black;
    stroke-width: 2;
}
</style>
