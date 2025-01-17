<template>
	<!-- <h3>{{ counter }}</h3> -->
	<p class="mono">Normalized: {{ counter }}</p>
</template>

<script>
export default {
	computed: {
		counter() {
			// syntax if all modules are not namespaced
			// return this.$store.getters.normalizedBonus;

			// syntax to access namespaced module
			return this.$store.getters['counterCalculations/normalizedBonus'];
		},
	},
};
</script>
