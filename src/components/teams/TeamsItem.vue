<template>
	<li>
		<h3>{{ name }}</h3>
		<div class="team-members" v-if="this.memberCount > 1">
			{{ memberCount }} members
		</div>
		<div class="team-members" v-if="this.memberCount === 1">
			{{ memberCount }} member
		</div>
		<!-- <ButtonLink href="#" variant="">View team</ButtonLink> -->
		<!-- <router-link class="btn" :to="'/teams/' + id">View team</router-link> -->
		<router-link class="btn" :to="teamMembersLink">View team</router-link>
	</li>
</template>

<script>
import ButtonLink from '../UI/ButtonLink.vue';
export default {
	props: ['id', 'name', 'memberCount'],
	components: {
		ButtonLink,
	},
	computed: {
		teamMembersLink() {
			// return '/teams/' + this.id;
			return {
				name: 'team-members',
				params: { teamId: this.id },
				query: { sort: 'asc' }, // here as an example for syntax; does not do anything
			};
		},
	},
};
</script>

<style scoped>
a.btn {
	border: 1px solid var(--color-button-border);
	background-color: transparent;
	color: var(--color-heading);
	font-size: 14px;
	line-height: 18px;
	padding: 12px;
	border-radius: 3px;
	display: flex;
	gap: 8px;
	align-items: center;
	max-height: 45px;
	display: inline-block;
}
a:hover,
a.btn:hover {
	border: 1px solid var(--color-button-border-hover);
	cursor: pointer;
}
li {
	padding: 32px 32px 40px;
	border: 1px solid transparent;
	border-radius: 8px;
	width: 320px;

	&:hover {
		border: 1px dotted var(--color-border);
	}

	h3 {
		color: var(--color-heading);
		font-size: 22px;
		font-family: 'Hedvig Letters Serif', serif;
		line-height: 24px;
		max-width: calc(100% - 40px);
		overflow: hidden;
	}

	.team-members {
		font-variation-settings: tnum on;
		margin: 0.25rem 0 1.5rem;
	}
}

/* li .team-members {
	font-variation-settings: tnum on;
	margin: 0.25rem 0 1.5rem;
} */

a,
a:active,
a:visited {
	color: var(--color-heading);
}
</style>
