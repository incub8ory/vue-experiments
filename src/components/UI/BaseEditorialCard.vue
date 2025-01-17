<template>
	<div class="card">
		<slot></slot>
	</div>
</template>

<style scoped>
div.card {
	padding: 24px 40px;
	/* box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px; */
	border-radius: 3px;
	border: 1px solid var(--color-border);
}
div.card:hover {
	border-radius: 3px;
	border: 1px solid var(--color-border);
}
</style>
