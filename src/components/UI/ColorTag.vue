<template>
	<span :class="categoryIndex">
		<slot>Tag name</slot>
	</span>
</template>

<script>
export default {
	props: ['categoryIndex'],
	computed: {},
};
</script>

<style scoped>
span {
	font-size: 12px;
	/* padding: 2px 4px; */
	/* border: 1px solid var(--color-border); */
	display: inline-block;
	position: relative;
	padding-left: 32px;
}
span::before {
	content: '';
	padding: 0 4px;
	/* background-color: #777788; */
    background-color: var(--color-background-mute);
	height: 3px;
	width: 24px;
	border-radius: 2px;
	margin-right: 2px;
	position: absolute;
	left: 0;
	top: 7px;
}
span.cat-0::before {
	background-color: #b7b9bd;
}
span.cat-1::before {
	background-color: #d8c8a4;
}
span.cat-2::before {
	background-color: #e51b16;
}
span.cat-3::before {
	background-color: #b2159f;
}
span.cat-4::before {
	background-color: #49c852;
}
span.cat-5::before {
	background-color: #ff84cb;
}
span.cat-6::before {
    background-color: #00B1DB;
}
span.cat-7::before {
    background-color: #FF8600
}
</style>
