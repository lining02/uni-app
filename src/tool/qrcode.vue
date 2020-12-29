<template>
    <div class="qrcode">
        <textarea v-model="qrData.text" rows="3"></textarea>
        <div class="row">
            <div class="col">
                <div class="lable">
                    尺寸：
                </div>
                <input v-model="qrData.size" type="text" />
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="lable">
                    前景色：
                </div>
                <input v-model="qrData.foreground" type="text" />
            </div>
            <div class="col">
                <div class="lable">
                    后景色：
                </div>
                <input v-model="qrData.background" type="text" />
            </div>
        </div>
        <div class="row">
            <div class="lable">
                图标：
            </div>
            <van-radio-group v-model="qrData.icon" @change="onChange">
                <van-radio name="none">
                    无
                </van-radio>
                <van-radio name="default">
                    默认
                </van-radio>
            </van-radio-group>
        </div>
        <van-button type="default" @click="toQrcode">
            生成QR图
        </van-button>
        <canvas canvas-id="canvas-id" :style="canvasStyle"></canvas>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { QrData, QrcodeData, EventDatail } from './qrcode'
var QRCode = require('../static/weapp.qrcode')
@Component({})
export default class Qrcode extends Vue {
    qrData: QrData = {
        size: 100,
        foreground: '#f00',
        background: '#fff',
        icon: 'none',
        text: '在输入框里输入一些内容，就能生成二维码了哦~'
    }
    fileList = []
    canvasStyle = ''
    onChange(e: EventDatail): void {
        this.qrData.icon = e.detail
    }
    toQrcode(): void {
        let { size, text, foreground, background, icon } = this.qrData
        if (text === '') {
            return uni.showToast({
                icon: 'none',
                title: '在输入框里输入一些内容，就能生成二维码了哦~'
            })
        }
        let qrcode: QrcodeData = {
            width: size,
            height: size,
            foreground,
            background,
            canvasId: 'canvas-id',
            text
        }
        this.canvasStyle = `width: ${size}px;height: ${size}px;`
        icon !== 'none' &&
            (qrcode.image = {
                imageResource: require('../static/logo.png'),
                dx: 0.35 * size,
                dy: 0.35 * size,
                dWidth: 0.3 * size,
                dHeight: 0.3 * size
            })

        QRCode(qrcode)
    }
}
</script>
<style lang="less" scoped>
.qrcode {
    padding: 16px;
    textarea {
        margin: 0 0 20px 0;
        border: 1px solid #ebedf0;
    }
    .row {
        display: flex;
        height: 40px;
        line-height: 40px;
        .col {
            width: 50%;
            display: flex;
            input {
                width: 80px;
                border: 1px solid #ebedf0;
                padding: 5px;
            }
        }
    }
    /deep/ van-radio-group {
        display: flex;
        align-items: center;
        margin: 0 0 0 5px;
        van-radio {
            margin: 0 5px;
        }
    }
}
canvas {
    width: auto;
    height: auto;
}
</style>
