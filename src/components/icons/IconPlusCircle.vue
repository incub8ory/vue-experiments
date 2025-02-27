<template>
	<svg
		class="icon"
		width="25"
		height="25"
		viewBox="0 0 25 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M12.8274 22.2017C18.3502 22.2017 22.8274 17.7246 22.8274 12.2017C22.8274 6.67889 18.3502 2.20174 12.8274 2.20174C7.30454 2.20174 2.82739 6.67889 2.82739 12.2017C2.82739 17.7246 7.30454 22.2017 12.8274 22.2017Z"
			:stroke="iconColor"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12.8274 8.20174V16.2017"
			:stroke="iconColor"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M8.82739 12.2017H16.8274"
			:stroke="iconColor"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<script>
export default {
	// data() {
	// 	return {
	// 		iconColor: 'var(--color-border)',
	// 	};
	// },
	// inject: ['iconColor'],
	props: ['iconColor'],
};
</script>
<style scoped>
.icon:hover {
	cursor: pointer;
}
.icon path {
	stroke: var(--vt-c-text-light-2);
	stroke-width: 1;
}
@media (prefers-color-scheme: dark) {
	.icon path {
		stroke: var(--vt-c-text-dark-2);
	}
}
</style>
