<template>
    <view class="mine-page">
        <view class="avatar">
            <open-data type="userAvatarUrl"></open-data>
        </view>
        <view class="tip">
            认识你,很高兴!
        </view>
        <view class="sub-tip">
            一张卡片, 一种记忆
        </view>
        <view class="version">版本号： 0.0.1</view>

    </view>
</template>
<script lang="ts" src="./Mine.ts"></script>
<style lang="scss" scoped>
    .mine-page {
        width: 100%;
        height: 100vh;
        background-color: #f7e7bd;
        position: relative;
        padding-top: 100rpx;

        .avatar {
            width: 160rpx;
            height: 160rpx;
            border-radius: 100%;
            overflow: hidden;
            background-color: #f1f1f1;
            margin: 0 auto;
        }

        .tip {
            text-align: center;
            font-weight: 500;
            font-size: 36px;
            margin-top: 200rpx;
            height: 100rpx;
            line-height: 100rpx;
            color: #c26565;
        }
        .sub-tip {
            text-align: center;
            height: 100rpx;
            line-height: 100rpx;
            color: #a35d6a;
        }

        .version {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 160rpx;
            width: 100%;
            text-align: center;
            font-size: 26rpx;
            color: #cccccc;
        }

    }
</style>