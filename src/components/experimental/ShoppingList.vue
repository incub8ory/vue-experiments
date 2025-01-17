<template>
	<!-- <SubNav class='mono'>
		<router-link :to="{ name: 'experimental' }">Lab experiments</router-link> / Shopping list
	</SubNav> -->
	<div class="container">
		<h2>List</h2>
		<router-link :to="{ name: 'experimental' }"
			>&larr; Lab experiments</router-link
		>
		<ListData></ListData>
	</div>
</template>
<script>
// import SubNav from '../nav/SubNav.vue';
import ListData from '../experimental/ListData.vue';

export default {
	components: {
		// SubNav,
		ListData,
	},
	inject: ['teams'],
};
</script>
<style scoped>
.container {
	padding: 40px;
}
h2 {
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
	padding-bottom: 40px;
}
.mono a {
	color: var(--color-heading);
}
</style>
