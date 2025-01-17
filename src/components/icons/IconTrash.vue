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
			d="M3 6.71191H5H21"
			stroke="black"
			stroke-width="1"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M19 6.71191V20.7119C19 21.2423 18.7893 21.7511 18.4142 22.1261C18.0391 22.5012 17.5304 22.7119 17 22.7119H7C6.46957 22.7119 5.96086 22.5012 5.58579 22.1261C5.21071 21.7511 5 21.2423 5 20.7119V6.71191M8 6.71191V4.71191C8 4.18148 8.21071 3.67277 8.58579 3.2977C8.96086 2.92263 9.46957 2.71191 10 2.71191H14C14.5304 2.71191 15.0391 2.92263 15.4142 3.2977C15.7893 3.67277 16 4.18148 16 4.71191V6.71191"
			stroke="black"
			stroke-width="1"
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
	stroke-width: 2;
}
.icon:hover path::before {
	transition: 0.4s;
}
.icon:hover path {
	stroke: var(--color-red-orange);
	transition: 0.4s;
}
@media (prefers-color-scheme: dark) {
	.icon path {
		stroke: var(--vt-c-text-dark-2);
	}
}
</style>
