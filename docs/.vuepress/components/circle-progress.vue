<template>
    <div class="progress" :style="{ width: `${width}px`, height: `${width}px` }">
        <svg :width="width" :height="width">
            <circle
                :cx="cx"
                :cy="cy"
                :r="radius"
                stroke="#f5f5f5"
                :stroke-width="strokeWidth"
                fill="none"
            />
            <circle
                :cx="cx"
                :cy="cy"
                :r="radius"
                fill="none"
                stroke="#1890ff"
                :stroke-width="strokeWidth"
                :stroke-dasharray="dasharray"
                :stroke-dashoffset="dashoffset"
                :stroke-linecap="percent ? 'round' : 'butt'"
                class="progress-bg"
            />
        </svg>
        <span class="progress-text">{{ `${percent}%` }}</span>
    </div>
</template>

<script>
export default {
    props: {
        percent: { type: Number, default: 0 },
        width: { type: Number, default: 132 },
        strokeWidth: { type: Number, default: 6 },
    },
    data() {
        const { width, strokeWidth } = this;
        const offset = width / 2;
        const radius = offset - strokeWidth / 2;
        const len = 2 * Math.PI * radius;
        return {
            radius, // 半径
            cx: offset, // x 轴偏移量
            cy: offset, // y 轴偏移量
            dashoffset: len / 4,
            circelLen: len,
            dasharray: '0',
        };
    },
    watch: {
        percent: {
            handler(val) {
                const { circelLen } = this;
                this.dasharray = `${circelLen * (val / 100)}, ${circelLen * ((100 - val) / 100)}`;
            },
            immediate: true,
        },
    },
};
</script>

<style scoped>
.progress {
    position: relative;
    display: inline-block;
}
.progress-bg {
    transition: all 0.4s cubic-bezier(0.08, 0.82, 0.17, 1) 0s;
}
.progress-text {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    line-height: 1;
    white-space: normal;
    text-align: center;
    transform: translate(-50%, -50%);
}
</style>
