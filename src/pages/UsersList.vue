<template>
	<!-- <div class='test-section'>
		<BaseButton type='submit' variant='rounded' @click='saveChanges'>Confirm</BaseButton>
	</div> -->
	<header class="container">
		<h2>Members</h2>
	</header>
	<div>
		<section class="users-list">
			<h3>
				Engineers <span class="mono">{{ engineersInUsers.length }}</span>
			</h3>
			<ul>
				<user-item
					v-for="user in engineersInUsers"
					:key="user.id"
					:name="user.fullName"
					:role="user.role"
					:iconId="user.iconId"
				></user-item>
			</ul>
		</section>
		<section class="users-list">
			<h3>
				Consultants <span class="mono">{{ consultantsInUsers.length }}</span>
			</h3>
			<ul>
				<user-item
					v-for="user in consultantsInUsers"
					:key="user.id"
					:name="user.fullName"
					:role="user.role"
					:iconId="user.iconId"
				></user-item>
			</ul>
		</section>
	</div>
</template>

<script>
import BaseButton from '../components/UI/BaseButton.vue';
import UserItem from '../components/members/UserItem.vue';

export default {
	components: {
		UserItem,
		BaseButton,
	},
	inject: ['users', 'engineersInUsers', 'consultantsInUsers'],
	data() {
		return {
			changesSaved: false,
		};
	},
	methods: {
		// Added method for beforeRouteLeave example
		saveChanges() {
			this.changesSaved = true;
		},
	},
	beforeRouteEnter(to, from, next) {
		console.log('UsersList component beforeRouteEnter');
		console.log(to, from);
		next();
	},
	// beforeRouteLeave(to, from, next) {
	// 	// can be used to trigger some action before user leaves page
	// 	// for example, saving incomplete form data
	// 	console.log('UsersList component beforeRouteLeave');
	// 	console.log('to: ' + to, 'from: ' + from);
	// 	if (this.changesSaved) {
	// 		next();
	// 	} else {
	// 		// confirm result returns a boolean
	// 		const userWantsToLeave = confirm('Are you sure?');
	// 		next(userWantsToLeave);
	// 	}
	// },
};
</script>

<style scoped>
.container {
	padding: 40px;
}
div {
	display: flex;
	margin: 0 auto;
	padding: 0 40px;
	gap: 40px;
	/* justify-content: center; */
}

h2 {
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
}
.users-list:first-of-type {
	flex-grow: 2;
	/* border: 1px solid #f00; */
}
.users-list h3 {
	font-family: 'Hedvig Letters Serif', serif;
	font-size: 22px;
	padding-bottom: 12px;
	margin-bottom: 24px;
	color: var(--color-heading);
	border-bottom: 1px solid var(--color-border);

	span.mono {
		font-size: 15px;
		padding: 0 8px;
		color: var(--vt-c-black-mute);
		background-color: var(--color-chartreuse-1);
		border-radius: 12px;
		display: inline-block;
		margin-left: 4px;
	}
}
.users-list ul {
	list-style: none;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0 8px;
	/* max-width: 41rem; */

	li {
		min-width: 18rem;
		width: calc(25vw - 40px);
		/* max-width: 20rem; */
	}
}

/*  Added for beforeRouteLeave example  */

/* .test-section {
	flex-direction: row-reverse;
} */
</style>
