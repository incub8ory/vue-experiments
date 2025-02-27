<template>
	<div class="shopping-list">
		<!-- <ul> -->
		<form @submit.prevent="addItem">
			<div class="form-control">
				<input
					type="text"
					ref="shoppingItemInput"
					placeholder="Add a list item"
					aria-label="list item input"
					@focus="clearInput"
				/>
				<IconButton type="submit" size="icon-xl">
					<template #icon><IconPlusCircle></IconPlusCircle></template>
				</IconButton>
			</div>
		</form>
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
	</div>
</template>

<script>
import IconTrash from '../icons/IconTrash.vue';
// import BaseButton from '../UI/BaseButton.vue';
import IconButton from '../UI/IconButton.vue';
import IconPlusCircle from '../icons/IconPlusCircle.vue';

export default {
	components: {
		IconTrash,
		IconButton,
		IconPlusCircle,
		// BaseButton,
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
			this.$refs.shoppingItemInput.placeholder = '';
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
	ul,
	form {
		width: 100%;
	}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		padding: 0 0 120px 0;
		/* background-color: var(--color-background); */

		li {
			margin: 0 0 8px 0;
			padding: 0 0 8px 6px;
			/* background-color: var(--color-background); */
			border-bottom: 1px dotted var(--color-border);

			&:hover {
				cursor: pointer;
				border-bottom: 1px solid var(--color-border);

				label {
					color: var(--color-heading);
				}
			}
		}
	}

	input[type='text'] {
		border: 0;
	}
	.form-control {
		padding: 40px 12px 4px 28px;
		margin-bottom: 32px;
		border-bottom: 1px dotted var(--color-border);
	}
}

input[type='checkbox'] + label {
	padding-left: 8px;
}
input[type='checkbox']:checked + label {
	text-decoration: line-through;
}

.form-control {
	width: 100%;
	display: flex;
	flex-direction: row;
	gap: 4px;

	&:hover {
		border-bottom: 1px solid var(--color-text);
	}
}

/* button {
	text-wrap: nowrap;
} */

/* 
button.icon-xl svg {
	width: 32px;
	height: 32px;
} 
*/

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
	transition: all 0.3s ease-in-out;
	position: absolute;
}
.list-animation-move {
	transition: transform 0.3s ease-in;
}
</style>
