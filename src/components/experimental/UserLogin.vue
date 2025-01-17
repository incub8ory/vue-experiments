<template>
	<BaseButton v-if="!isAuth" @click="logIn" variant="rounded"
		>Log in</BaseButton
	>
	<BaseButton v-if="isAuth" @click="logOut" variant="rounded"
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
		isAuth() {
			return this.$store.getters.userIsAuthenticated;
		},
	},
	methods: {
        ...mapActions(['logIn', 'logOut']),
	},
};
</script>
<style scoped>
button {
	width: 160px;
}
</style>
