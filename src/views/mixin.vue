<template>
	<div style="display: flex; flex-direction: column; width: 100%;
    height: 100%; overflow: hidden;">
		<div class='Mouse'>Mouse position: x {{ x }} / y {{ y }}</div>
	  <div class="main">
	  	<div class='menu_con'>
	  		<div class="menu">
	  			<ul>
	  				<li>111111111</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>sasdasda</li>
	  				<li>99999999</li>
	  			</ul>
	  		</div>
	  	</div>
	  	<div class="content"></div>
	  </div>
	  </div>
	</div>
</template>
<script>
	import xxx from '@/mixin/key.js'
	export default {
	  mixins: [xxx],
	  data () {
	  	return {
	  		a1: 0,
	  		a2: 0,
	  	}
	  },
	  methods: {
	  	add(num1, num2) {
			  const num1Digits = (num1.toString().split('.')[1] || '').length;
			  const num2Digits = (num2.toString().split('.')[1] || '').length;
			  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
			  return (num1 * baseNum + num2 * baseNum) / baseNum;
			}
	  },
	  mounted () {
	  	let s = this.add(0.1, 0.2)
	  	console.log(s === 0.3) // true
	  }
	}
</script>
<style lang="scss">
	.Mouse {
		width:100%;
		height:30px;
		background: red;
		line-height: 30px;
		text-align: center;
	}
	.main {
		flex: 1;
		// width:100%;
		// height:100%;
		display:flex;
		flex-direction: row;
		.menu_con {
			width:230px;
			overflow: hidden;
			.menu {
				height:calc(100% - 46px);
				width:230px;
				background:green;
				border-radius: 12px;
				margin: 8px;
				overflow: auto;
			}
		}
		.content {
			flex: 1;
			background:#456cab;
			margin: 8px 8px 8px 16px;
			border-radius: 12px;
		}
	}
</style>
