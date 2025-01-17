<template>
	<svg
		class="icon"
		width="25"
		height="25"
		viewBox="0 0 24 25"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M11.9917 22.6807C17.5145 22.6807 21.9917 18.2035 21.9917 12.6807C21.9917 7.15782 17.5145 2.68066 11.9917 2.68066C6.46885 2.68066 1.9917 7.15782 1.9917 12.6807C1.9917 18.2035 6.46885 22.6807 11.9917 22.6807Z"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M7.9917 14.6807C7.9917 14.6807 9.4917 16.6807 11.9917 16.6807C14.4917 16.6807 15.9917 14.6807 15.9917 14.6807"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M8.9917 9.68066H9.0017"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M14.9917 9.68066H15.0017"
			:stroke="strokeColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<script>
export default {
	props: ['strokeColor'],
};
</script>
<style scoped>
.icon:hover {
	cursor: pointer;
}
/* .icon path {
	stroke: var(--vt-c-text-light-2);
	stroke-width: 1;
} */
@media (prefers-color-scheme: dark) {
	/* .icon path {
		stroke: var(--vt-c-text-dark-2);
	} */
}
</style>
