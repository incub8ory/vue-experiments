<template>
	<button :type="type" :class="state">
		<slot name="icon"><IconArrowRightCircle /></slot>

		<slot>Tab label</slot>
	</button>
</template>

<script>
import IconArrowRightCircle from '../icons/IconArrowRightCircle.vue';

export default {
	components: {
		IconArrowRightCircle,
	},
	props: ['type', 'state'],
};
</script>

<style scoped>
button {
	border: none;
	border-bottom: 2px solid transparent;
	box-sizing: border-box;
	outline: none;
	background-color: inherit;
	color: var(--color-text);
	font-size: 14px;
	padding: 12px 0;
	display: flex;
	gap: 8px;
	align-items: center;
	/* max-height: 45px; */

	&:hover {
		color: var(--color-heading);
		cursor: pointer;
	}

	&:active,
	button.active {
		border-bottom: 3px solid var(--color-chartreuse-2);
		/* transition: all 2s; */
	}
}

/* button:active,
button.active {
	border-bottom: 3px solid var(--color-chartreuse-2);
} */
</style>
