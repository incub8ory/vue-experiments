<template>
	<!-- <BaseButton v-if="!this.$store.state.isLoggedIn" @click="toggleAuth" variant="rounded"
		>Log in</BaseButton
	> -->
	<BaseButton v-if="!isLoggedIn" @click="toggleAuth" variant="rounded"
		>Log in</BaseButton
	>
	<BaseButton v-if="isLoggedIn" @click="toggleAuth" variant="rounded"
		>Log out</BaseButton
	>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';

import { mapActions } from 'vuex';

export default {
	data() {
		return {
			// add data
		};
	},
	components: {
		BaseButton,
	},
	computed: {
		isLoggedIn() {
			return this.$store.getters.toggleAuth;
		},
	},
	methods: {
		// toggleAuth() {
		// 	//     this.$store.state.isLoggedIn = !this.$store.state.isLoggedIn;
		// 	//     // console.log(this.$store.state.isLoggedIn);

		// 	this.$store.commit('toggleAuth');
		// },
		...mapActions(['toggleAuth']),
	},
};
</script>
<style scoped>
button {
	width: 160px;
}
</style>
