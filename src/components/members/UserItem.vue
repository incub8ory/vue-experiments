<template>
	<li>
		<span class="material-symbols-outlined">{{ iconId }}</span>
		<div class="user-info">
			<h3>{{ name }}</h3>
			<!-- <div class="role" :class="roleClass">{{ role }}</div> -->
			<ColorTag :categoryIndex="roleClass">{{ role }}</ColorTag>
		</div>
	</li>
</template>

<script>
import ColorTag from '../UI/ColorTag.vue';
export default {
	props: ['iconId', 'name', 'role', 'categoryIndex'],
	components: {
		ColorTag,
	},
	data() {
		return {};
	},
	computed: {
		roleClass() {
			if (this.role === 'Engineer') {
				return 'cat-6';
			}
			if (this.role === 'Consultant') {
				return 'cat-7';
			}
			return null;
		},
	},
	methods: {},
};
</script>

<style scoped>
li {
	/* margin: 1rem 0;
	border: 1px solid #ccc;
	padding: 1rem; */
	padding: 16px 40px;
	margin-bottom: 8px;
	border-radius: 8px;
	border: 1px dotted var(--color-border);
	display: flex;
	gap: 16px;
	align-content: baseline;
}

h3 {
	/* margin: 0.5rem 0; */
	font-size: 18px;
	font-weight: 600;
	color: var(--color-heading);
	line-height: 1;
	padding-top: 4px;
}
.material-symbols-outlined {
	font-size: 24px;
	color: var(--color-text);
}

/* .role {
	border-radius: 40px;
	background-color: #ccc;
	color: #252525;
	padding: 0.25rem 1rem;
	display: inline-block;
}

.role--engineer {
	background-color: blue;
	color: white;
}

.role--consultant {
	background-color: #af003a;
	color: white;
} */
</style>
