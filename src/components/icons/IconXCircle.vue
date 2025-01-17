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
			d="M12.2899 22.5071C17.8128 22.5071 22.2899 18.0299 22.2899 12.5071C22.2899 6.98423 17.8128 2.50708 12.2899 2.50708C6.76707 2.50708 2.28992 6.98423 2.28992 12.5071C2.28992 18.0299 6.76707 22.5071 12.2899 22.5071Z"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M15.2899 9.50708L9.28992 15.5071"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M9.28992 9.50708L15.2899 15.5071"
			stroke="black"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</template>

<style scoped>
svg:hover {
	cursor: pointer;
}
svg path {
	stroke: var(--color-border);
	/* stroke-width: 1; */
}
svg:hover path::before {
	transition: 0.4s;
}
svg:hover path {
	stroke: var(--color-red-orange);
	transition: 0.4s;
}
@media (prefers-color-scheme: dark) {
	svg path {
		stroke: var(--color-button-border);
	}
}
</style>
