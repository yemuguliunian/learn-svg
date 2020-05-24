<template>
    <svg
        version="1.1"
        id="L2"
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="180"
        viewBox="0 0 100 100"
    >
        <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="48" />
        <circle fill="#fff" stroke-width="0" cx="50" cy="50" r="3.5" />
        <line
            id="hour"
            stroke-linecap="round"
            stroke="#fff"
            stroke-width="4"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="50"
            y2="30"
            :transform="`rotate(${hourPointerRotate} 50 50)`"
        />
        <line
            id="minute"
            stroke-linecap="round"
            stroke="#fff"
            stroke-width="3"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="50"
            y2="15"
            :transform="`rotate(${minutePointerRotate} 50 50)`"
        />
        <line
            id="second"
            stroke-linecap="round"
            stroke="#fff"
            stroke-width="1"
            stroke-miterlimit="10"
            x1="50"
            y1="50"
            x2="50"
            y2="13"
            :transform="`rotate(${secondPointerRotate} 50 50)`"
        />
    </svg>
</template>

<script>
export default {
    data() {
        const {
            hourPointerRotate,
            minutePointerRotate,
            secondPointerRotate,
        } = this.calculateRotate();
        return {
            hourPointerRotate,
            minutePointerRotate,
            secondPointerRotate,
        };
    },

    mounted: function () {
        this.timer = setInterval(() => {
            const {
                hourPointerRotate,
                minutePointerRotate,
                secondPointerRotate,
            } = this.calculateRotate();
            Object.assign(this, {
                hourPointerRotate,
                minutePointerRotate,
                secondPointerRotate,
            });
        }, 1000);
    },
    beforeDestroy: function () {
        this.timer && clearInterval(this.timer);
    },
    methods: {
        calculateRotate() {
            const date = new Date();
            const hour = date.getHours() % 12;
            const minute = date.getMinutes();
            const second = date.getSeconds();
            const scales = 12 * 60 * 60;

            return {
                hourPointerRotate: (hour + minute / 60 + second / 60 / 60) * 30,
                minutePointerRotate: (minute + second / 60) * 6,
                secondPointerRotate: second * 6,
            };
        },
    },
};
</script>
