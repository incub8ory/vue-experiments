<template>
	<button :class="size" >
		<!-- <IconTrash></IconTrash> -->
		<slot name="icon">
			<IconXCircle></IconXCircle>
		</slot>
	</button>
</template>
<script>
import IconXCircle from '../icons/IconXCircle.vue';
export default {
	components: {
		IconXCircle,
	},
	props: ['size'],
};
</script>
<style scoped>
button {
	border: 0;
	background-color: transparent;
}
button svg,
button .icon-base svg {
	width: 16px;
	height: 16px;
}
.icon-md svg {
	width: 16px;
	height: 16px;
}
.icon-lg svg {
	width: 20px;
	height: 20px;
}
.icon-xl svg {
	width: 28px;
	height: 28px;
}
</style>
