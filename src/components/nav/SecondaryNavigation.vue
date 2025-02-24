<template>
	<nav class="secondary-nav">
		<router-link :to="{ name: 'experimental' }"> Lab Experiments </router-link>
		&sol; <span>{{ projectID }}</span>
	</nav>
</template>

<script>
export default {
	props: ['projectID'],
};
</script>

<style scoped>
nav.secondary-nav {
	color: var(--color-border-soft);
	border-bottom: 1px dotted var(--color-border-soft);
	display: flex;
	gap: 0 12px;
	margin-bottom: 12px;
	padding-bottom: 12px;
	padding-left: 40px;
	font-feature-settings: 'ss01' on, 'zero' on, 'tnum' on;

	span {
		color: var(--color-border-hover);
	}
	a:hover {
		color: var(--color-heading);
	}
}
</style>
