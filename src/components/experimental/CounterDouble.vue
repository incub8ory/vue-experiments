<template>
	<!-- <p class="mono">2x bonus: {{ bonusCount }}</p> -->
	<p class="mono">2x bonus: {{ doubleBonus }}</p>
</template>

<script>
import { mapGetters } from 'vuex';
// import { mapActions } from 'vuex';

export default {
	// methods: {
	// 	...mapActions(['increment']),
	// },
	computed: {
		// bonusCount() {
		// 	return this.$store.getters.doubleBonus;
		// },

		// syntax if module not namespaced
		// ...mapGetters(['doubleBonus']),

		// syntax if namespaced module
		...mapGetters('counterCalculations', ['doubleBonus']),
	},
};
</script>
