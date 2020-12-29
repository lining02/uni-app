<template>
    <div class="triangle">
        <div class="row">
            <div class="lable">
                <span>方向</span>
                <i></i>
            </div>
            <div>：</div>
            <van-radio-group v-model="initData.direction" @change="onChange">
                <van-radio
                    v-for="item in directionList"
                    :key="item.id"
                    :name="item.id"
                >
                    {{ item.name }}
                </van-radio>
            </van-radio-group>
        </div>
        <div class="row">
            <div class="lable">
                <span>宽度</span>
                <i></i>
            </div>
            <div>：</div>
            <van-slider
                v-model="initData.width"
                :min="0"
                :max="300"
                :step="1"
                use-button-slot
                @drag="e => onDrag(e, 'width')"
            >
                <view slot="button" class="custom-button">
                    {{ initData.width }}/300
                </view>
            </van-slider>
        </div>
        <div class="row">
            <div class="lable">
                <span>高度</span>
                <i></i>
            </div>
            <div>：</div>
            <van-slider
                v-model="initData.height"
                :min="0"
                :max="300"
                :step="1"
                use-button-slot
                @drag="e => onDrag(e, 'height')"
            >
                <view slot="button" class="custom-button">
                    {{ initData.height }}/300
                </view>
            </van-slider>
        </div>
        <div class="row">
            <div class="lable">
                <span>旋转角度</span>
                <i></i>
            </div>
            <div>：</div>
            <van-slider
                v-model="initData.angle"
                :min="-360"
                :max="360"
                :step="1"
                use-button-slot
                @drag="e => onDrag(e, 'angle')"
            >
                <view slot="button" class="custom-button">
                    {{ initData.angle }}/360
                </view>
            </van-slider>
        </div>
        <div class="row">
            <div class="lable">
                <span>背景色</span>
                <i></i>
            </div>
            <div>：</div>
            <input id="" v-model="initData.color" type="color" name="" />
        </div>
        <div class="to-be-triangle">
            <div class="little-triangle" :style="triangleStyle"></div>
        </div>
        <div class="code" v-html="triangleHtml"></div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { InitData, Direction, DirectionList } from './triangle'
@Component({})
export default class Triangle extends Vue {
    initData: InitData = {
        width: 100,
        height: 100,
        angle: 0,
        direction: 'top',
        color: '#000'
    }
    directionList: Direction[] = [
        {
            name: '上',
            id: 'top'
        },
        {
            name: '下',
            id: 'bottom'
        },
        {
            name: '左',
            id: 'left'
        },
        {
            name: '右',
            id: 'right'
        }
    ]
    onChange(e: any): void {
        this.initData.direction = e.detail
    }
    onDrag(e: any, key: string): void {
        this.initData[key] = e.detail.value
    }

    get borderWidth(): string {
        let { width: w, height: h, direction } = this.initData
        const borderWidths: DirectionList = {
            top: `border-width: 0 ${w / 2}px ${h}px ${w / 2}px;`,
            bottom: `border-width: ${h}px ${w / 2}px 0 ${w / 2}px;`,
            left: `border-width: ${h / 2}px ${w}px ${h / 2}px 0;`,
            right: `border-width: ${h / 2}px 0 ${h / 2}px ${w}px;`
        }
        return borderWidths[direction]
    }
    get borderColor(): string {
        let { width: w, height: h, direction, color } = this.initData
        const borderColors: DirectionList = {
            top: `border-color:transparent transparent ${color} transparent;`,
            bottom: `border-color:${color} transparent transparent transparent;`,
            left: `border-color:transparent ${color} transparent transparent;`,
            right: `border-color:transparent transparent transparent ${color};`
        }
        let padding = `padding-top: ${150 - h / 2}px;`
        return padding + borderColors[direction]
    }
    get triangleStyle(): string {
        let { angle } = this.initData
        return (
            this.borderWidth +
            this.borderColor +
            `transform: rotate(${angle}deg);`
        )
    }
    get triangleHtml(): string {
        let html = `
        {<br/>
            &ensp; &ensp; width: 0px;<br/>
            &ensp; &ensp; height: 0px;<br/>
            &ensp; &ensp; border-style: solid;<br/>
            &ensp; &ensp; margin: 0 auto;<br/>
        `
        let { angle } = this.initData
        let borderWidth = `&ensp; &ensp;${this.borderWidth}<br/>`
        let borderColor = `&ensp; &ensp;${this.borderColor}<br/>`
        const rotate = `&ensp; &ensp;transform: rotate(${angle}deg);<br/>`
        return html + borderWidth + borderColor + rotate + ' }'
    }
}
</script>
<style scoped lang="less">
.triangle {
    padding: 0 16px;
    .row {
        display: flex;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ebedf0;
        .lable {
            width: 80px;
            text-align: justify;
            i {
                display: inline-block;
                width: 78px;
            }
        }
    }
}

input {
    margin: 10px 0 0 10px;
}
/deep/ van-slider {
    width: 100%;
    flex: 1;
    margin: 20px 0 0 10px;
}
/deep/ van-radio-group {
    display: flex;
    align-items: center;
    margin: 0 0 0 5px;
    van-radio {
        margin: 0 5px;
    }
}
// /deep/ van-radio-group
.to-be-triangle {
    width: 300px;
    height: 300px;
    margin: 20px auto;
    background: #eee;
    background-image: linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.2) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.2) 0
        ),
        linear-gradient(
            45deg,
            rgba(0, 0, 0, 0.2) 25%,
            transparent 0,
            transparent 75%,
            rgba(0, 0, 0, 0.2) 0
        );
    background-size: 30px 30px;
    background-position: 0 0, 15px 15px;
    .little-triangle {
        width: 0px;
        height: 0px;
        border-style: solid;
        margin: 0 auto;
    }
}

.custom-button {
    background: #1989fa;
    border-radius: 20px;
    font-size: 12px;
    color: #fff;
    height: auto;
    line-height: 1;
    padding: 2px;
}
.code {
    width: 311px;
    height: 224px;
    background: #ebedf0;
    margin: 0 auto;
    padding: 16px;
    border-radius: 4px;
}
</style>
