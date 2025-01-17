<template>
	<nav class='footer-nav'>
		<p>&copy; {{ getCurrentYear }}. A <a href="https://25x52.site">25x52</a> work in progress.</p>
	</nav>
</template>
<script>
export default {
	computed: {
		getCurrentYear() {
			const d = new Date();
			return d.getFullYear();
		},
	},
};
</script>
<style>
.footer-nav {
    padding: 12px 40px;
    background-color: var(--color-background-soft);
    border-top: 1px solid var(--color-border);
    font-size: 12px;
}
.footer-nav a {
    color: var(--color-heading);
    font-weight: 500;
}
</style>
