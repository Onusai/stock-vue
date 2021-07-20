<template>
    <div id="quote-item" :class="data.color">
        {{ data.value }}
    </div>
</template>


<script>
export default {
    name: "ValueCell",
    props: ["data"],
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>


<style scoped>
#quote-item {
    max-width: 70px;
    height: 30px;
    background-color: rgba(0, 0, 0, 0.199);
    display: flex;
    justify-content: center !important;
    align-items: center !important;
}

.w {
    background-color: rgba(0, 0, 0, 0.199) !important;
}

.g {
    background-color: rgba(0, 71, 6, 0.473)  !important;
}

.yg {
    background-color: rgba(61, 126, 0, 0.452)  !important;
}

.y {
    background-color: rgba(128, 128, 0, 0.527)  !important;
}

.r {
    background-color: rgba(128, 0, 0, 0.253)  !important;
}
</style>