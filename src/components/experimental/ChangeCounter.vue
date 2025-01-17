<template>
	<!-- <BaseButton variant="full-width neutral rounded" @click="addTen"
		>+ 10</BaseButton
	> -->
	<BaseButton
		variant="full-width neutral rounded"
		@click="addTen({ value: 10 })"
		>+ 10</BaseButton
	>
</template>
<script>
import BaseButton from '../UI/BaseButton.vue';
import { mapActions } from 'vuex';

export default {
	components: {
		BaseButton,
	},
	methods: {
		// addOne() {
		// 	// this.$store.state.counter ++;

		// 	// this.$store.commit('increment');

		//  // use dispatch with action
		// 	this.$store.dispatch('increment');

		// },

		// addTen() {
		// 	// increment store directly
		// 	// this.$store.state.counter ++;

		// 	// use payload to pass data mutations
		// 	// this.$store.commit('increaseBySomeValue', { value: 10});

		// 	// alt syntax for payload mutations
		// 	// this.$store.commit({
		// 	// 	type: 'increaseBySomeValue',
		// 	// 	value: 10,
		// 	// });

		// 	// syntax for methods that use actions to handle async functions
		// 	this.$store.dispatch({
		// 		type: 'increaseBySomeValue',
		// 		value: 10,
		// 	});
		// },

		// use mapActions instead of above
		// ...mapActions(['increaseBySomeValue']),

		// syntax for using keys as an actions alias
		// and not namespaced
		// ...mapActions({
		// 	addTen: 'increaseBySomeValue',
		// }),

		// syntax if namespaced module
		...mapActions('counterCalculations', {
			addTen: 'increaseBySomeValue',
		}),
	},
};
</script>
