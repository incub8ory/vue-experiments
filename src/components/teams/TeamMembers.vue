<!-- Members list view dynamically handled by passing params as props -->
<!-- See TeamMembersRoute.vue for alternative dynamic routing -->

<template>
	<SubNav class="mono"
		><router-link :to="{ name: 'teams' }">Teams</router-link> /
		{{ teamName }}</SubNav
	>
	<section>
		<h2>{{ teamName }}</h2>
		<p v-if="notFound">
			We couldn&rsquo;t find a team with the ID {{ enteredId }}. Try browsing
			through <router-link :to="{ name: 'teams' }">all teams</router-link>.
		</p>
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
	props: ['teamId'],
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
			notFound: false,
			enteredId: '',
		};
	},
	methods: {
		loadTeamMembers(teamId) {
			const selectedTeam = this.teams.find((team) => team.id === teamId);

			if (!selectedTeam) {
				this.teamName = 'Team ID: ' + teamId.toUpperCase() + ' not found';
				this.notFound = true;
				this.enteredId = teamId.toUpperCase();
			} else {
				const members = selectedTeam.members;
				const selectedMembers = [];
				for (const member of members) {
					const selectedUser = this.users.find((user) => user.id === member);
					selectedMembers.push(selectedUser);
				}

				this.members = selectedMembers;
				this.teamName = selectedTeam.name;
				this.notFound = false;
				this.enteredId = '';
			}
		},
	},
	created() {
		this.loadTeamMembers(this.teamId);
	},
	// beforeRouteUpdate(to, from, next) {
	// 	// lifecycle hook can be used instead of watch as a route handler
	// 	console.log('Team members component beforeRouteUpdate');
	// 	console.log('to: ' + to, 'from: ' + from);
	// 	this.loadTeamMembers(to.params.teamId);
	// 	next();
	// },
	watch: {
		teamId(newId) {
			this.loadTeamMembers(newId);
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
p a {
	color: var(--color-green);
	border-bottom: 1px solid var(--color-green);
}

ul {
	list-style: none;
	margin: 0;
	padding: 0;
}
</style>
