<template>
    <view class="home-page-wrapper">
        <view class="card-wrapper">
            <view class="left-wrapper">
                <view class="name">{{ user.name|empty }}</view>
                <view class="career">{{ user.position|empty }}</view>
                <view class="phone">
                    <image class="image-32" src="/static/icon/phone-gray.png"></image>
                    <view class="text">{{ user.phone|empty }}</view>
                </view>
                <view class="address">
                    <image class="image-32" src="/static/icon/bussiness.png"></image>
                    <view class="text">{{ user.address|empty }}</view>
                </view>
            </view>
            <view class="right-wrapper">
                <img class="person-img" src="/static/img/wuchangping.png" mode="scaleToFill">
            </view>
        </view>

        <view class="info-wrapper">
            <view class="field" @click="doCallPhone">
                <view class="label">电话</view>
                <view class="value">{{ user.phone|empty }}</view>
                <image class="image-48" src="/static/icon/phone-color.png"></image>
            </view>
            <view class="field">
                <view class="label">微信</view>
                <view class="value">{{ user.weiXin|empty }}</view>
                <image class="image-48" src="/static/icon/wechat.png"></image>
            </view>
            <view class="field">
                <view class="label">邮箱</view>
                <view class="value">{{ user.email|empty }}</view>
                <image class="image-48" src="/static/icon/letter.png"></image>
            </view>
            <view class="field">
                <view class="label">地址</view>
                <view class="value">{{ user.address|empty }}</view>
                <image class="image-48" src="/static/icon/position.png"></image>
            </view>
        </view>

        <view class="btn-wrapper" @click="doSavePhone">保存到手机</view>
    </view>
</template>
<script lang="ts" src="./Home.ts"></script>
<style lang="scss">
.home-page-wrapper {
    padding: 24rpx;
    width: 100%;
    box-sizing: border-box;
    .card-wrapper {
        height: 400rpx;
        background-color: #c0c0c0;
        border-radius: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 4rpx 4rpx 4rpx 0rpx #ccc;
        .left-wrapper {
            flex: 1;
            height: 400rpx;
            background-color: #3F536E;
            position: relative;
            &::before {
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                z-index: 0;
                right: -118rpx;
                top: 0;
                bottom: 0;
                border-right: 120rpx solid transparent;
                border-bottom: 400rpx solid #3F536E;
            }

            .name {
                font-size: 50rpx;
                color: #ffffff;
                margin-top: 60rpx;
                margin-left: 30rpx;
            }
            .career {
                font-size: 38rpx;
                color: #ffffff;
                margin-top: 16rpx;
                margin-left: 30rpx;
                font-weight: 400;
            }
            .phone {
                margin-top: 60rpx;
            }
            .address {
                margin-top: 10rpx;
            }
            .phone, .address {
                display: flex;
                height: 36rpx;
                align-items: center;
                margin-left: 30rpx;
                .text {
                    margin-left: 10rpx;
                    font-size: 28rpx;
                    color: #ffffff;
                }
            }
        }
        .right-wrapper {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            height: 400rpx;
            background-color: #FFFFFF;
            .person-img {
                width: 100%;
                height: 400rpx;
            }
        }
    }
    .info-wrapper {
        margin-top: 40rpx;
        padding-left: 24rpx;
        .label {
            font-size: 36rpx;
        }
        .field {
            height: 100rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 2rpx solid #f2f2f2;
            font-size: 32rpx;
        }
    }
    .btn-wrapper {
        border-radius: 8rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
        font-size: 32rpx;
        background-color: #24a19c;
        margin-top: 48rpx;
    }
}
</style>
