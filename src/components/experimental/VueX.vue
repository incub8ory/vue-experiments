<template>
	<div class="container">
		<BaseContainer title="VueX">
			<router-link :to="{ name: 'experimental' }"
				>&larr; Lab experiments</router-link
			>
			<section class="main">
				<UserAuth></UserAuth>
			</section>
			<section class="main" v-if="isLoggedIn">
				<!-- <h3>{{ clickCounter }}</h3> -->
				<CounterDouble></CounterDouble>
				<BonusValue></BonusValue>
				<TheCounter></TheCounter>
				<!-- <BaseButton variant="full-width neutral rounded" @click="addOne"
					>+ 1</BaseButton
				> -->
				<BaseButton variant="full-width neutral rounded" @click="increment"
					>+ 1</BaseButton
				>
				<ChangeCounter></ChangeCounter>
			</section>
		</BaseContainer>
	</div>
</template>

<script>
import BaseContainer from '../experimental/BaseContainer.vue';
import TheCounter from './TheCounter.vue';
import ChangeCounter from './ChangeCounter.vue';
import BaseButton from '../UI/BaseButton.vue';
import CounterDouble from './CounterDouble.vue';
import BonusValue from './BonusValue.vue';
import UserAuth from './UserAuth.vue';

// import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
	components: {
		BaseContainer,
		TheCounter,
		ChangeCounter,
		CounterDouble,
		BaseButton,
		BonusValue,
		UserAuth,
	},
	data() {
		return {
			// isLoggedIn: false,
		};
	},
	computed: {
		// 	clickCounter() {
		// 		return this.$store.state.counter;
		// 	},

		isLoggedIn() {
			return this.$store.getters.toggleAuth;
		},

	},
	methods: {
		// addOne() {
		// 	// this.$store.state.counter ++;

		// 	// this.$store.commit('increment');
		// 	this.$store.dispatch('increment');

		// },
		
		// syntax for non-namespaced module
        // ...mapActions(['increment']),
        
		...mapActions('counterCalculations', ['increment']),
	},
};
</script>

<style scoped>
.container {
	padding: 40px;
}
.main {
	padding: 80px 40px;
	max-width: 480px;
	margin: 0 auto;
	border: 1px solid var(--color-border-soft);
	border-radius: 40px;

	&:first-of-type {
		padding: 0 0 40px 0;
		border: none;
		display: flex;
		justify-content: right;
	}

	h3 {
		font-size: 96px;
		font-weight: 800;
		padding-bottom: 16px;
		font-feature-settings: 'tnum' on, 'ss01' on;
		text-align: center;
		color: var(--color-red-orange);
	}
}
button {
	font-weight: 600;
}
button + button {
	margin-top: 8px;
}
</style>
