<!-- Members list view via dynamic routing -->
<!-- See TeamMembers.vue for alternate routing via props -->
<template>
	<SubNav class="mono"
		><router-link to="/teams">Teams</router-link> / {{ teamName }}</SubNav
	>
	<section>
		<h2>{{ teamName }}</h2>
		<ul>
			<user-item
				v-for="member in members"
				:key="member.id"
				:name="member.fullName"
				:role="member.role"
				:iconId="member.iconId"
			></user-item>
		</ul>
	</section>
</template>

<script>
import SubNav from '../nav/SubNav.vue';
import UserItem from '../members/UserItem.vue';

export default {
	inject: ['teams', 'users'],
	components: {
		SubNav,
		UserItem,
	},
	data() {
		return {
			// teamName: 'Test',
			// members: [
			//   { id: 'u1', fullName: 'Max Schwarz', role: 'Engineer', iconId: 'face_5'},
			//   { id: 'u2', fullName: 'Max Schwarzmüller', role: 'Engineer', iconId: 'face'},
			// ],
			teamName: '',
			members: [],
		};
	},
	methods: {
		loadTeamMembers(route) {
			// this.$route.path  // ex. /teams/t1
			// const teamId = this.$route.params.teamId;
			const teamId = route.params.teamId;
			const selectedTeam = this.teams.find((team) => team.id === teamId);
			const members = selectedTeam.members;
			const selectedMembers = [];
			for (const member of members) {
				const selectedUser = this.users.find((user) => user.id === member);
				selectedMembers.push(selectedUser);
			}
			this.members = selectedMembers;
			this.teamName = selectedTeam.name;
		},
	},
	created() {
		this.loadTeamMembers(this.$route);
	},
	watch: {
		$route(newRoute) {
			this.loadTeamMembers(newRoute);
		},
	},
};
</script>

<style scoped>
.subnav a,
.subnav a:active,
.subnav a:visited {
	color: var(--color-heading);
}
section {
	margin: 0 auto;
	max-width: 40rem;
	padding: 40px 80px;
	border-radius: 12px;
}
h2 {
	margin: 0 0 2rem 0;
	font-family: 'Hedvig Letters Serif', serif;
	font-weight: 500;
	color: var(--color-heading);
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
