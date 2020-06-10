<template>
    <div style="width: 100%; height: 100%;" ref="chart">
        <svg width="100%" height="100%">
            <!-- 坐标轴 -->
            <g id="axis" stroke="#000" stroke-width="1">
                <!-- x轴 -->
                <line :x1="x.x1" :y1="x.y1" :x2="x.x2" :y2="x.y2"></line>
                <!-- y轴 -->
                <line :x1="y.x1" :y1="y.y1" :x2="y.x2" :y2="y.y2"></line>
            </g>
            <!-- 柱状图背景 -->
            <g fill="#f0f0f0">
                <rect
                    v-for="bg in backgrounds"
                    :x="bg.x"
                    :y="bg.y"
                    :width="bg.width"
                    :height="bg.height"
                    class="graph-item"
                />
            </g>
            <!-- 柱状图形 -->
            <g fill="#c23531" :transform="`translate(0, ${y.y1 + y.y2}) scale(1, -1)`">
                <rect
                    v-for="g in graphics"
                    :x="g.x"
                    :y="g.y"
                    :width="g.width"
                    :height="g.height"
                    class="graph-item"
                >
                    <animate
                        attributeName="height"
                        from="0"
                        :to="g.height"
                        dur=".5s"
                        calcMode="linear"
                        keyTimes="0; 1"
                        keySplines="0.08 0.82 0.17 1"
                    />
                </rect>
            </g>
            <!-- 刻度线 -->
            <g id="scale" stroke="#000" stroke-width="1">
                <line v-for="s in xScales" :x1="s.x1" :y1="s.y1" :x2="s.x2" :y2="s.y2"></line>
            </g>
            <!-- x 轴坐标标签文本 -->
            <g id="xAxisLabel" font-size="12">
                <text
                    v-for="xl in xAxisLabel"
                    :x="xl.x"
                    :y="xl.y"
                    text-anchor="middle"
                    dominant-baseline="middle"
                >
                    {{ xl.label }}
                </text>
            </g>
        </svg>
    </div>
</template>

<script>
import debounce from 'lodash/debounce';
import merge from 'lodash/merge';
import max from 'lodash/max';
// 刻度长度
const scaleLen = 5;

const defaultOption = {
    grid: {
        left: '10%',
        top: 60,
        right: '10%',
        bottom: 60,
    },
    xAxis: {
        data: [],
    },
};

export default {
    components: {},
    props: {
        option: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            mergedOption: defaultOption,
            // x轴
            x: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
            },
            // y轴
            y: {
                x1: 0,
                x2: 0,
                y1: 0,
                y2: 0,
            },
            xScales: [],
            xAxisLabel: [],
            graphics: [],
            backgrounds: [],
        };
    },
    mounted() {
        this.mergeOption(this.option);
        this.calculateBoundary();
        this.debouncedResize = debounce(() => {
            this.calculateBoundary();
        }, 250);
        this.resizeEvent = window.addEventListener('resize', this.debouncedResize);
    },
    beforeDestroy() {
        this.resizeEvent = window.removeEventListener('resize', this.debouncedResize);
    },
    watch: {
        option(val) {
            this.mergeOption(val);
        },
    },
    methods: {
        mergeOption(option) {
            const mergeOption = merge(defaultOption, option);
            Object.assign(this.mergedOption, mergeOption);
        },

        calculateBoundary() {
            const { clientHeight, clientWidth } = this.$refs.chart;
            let {
                grid: { top, bottom, left, right },
            } = this.$data.mergedOption;
            top = calculatePixel(top, clientHeight);
            bottom = calculatePixel(bottom, clientHeight);
            left = calculatePixel(left, clientWidth);
            right = calculatePixel(right, clientWidth);
            this.drawAxis({ clientHeight, clientWidth, top, bottom, left, right });
            this.drawScale();
            this.drawGraphics();
        },

        // 描绘坐标轴
        drawAxis({ clientHeight, clientWidth, top, bottom, left, right }) {
            Object.assign(this, {
                x: {
                    x1: left,
                    x2: clientWidth - right,
                    y1: clientHeight - bottom,
                    y2: clientHeight - bottom,
                },
                y: {
                    x1: left,
                    x2: left,
                    y1: clientHeight - bottom,
                    y2: top,
                },
            });
        },

        // 描绘刻度
        drawScale() {
            const {
                x: { x1, x2, y1 },
                mergedOption: {
                    xAxis: { data },
                },
            } = this.$data;
            let xScales = [];
            let xAxisLabel = [];
            // x 坐标
            if (Array.isArray(data) && data.length > 0) {
                const dataNum = data.length;
                const average = (x2 - x1) / dataNum;
                for (let i = 0; i <= dataNum; i++) {
                    xScales.push({
                        x1: x1 + average * i,
                        x2: x1 + average * i,
                        y1: y1,
                        y2: y1 + scaleLen,
                    });
                    if (i != dataNum) {
                        xAxisLabel.push({
                            label: data[i],
                            y: y1 + 12,
                            x: x1 + average * i + average / 2,
                        });
                    }
                }
            }

            Object.assign(this, {
                xScales,
                xAxisLabel,
            });
        },

        // 绘制图形
        drawGraphics() {
            const {
                x: { x1, x2 },
                y: { y1, y2 },
                mergedOption: {
                    xAxis: { data: xAxisData },
                    series: { data: seriesData },
                },
            } = this.$data;
            if (Array.isArray(xAxisData) && xAxisData.length > 0) {
                let graphics = [];
                let backgrounds = [];
                const xAxisCols = xAxisData.length;
                const average = (x2 - x1) / xAxisCols;
                const maxNum = max(seriesData);

                // y 轴长度
                const yAxisLen = y1 - y2;
                // 柱状图宽
                const graphicsWidth = average * 0.8;
                const graphicsX = (average - graphicsWidth) / 2;
                for (let i = 0; i < xAxisCols; i++) {
                    const graphicsHeight = (seriesData[i] / maxNum) * yAxisLen;
                    graphics.push({
                        width: graphicsWidth,
                        height: graphicsHeight,
                        x: x1 + i * average + graphicsX,
                        y: y2,
                    });
                    backgrounds.push({
                        width: graphicsWidth,
                        height: yAxisLen,
                        x: x1 + i * average + graphicsX,
                        y: y2,
                    });
                }
                Object.assign(this, { graphics, backgrounds });
            }
        },
    },
};

function calculatePixel(padding, totalPixel) {
    return Number(padding)
        ? padding
        : ((Number(padding.replace('%', '')) >>> 0) / 100) * totalPixel;
}
</script>

<style>
.graph-item:hover {
    opacity: 0.9;
}
</style>
