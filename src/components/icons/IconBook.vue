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
			d="M4.27734 20.2436C4.27734 19.5805 4.54074 18.9447 5.00958 18.4758C5.47842 18.007 6.1143 17.7436 6.77734 17.7436H20.2773"
			stroke="black"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M6.77734 2.74358H20.2773V22.7436H6.77734C6.1143 22.7436 5.47842 22.4802 5.00958 22.0113C4.54074 21.5425 4.27734 20.9066 4.27734 20.2436V5.24358C4.27734 4.58053 4.54074 3.94465 5.00958 3.47581C5.47842 3.00697 6.1143 2.74358 6.77734 2.74358Z"
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
