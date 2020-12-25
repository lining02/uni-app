<template>
    <div class="content">
        <div class="item" @click="to('/tool/triangle')">
            三角形
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {
            title: 'Hello'
        }
    },
    onLoad() {},
    methods: {
        to(url: string) {
            uni.navigateTo({ url })
        }
    }
})
</script>

<style>
.content {
    padding: 0 16px;
}

.item {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ebedf0;
}
</style>
