<template>
	<div class='container'>
		<h2>Teams</h2>
	</div>
	<ul>
		<teams-item
			v-for="team in teams"
			:key="team.id"
			:id="team.id"
			:name="team.name"
			:member-count="team.members.length"
		></teams-item>
	</ul>
</template>

<script>
import TeamsItem from '../components/teams/TeamsItem.vue';

export default {
	components: {
		TeamsItem,
	},
	inject: ['teams'],
};
</script>

<style scoped>
.container {
	padding: 40px;
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
ul {
	list-style: none;
	padding: 0;
	margin: 0 auto;
	display: flex;
	box-sizing: border-box;
	gap: 16px 0;
	flex-wrap: wrap;
	max-width: 960px;
	justify-items: center;
}
/* .experimental-list {
	display: block;
} */
</style>
