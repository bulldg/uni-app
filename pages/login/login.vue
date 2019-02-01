<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view class="login">
			<input type="text" value="" placeholder="请输入手机号码" v-model="mobile"/>
			<input type="text" value="" placeholder="请输入验证码" v-model="captcha"/>
			<text class="send-captcha" @click="sendCaptcha">发送验证码</text>
			<button type="primary" @click="login">登录</button>
		</view>
	</view>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { sendCaptcha, login } from '../../utils/service';

	export default {
		data() {
			return {
				title: 'Hello',
				mobile: '',
				captcha: '',
			}
		},
		computed: {
			...mapGetters(['code']),
		},
		onLoad() {
			console.log(this.code + '11111');
		},
		methods: {
			sendCaptcha() {
				const data = {
					mobile: this.mobile,
				};
				sendCaptcha({
					data,
					success: res => {
						console.log(res);
					},
					fail: err => {
						console.log(err);
					},
				})
			},
			login() {
				const data = {
					mobile: this.mobile,
					captcha: this.captcha || '',
					code: this.code,
					channel: '',
					artificial_num: '',
				};
				login({
					data,
					success: res => {
						console.log(res);
					},
					fail: err => {
						console.log(err);
					},
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.content {
		text-align: center;
		height: 400upx;
		.logo {
			height: 200upx;
			width: 200upx;
			margin: 200upx auto 100upx;
		}
	
		.title {
			font-size: 36upx;
			color: #8f8f94;
		}
		.login {
			position: relative;
			> input {
				height: 90upx;
				line-height: 90upx;
				margin-bottom: 20upx;
				border: 1px solid #ccc;
			}
			> text {
				background-color: green;
				line-height: 90upx;
				height: 90upx;
				position: absolute;
				right: 0upx;
				top: 0upx;
				z-index: 100;
			}
			> button {
				margin-top: 60upx;
			}
		}
	}
</style>
