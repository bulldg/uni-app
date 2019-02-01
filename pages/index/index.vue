<template>
  <view class="center">
		<view>手机号:{{userInfo.mobile}}</view>
		<view>会员等级:{{userInfo.member_level}}</view>
		<view>会员号:{{userInfo.member_code}}</view>
		<view>姓名:{{userInfo.name}}</view>
  </view>
</template>

<script>
	import { showLoading, hideLoading, showError } from '../../utils/notify';
	import { whiteRightArrow, grayRightArrow, lock, cancel } from '../../utils/icons';
	import { getMemberInfo } from '../../utils/service';
	
	export default {
		data() {
			return {
				isVip: true,
				userInfo: {
					member_code: '******',
					member_level: 'W1',
				},
				icons: {
					whiteRightArrow: whiteRightArrow,
					grayRightArrow: grayRightArrow,
					lock: lock,
					cancel: cancel,
				},
			};
		},
		onLoad() {
			this.getInfo(1);
		},
		methods: {
			getInfo(loading) {
				if(loading) {
					showLoading();
				}
				getMemberInfo({
					data: {
						isJump: false
					},
					success: res => {
						this.userInfo =  res.data;
						console.log(this.userInfo);
					},
					fail: err => {
						showError(err);
					},
				})
			},
		}
	}
</script>

<style lang="less" scoped>
</style>
