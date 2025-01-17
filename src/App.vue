<template>
	<!-- <the-navigation @set-page="setActivePage"></the-navigation> -->
	<div class="outer-container">
		<div class="main-container">
			<the-navigation></the-navigation>
			<main>
				<!-- <component :is="activePage"></component> -->
				<router-view></router-view>
				<!-- <router-view v-slot="slotProps">
					<transition name="route" mode="out-in">
						<component :is="slotProps.Component"></component>
					</transition>
				</router-view> -->
			</main>
		</div>

		<footer>
			<router-view name="footer"></router-view>
			<!-- <DefaultFooter></DefaultFooter> -->
		</footer>
	</div>
</template>

<script>
// import TeamsList from './components/teams/TeamsList.vue';
// import UsersList from './components/members/UsersList.vue';
import TheNavigation from './components/nav/TheNavigation.vue';
import DefaultFooter from './components/layouts/DefaultFooter.vue';

export default {
	components: {
		TheNavigation,
		DefaultFooter,
		// TeamsList,
		// UsersList,
	},
	data() {
		return {
			// activePage: 'teams-list',
			
			teams: [
				{
					id: 't1',
					name: 'Frontend Engineers',
					members: ['u1', 'u2', 'u8', 'u10'],
				},
				{
					id: 't2',
					name: 'Backend Engineers',
					members: ['u1', 'u2', 'u3', 'u7'],
				},
				{ id: 't3', name: 'Client Consulting', members: ['u4', 'u5'] },
				{ id: 't4', name: 'DevOps', members: ['u9'] },
			],
			users: [
				{
					id: 'u1',
					iconId: 'face',
					fullName: 'Max Schwarzmüller',
					role: 'Engineer',
				},
				{
					id: 'u2',
					iconId: 'face_5',
					fullName: 'Praveen Kumar',
					role: 'Engineer',
				},
				{
					id: 'u3',
					iconId: 'face',
					fullName: 'Shohei Ohtani',
					role: 'Engineer',
				},
				{
					id: 'u4',
					iconId: 'face_6',
					fullName: 'Alex Blackfield',
					role: 'Consultant',
				},
				{
					id: 'u5',
					iconId: 'face_4',
					fullName: 'Marie Smith',
					role: 'Consultant',
				},
				{
					id: 'u6',
					iconId: 'face_3',
					fullName: 'Julie Jones',
					role: 'Engineer',
				},
				{
					id: 'u7',
					iconId: 'face_5',
					fullName: 'Aaron Judge',
					role: 'Engineer',
				},
				{
					id: 'u8',
					iconId: 'face_2',
					fullName: 'Hello Kitty',
					role: 'Engineer',
				},
				{
					id: 'u9',
					iconId: 'face_5',
					fullName: 'Shigeru Ishiba',
					role: 'Engineer',
				},
				{
					id: 'u10',
					iconId: 'face_6',
					fullName: 'Elmo',
					role: 'Engineer',
				},
			],
		};
	},
	provide() {
		return {
			teaData: this.teaData,
			teams: this.teams,
			users: this.users,
			engineersInUsers: this.engineersInUsers,
			consultantsInUsers: this.consultantsInUsers,
		};
	},
	computed: {
		engineersInUsers() {
			return this.users.filter((user) => user.role === 'Engineer');
		},
		consultantsInUsers() {
			return this.users.filter((user) => user.role === 'Consultant');
		},
	},
	// methods: {
	// setActivePage(page) {
	//   this.activePage = page;
	//   console.log('activePage: ' + this.activePage);
	// },
	// },
};
</script>

<style scoped>
* {
	box-sizing: border-box;
}

html {
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
}

body {
	margin: 0;
}
.outer-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
}
</style>
