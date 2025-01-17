<template>
	<div class="tabnav">
		<ul>
			<slot> </slot>
			<!-- <li>
				<TabButton :state="active">Tab label</TabButton>
			</li>
			<li>
				<TabButton>Tab label</TabButton>
			</li> -->
		</ul>
	</div>
</template>

<script>

export default {
	data() {
		return {
			activeTab: 'my-resources',
		};
	},
	methods: {
		setActiveTab(tab) {
			this.activeTab = tab;
		},
	},
};
</script>

<style scoped>
ul,
li {
	list-style: none;
	padding: 0;
	margin: 0;
}
ul {
	display: flex;
	gap: 40px;
	padding-left: 40px;
	padding-right: 40px;
}
.tabnav { 
	padding-top: 24px;
	/* margin-bottom: 24px; */
	border-bottom: 1px dotted var(--vt-c-divider-light-2);
	width: 100%;
}

@media (prefers-color-scheme: dark) {
	.tabnav {
		border-bottom: 1px dotted var(--vt-c-divider-dark-2);
	}
}
</style>
