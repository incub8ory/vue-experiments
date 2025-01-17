<template>
	<h3>{{ increaseByOne }}</h3>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		// clickCounter() {
		// 	return this.$store.state.counter;
		// },

		// doubleCount() {
		// 	return this.$store.getters.doubleBonus;
		// },

		// use mapGetters instead of the above
		// just to gain access to $store
		// syntax if module not namespaced
		// ...mapGetters(['increaseByOne']),

		...mapGetters('counterCalculations', ['increaseByOne']),

		// ...mapGetters({
		// 	countByOne: 'counterCalculations/increaseByOne'
		// })
	},

};
</script>
