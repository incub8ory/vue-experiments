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
			d="M12.0654 22.3403C17.5883 22.3403 22.0654 17.8632 22.0654 12.3403C22.0654 6.81748 17.5883 2.34033 12.0654 2.34033C6.54258 2.34033 2.06543 6.81748 2.06543 12.3403C2.06543 17.8632 6.54258 22.3403 12.0654 22.3403Z"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="icon-circle"
		/>

		<path
			d="M12.0654 8.34033V12.3403"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M12.0654 16.3403H12.0754"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>
<style scoped>
.icon path {
	stroke: var(--color-danger-border);
}
.icon path.icon-circle {
	/* fill: #ffffff; */
}

@media (prefers-color-scheme: dark) {
	/* .icon path {
		stroke: var(--vt-c-text-dark-2);
	} */
	.icon path.icon-circle {
		/* fill: #ffffff; */
	}
}
</style>
