<template>
	<section>
		<h2>{{ title }}</h2>
		<slot></slot>
	</section>
</template>

<script>
export default {
	props: ['title'],
};
</script>

<style scoped>
/* section {
	max-width: 30rem;
	margin: 2rem auto;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
	padding: 1rem;
} */
h2 {
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
	padding-bottom: 40px;
}
</style>
