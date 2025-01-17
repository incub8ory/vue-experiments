<template>
	<!-- <nav class="subnav mono">Add new resource</nav> -->
	<SubNav class="mono">Add new vocabulary</SubNav>
	<!-- <BaseBanner></BaseBanner> -->
	<section class="">
		<!-- <h2>New resource</h2> -->
		<form @submit.prevent="submitVocabulary">
			<div class="form-control">
				<label for="japanese">Japanese word</label>
				<input
					type="text"
					id="japanese"
					name="japanese"
					autocomplete="off"
					v-model.trim="enteredJapanese"
				/>
			</div>
			<div class="form-control">
				<label for="english">English translation</label>
				<input
					type="text"
					id="english"
					name="english"
					autocomplete="off"
					v-model.trim="enteredEnglish"
				/>
			</div>
			<div class="form-control">
				<label for="english">romaji</label>
				<input
					type="text"
					id="romaji"
					name="romaji"
					autocomplete="off"
					v-model.trim="enteredRomaji"
				/>
			</div>
			<div class="cta">
				<BaseButton type="submit" variant="primary full-width"
					>Add new vocabulary</BaseButton
				>
			</div>
		</form>
	</section>
</template>
<script>
// import BaseBanner from '../components/UI/BaseBanner.vue';
import BaseButton from '../components/UI/BaseButton.vue';
import SubNav from '../components/nav/SubNav.vue';
export default {
	data() {
		return {
			enteredJapanese: '',
			enteredEnglish: '',
			enteredRomaji: '',
			invalidInput: false,
			hasJapanese: true,
			hasEnglish: true,
			error: null,
		};
	},
	components: {
		// BaseBanner,
		BaseButton,
		SubNav,
	},
	emits: ['new-vocab-added'],
	methods: {
		clearForm() {
			this.enteredJapanese = '';
			this.enteredEnglish = '';
			this.enteredRomaji = '';
		},
		submitVocabulary() {
			if (this.enteredJapanese === '') {
				this.invalidInput = true;
				this.hasJapanese = false;
				return;
			}
			if (this.enteredEnglish === '') {
				this.invalidInput = true;
				this.hasEnglish = false;
				return;
			}

			this.invalidInput = false;
			this.hasJapanese = true;
			this.hasEnglish = true;
			this.error = null;

			const d = new Date();
			const timestamp = d.getTime();

			fetch('https://nihongo-lab-default-rtdb.firebaseio.com/vocabulary.json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					japanese: this.enteredJapanese,
					english: this.enteredEnglish.toLowerCase(),
					romaji: this.enteredRomaji,
					dateAdded: timestamp,
				}),
			})
				.then((response) => {
					if (response.ok) {
						// do something ...
					} else {
						throw new Error('Unable to save data.');
					}
				})
				.catch((error) => {
					console.log(error);
					this.error = error.message;
				});

			console.log(this.enteredJapanese + ' was added on ' + timestamp);
			// console.log(d.getTime());
			// this.$emit('new-vocab-added');

			// this.$router.push('/');
 			this.$router.push({
				path: '/',
				query: { id: timestamp, jpn: this.enteredJapanese, eng: this.enteredEnglish },
			});
			this.clearForm();
		},
	},
};
</script>
<style scoped>
section {
	padding: 40px;
	width: 100%;
	/* max-width: 480px; */
}
form {
	width: 100%;
	max-width: 480px;
	margin: 0 auto;
}
/* .card form {
	padding-top: 40px;
} */
.form-control {
	padding-bottom: 24px;
}
/* 
h3,
label {
	display: block;
	margin-bottom: 8px;
	font-size: 13px;
	font-weight: 500;
	line-height: 16px;
	color: var(--color-heading);
}
input,
textarea,
select {
	color: var(--color-heading);
	width: 100%;
	border: 1px solid var(--color-border);
	border-radius: 3px;
	font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans',
		Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
	font-feature-settings: 'ss06', 'tnum' on, 'lnum' on, 'zero' on;
	font-size: 14px;
	line-height: 20px;
	padding: 8px;
	background-color: transparent;
	outline: none;
	box-shadow: none;
}
input:focus,
input:active,
textarea:focus,
textarea:active,
select:focus,
select:active {
	outline: none;
}
select {
	appearance: none;
}

select::-ms-expand {
	display: none;
}

select {
	padding-right: 40px;
	background: url(../assets/icon-chevron-down.svg) right center no-repeat;
}
input[type='checkbox'],
input[type='radio'] {
	width: auto;
	margin-right: 8px;
}

input[type='checkbox'] + label,
input[type='radio'] + label {
	display: inline-block;
	font-weight: normal;
	line-height: 16px;
	margin: 2px;
}

input[type='checkbox'] + label:hover,
input[type='radio'] + label:hover,
.tag:has(:checked) input[type='radio'] + label {
	cursor: pointer;
	color: var(--vt-c-black-soft);
} */

.tag {
	padding: 2px 12px;
	margin-right: 12px;
	border-radius: 8px;
	display: inline-flex;
	background-color: var(--color-background-soft);
	align-items: center;
}
.tag:hover,
.tag:has(:checked) {
	background-color: var(--color-chartreuse-1);
}

input[type='checkbox'] {
	margin-right: 8px;
}

.cta {
	margin: 24px 0 64px;
	display: flex;
	gap: 8px;
	/* justify-content: center; */
}
.cta button:last-of-type {
	/* width: 160px; */
	align-content: center;
	justify-content: center;
}
.danger {
	padding-top: 8px;
	padding-bottom: 12px;
}
.formInputError {
	border-color: var(--color-danger);
}
/* @media (min-width: 1024px) {
	.about {
		min-height: 100vh;
		display: flex;
		align-items: center;
	}
} */
</style>
