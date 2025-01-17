<template>
	<div class="shopping-list">
		<!-- <ul> -->
		<TransitionGroup tag="ul" name="list-animation">
			<li v-for="item in shoppingList" :key="item">
				<input
					type="checkbox"
					:id="item"
					:name="item"
					:value="item"
					@click="removeItem(item)"
				/>
				<label :for="item">{{ item }}</label>
			</li>
		</TransitionGroup>
		<!-- </ul> -->
		<form @submit.prevent="addItem">
			<div class="form-control">
				<input
					type="text"
					ref="shoppingItemInput"
					aria-label="shopping item input"
				/>
				<BaseButton type="submit">Add item</BaseButton>
			</div>
		</form>
	</div>
</template>

<script>
import IconTrash from '../icons/IconTrash.vue';
import BaseButton from '../UI/BaseButton.vue';

export default {
	components: {
		IconTrash,
		BaseButton,
	},
	data() {
		return {
			shoppingList: [
				'organic high oleic sunflower oil',
				'reduced fat coconut milk',
				'linguini',
			],
		};
	},
	methods: {
		clearInput() {
			this.$refs.shoppingItemInput.value = '';
		},
		addItem() {
			const enteredListItem = this.$refs.shoppingItemInput.value.trim();
			if (enteredListItem !== '') {
				// console.log('enteredListItem: ' + enteredListItem);
				this.shoppingList.unshift(enteredListItem);
				this.clearInput();
			}
		},
		removeItem(item) {
			// console.log(item);
			this.shoppingList = this.shoppingList.filter(
				(listItem) => listItem !== item
			);
		},
	},
};
</script>

<style scoped>
.shopping-list {
	padding: 40px 0;
	display: flex;
	flex-direction: row;
	max-width: 960px;
	margin: 0 auto;
	align-items: flex-start;
	gap: 40px;
}
ul,
form {
	width: 100%;
	max-width: 480px;
	/* margin: 0 auto; */
}
ul {
	list-style: none;
	margin: 0;
	padding: 0;
	padding: 12px 40px 120px 40px;
	background-color: var(--color-background);
}
li {
	margin: 0;
	padding: 0;
	padding-bottom: 8px;
	margin-bottom: 8px;
	/* display: block; */
	/* width: 100%; */
	background-color: var(--color-background);
	border-bottom: 1px solid var(--color-border);
}
input[type='checkbox']:checked + label {
	text-decoration: line-through;
}
/* li svg {
	width: 16px;
	height: 16px;
} */
/* form {
	padding: 40px 0;
	border: 1px dotted #f00;
} */
.form-control {
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 4px;
}
button {
	text-wrap: nowrap;
}
.list-animation-enter-from {
	opacity: 0;
	transform: translateY(-16px);
}
.list-animation-enter-active {
	transition: all 160ms cubic-bezier(0.6, -0.28, 0.735, 0.045);
}
.list-animation-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.list-animation-leave-from {
	opacity: 1;
}
.list-animation-leave-to {
	opacity: 0;
}
.list-animation-leave-active {
	/* transition: all 1s cubic-bezier(0.6, -0.28, 0.735, 0.045); */
	transition: all .3s ease-in-out;
	position: absolute;
}
.list-animation-move {
	transition: transform 0.3s ease-in;
}
</style>
