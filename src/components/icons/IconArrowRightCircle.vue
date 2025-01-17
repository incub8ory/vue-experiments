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
			d="M12.08 22.4023C17.6028 22.4023 22.08 17.9252 22.08 12.4023C22.08 6.8795 17.6028 2.40234 12.08 2.40234C6.55711 2.40234 2.07996 6.8795 2.07996 12.4023C2.07996 17.9252 6.55711 22.4023 12.08 22.4023Z"
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12.08 16.4023L16.08 12.4023L12.08 8.40234"
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M8.07996 12.4023H16.08"
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
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
