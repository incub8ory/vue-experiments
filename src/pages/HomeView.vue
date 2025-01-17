<template>
	<header>
		<BaseButton @click="addResource" variant="rounded"
			><template #icon-l
				><IconPlusCircle></IconPlusCircle>Add new word</template
			></BaseButton
		>
	</header>
	<div class="messages-container">
		<section id="messages">
			<p v-if="isLoading" class="mono">Loading…</p>
			<BannerSimple
				v-if="showBanner && !isLoading"
				variant="success"
				@close="closeBanner"
				><p class="banner-msg">
					A new word &mdash;
					{{ this.$route.query.jpn }}
					({{ this.$route.query.eng }}) &mdash;
					<!-- {{ this.results[this.findDataIndex(this.queryId)].japanese }} -->
					<!-- ({{ this.results[this.findDataIndex(this.queryId)].english }}) &mdash; -->
					was just added!
				</p>

				<template #icon
					><IconButton size="icon-xl" class="close-btn"></IconButton
				></template>
			</BannerSimple>
			<!-- <BannerSimple
				v-if="showBanner && !isLoading"
				variant="success"
				@close="closeBanner"
			>
				A new word &mdash;
				{{ results[lastResultIndex].japanese }} ({{
					results[lastResultIndex].english
				}}) &mdash; was just added!
				<template #icon
					><IconButton size="icon-xl" class="close-btn"></IconButton
				></template>
			</BannerSimple> -->
		</section>
	</div>
	<div class="hero">
		<p v-if="!isLoading" class="lede">
			What does
			<span class="japanese-text">
				<div class="japanese">{{ results[randomNum].japanese }}</div>
				<div class="hint">
					<!-- <button @click="toggleRomaji">
				Romaji<Transition
					name="hintFadeIn"
					><span v-if="!showHint"><br />hint?</span></Transition
				> -->
					<button @click="toggleRomaji">
						Romaji<Transition
							:css="false"
							@before-enter="beforeEnter"
							@enter="onEnter"
							@after-enter="afterEnter"
							@before-leave="beforeLeave"
							@leave="onLeave"
							@after-leave="afterLeave"
							@enter-cancelled="enterCancelled"
							@leave-cancelled="leaveCancelled"
							><span v-if="!showHint"><br />hint?</span></Transition
						>
						<Transition name="hintFadeIn">
							<span v-if="showHint"
								>:<strong class="firstletter">{{
									results[randomNum].romaji
								}}</strong></span
							>
						</Transition>
					</button>
				</div>
				<!-- <div class="hint">
					<Transition name="hintFadeIn" mode='out-in'>
						<button v-if="!showHint" @click="displayHint">
							Show romaji<br />hint?
						</button>
						<button v-else @click="hideHint">
							Hide romaji:<br /><strong class="firstletter">{{
								results[randomNum].romaji
							}}</strong>
						</button>
					</Transition>
				</div> -->
			</span>

			mean?
		</p>

		<form v-if="!isLoading" @submit.prevent="checkAnswer">
			<div class="form-control">
				<!-- <label for="english">English translation</label> -->
				<input
					type="text"
					id="answer"
					name="answer"
					autocomplete="off"
					v-model.trim="enteredAnswer"
				/>
			</div>
			<div class="cta">
				<IconButtonJumbo
					type="submit"
					@click="generateRandomNumber"
				></IconButtonJumbo>
			</div>
		</form>
		<section id="feedback">
			<p class="mono">{{ message }}</p>
		</section>
	</div>
</template>

<script>
import BaseBanner from '../components/UI/BaseBanner.vue';
import BannerSimple from '../components/UI/BannerSimple.vue';
import BaseButton from '../components/UI/BaseButton.vue';
import IconArrowRightCircle from '../components/icons/IconArrowRightCircle.vue';
import IconPlusCircle from '../components/icons/IconPlusCircle.vue';
import IconButton from '../components/UI/IconButton.vue';
import IconButtonJumbo from '../components/UI/IconButtonJumbo.vue';
import IconXCircle from '../components/icons/IconXCircle.vue';
import IconPlusGrey from '../components/icons/IconPlusGrey.vue';

export default {
	components: {
		BaseBanner,
		BannerSimple,
		BaseButton,
		IconArrowRightCircle,
		IconPlusCircle,
		IconButton,
		IconButtonJumbo,
		IconXCircle,
		IconPlusGrey,
	},
	data() {
		return {
			results: [],
			// lastResultIndex: null,
			newlyAddedIndex: -1,
			queryId: '', //timestamp from query params
			// currentIndex: null,
			answerArray: [],
			isLoading: false,
			error: null,
			elapsedTime: 0,
			showBanner: false,
			previousRandomNum: -1,
			randomNum: null,
			enteredAnswer: '',
			message: '',
			showHint: false,
			enterTimer: null,
			leaveTimer: null,
		};
	},
	computed: {
		toggleRomaji() {
			this.showHint = !this.showHint;
		},
		displayHint() {
			console.log('displayHint clicked!');
			this.showHint = true;
		},
		hideHint() {
			console.log('hideHint clicked!');
			this.showHint = false;
		},
	},
	methods: {
		addResource() {
			this.closeBanner();
			this.$router.push('/vocabulary/new');
		},
		closeBanner() {
			console.log('close banner triggered');
			this.showBanner = false;
			// this.clearTimeout();
			this.$router.push('/');
		},
		loadResults() {
			this.isLoading = true;
			this.error = null;
			fetch('https://nihongo-lab-default-rtdb.firebaseio.com/vocabulary.json')
				.then((response) => {
					if (response.ok) {
						console.log('Data fetched successfully! ');
						return response.json();
					}
				})
				.then((data) => {
					// console.log(data);
					this.isLoading = false;
					const results = [];
					for (const id in data) {
						results.push({
							japanese: data[id].japanese,
							english: data[id].english,
							romaji: data[id].romaji,
							dateAdded: data[id].dateAdded,
						});
					}
					this.results = results;
					// console.log('results: ' + this.results);

					// for debugging
					// if (this.queryId) {
					// 	this.findDataIndex(this.queryId);
					// }

					this.getElapsedTime();
					this.generateRandomNumber();
				})
				.catch((error) => {
					// Handle technical/browser-side errors
					console.log(error);
					this.isLoading = false;
					this.error = 'Failed to fetch data. Please try again later.';
				});
		},
		separateString() {
			let answerString = this.results[this.previousRandomNum].english;
			this.answerArray = answerString.split(', ');
		},
		checkAnswer() {
			if (this.enteredAnswer) {
				this.separateString();
				if (this.answerArray.length > 1) {
					// if more than 1 answer
					for (let i = 0; i < this.answerArray.length; i++) {
						if (
							this.answerArray[i].toLowerCase() ===
							this.enteredAnswer.toLowerCase()
						) {
							// console.log(this.enteredAnswer + ' is one of the right answers!');
							this.message = this.enteredAnswer + ' is correct!';
						} else {
							this.message = this.enteredAnswer + ' is correct!';
						}
					}
				} else {
					// if (this.results[this.currentIndex].english === this.enteredAnswer) {
					if (
						this.results[this.previousRandomNum].english.toLowerCase() ===
						this.enteredAnswer.toLowerCase()
					) {
						// console.log(this.enteredAnswer + ' is the right answer!');
						this.message = this.enteredAnswer + ' is correct!';
					} else {
						// console.log(this.enteredAnswer + ' is the wrong answer');
						this.message =
							this.enteredAnswer +
							' is wrong. ' +
							this.results[this.previousRandomNum].japanese +
							' means ' +
							this.results[this.previousRandomNum].english;
					}
				}
			} else {
				// empty or no answer
				this.message =
					'No answer? ' +
					this.results[this.previousRandomNum].japanese +
					' means ' +
					this.results[this.previousRandomNum].english;
			}
			this.resetData();
		},
		resetData() {
			this.enteredAnswer = '';
			this.showHint = false;
		},
		getElapsedTime() {
			this.elapsedTime = Date.now() - this.$route.query.id;
		},
		generateRandomNumber() {
			this.previousRandomNum = this.randomNum;

			while (true) {
				this.randomNum = Math.floor(Math.random() * this.results.length);
				if (this.previousRandomNum !== this.randomNum) {
					// console.log('randomNum: ' + this.randomNum);
					this.currentIndex = this.randomNum;
					return this.randomNum;
				}
			}
		},
		// findDataIndex(timestamp) {	// not working
		// 	this.newlyAddedIndex = this.results.findIndex(
		// 		(result) => result.dateAdded === Number(timestamp)
		// 	);
		// 	console.log('newly added index: ' + this.newlyAddedIndex);

		// 	if (!this.newlyAddedIndex || this.newlyAddedIndex === -1) {
		// 		console.log('no matching timestamp found');
		// 	} else {
		// 		console.log('newlyAdded: ' + this.newlyAddedIndex);
		// 		console.log(
		// 			'newly added word ID: ' + this.results[this.newlyAddedIndex].id
		// 		);
		// 		console.log(
		// 			'id for data idx 33: ' + this.results[this.newlyAddedIndex].id
		// 		);
		// 		return this.newlyAddedIndex;
		// 	}
		// },
		// checkForQueryId() {
		// 	this.queryId = this.$route.query.id;
		// 	// this.findDataIndex(timestamp);
		// 	// console.log('query ID/timestamp: ' + timestamp);
		// 	if (this.queryId) {
		// 		console.log('There is an ID query parameter');
		// 		this.getElapsedTime();
		// 		if (this.elapsedTime < 3000) {
		// 			this.showBanner = true;
		// 			setTimeout(this.closeBanner, 10000);
		// 			// this.newlyAddedIndex = -1;
		// 		}
		// 	} else {
		// 		console.log('There is no query param');
		// 	}
		// },
		fetchQueryParams() {
			this.queryId = this.$route.query.id;
			if (this.queryId) {
				console.log('there is a query id');
				this.getElapsedTime();
				if (this.elapsedTime < 3000) {
					this.showBanner = true;
					setTimeout(this.closeBanner, 10000);
				}
			} else {
				console.log('There is no query param');
			}
		},
		fadeInAnimation(el, done) {
			// re-create fade-in animation enter-active 50%
			el.style.filter = 'blur(1px)';
			let counter = 1;
			this.enterTimer = setInterval(() => {
				el.style.opacity = counter * 0.05;
				counter++;
				if (counter > 20) {
					// opacity at 100%
					el.style.filter = 'blur(0)';
					clearInterval(this.enterTimer);
					done();
				}
			}, 10);
		},
		beforeEnter(el) {
			// animation event when animation element is entering the DOM
			console.log('beforeEnter event triggered');
			console.log(el);

			// re-create fade-in enter-from animation with javascript
			el.style.opacity = 0;
		},
		onEnter(el, done) {
			// animation event property; equivalent to v-enter-active
			console.log('enter event triggered!');
			console.log(el);

			// re-create fade-in animation enter-active 50%
			// el.style.filter = 'blur(1px)';
			// let counter = 1;
			// const animTimer = setInterval(function () {
			// 	el.style.opacity = counter * 0.05;
			// 	counter++;
			// 	if (counter > 20) {
			// 		// opacity at 100%
			// 		el.style.filter = 'blur(0)';
			// 		clearInterval(animTimer);
			// 		done();
			// 	}
			// }, 10);
			this.fadeInAnimation(el, done);
		},
		afterEnter(el) {
			// triggered once enter animation is completed
			console.log('afterEnter event triggered!');
			console.log(el);
		},
		beforeLeave(el) {
			// animation event when animation element is leaving the DOM
			console.log('beforeLeave event triggered');
			console.log(el);

			// re-create fade-in enter-from animation with javascript
			el.style.opacity = 1;
		},
		onLeave(el, done) {
			console.log('onLeave event triggered');
			console.log(el);

			// re-create fade-in animation leave-active 50%
			let counter = 1;
			el.style.filter = 'blur(1px)';
			this.leaveTimer = setInterval(() => {
				let opacityValue = 1 - counter * 0.05;
				el.style.opacity = opacityValue;
				// console.log('opacityValue: ' + opacityValue);
				counter++;
				if (counter > 20) {
					// opacity at 0
					el.style.filter = 'blur(0)';
					clearInterval(this.leaveTimer);
					done();
				}
			}, 10);
			// this.fadeInAnimation(el, done);
		},
		afterLeave(el) {
			// triggered once leave animation is completed
			console.log('afterLeave event triggered');
			console.log(el);
		},
		enterCancelled(el) {
			console.log('enterCancelled event triggered');
			console.log(el);
			clearInterval(this.enterTimer);
		},
		leaveCancelled(el) {
			console.log('leaveCancelled event triggered');
			console.log(el);
			clearInterval(this.leaveTimer);
		},
	},
	beforeMount() {
		this.loadResults();
	},
	created() {
		this.fetchQueryParams();
	},
};
</script>

<style scoped>
header {
	padding: 40px 40px 0;
	display: flex;
	flex-direction: column;
	align-items: end;
	/* justify-content: space-between; */
}
/* header h2 {
	font-weight: 600;
	color: var(--color-heading);
} */
.hero {
	/* padding: 40px 40px 0 40px; */
	margin: 0 auto;
	width: 100%;
	max-width: 640px;
}
.lede {
	color: var(--color-heading);
	display: block;
	font-family: 'Onest', 'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
		'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
		'Segoe UI Emoji';
	font-size: 96px;
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1;
	width: 100%;
}
.banner-msg {
	padding: 12px 16px 12px 20px;
}
.japanese-text {
	display: flex;
	align-items: flex-start;
	letter-spacing: normal;
}
.japanese-text .japanese {
	color: var(--color-red-orange);
	display: inline-block;
}

/* use animation keyframes with v-enter-active and v-leave-active */
@keyframes fade-in {
	0% {
		opacity: 0;
	}
	50% {
		opacity: 0.5;
		filter: blur(2px);
	}
	100% {
		opacity: 1;
		/* filter: blur(0); */
	}
}

/* CSS animation using Vue named Transition */
/* .hintFadeIn-enter-active {
	animation: fade-in 0.3s ease-in-out;
}
.hintFadeIn-leave-active {
	animation: fade-in 0.3s ease-in-out reverse;
} */

/* alternative animation definition using more verbose syntax */
/* .v-enter-from {
	opacity: 0;
}
.v-enter-active {
	transition: all 0.7s linear;
}
.v-enter-to {
	opacity: 1;
}
.v-leave-from {
	opacity: 1;
}
.v-leave-active {
	transition: all 0.3s ease-in-out;
}
.v-leave-to {
	opacity: 0;
} */

/* Named animation block */
/* .hintFadeIn-enter-from {
	opacity: 0;
}
.hintFadeIn-enter-active {
	transition: all .7s ease-in-out;
}
.hintFadeIn-enter-to {
	opacity: 1;
}
.hintFadeIn-leave-from {
	opacity: 1;
}
.hintFadeIn-leave-active {
	transition: all .7s ease-in-out;
}
.hintFadeIn-leave-to {
	opacity: 0;
} */

.hint::before {
	content: '';
	padding-left: 24px;
	padding-top: 24px;
	width: 24px;
	height: 1px;
	margin-left: 12px;
	border-bottom: 1px dashed var(--color-border);
}
.hint {
	padding-top: 16px;
	margin-top: -8px;
	display: inline-flex;
}
.hint button {
	color: var(--color-text);
	font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas,
		'Liberation Mono', monospace;
	font-size: 13px;
	line-height: 20px;
	border: 0;
	border-left: 1px dashed var(--color-border);
	background-color: transparent;
	padding-left: 12px;
	padding-right: 24px;
	padding-bottom: 16px;
	text-align: left;

	&:hover {
		color: var(--color-heading);
		cursor: pointer;
		/* border-left: 1px dashed var(--color-border); */
	}
}
/* .blockStyle {
  font-family: "Flow Circular", system-ui;
  font-size: 24px;
  display: block;
  letter-spacing: normal;
  font-weight: 400;
  color: var(--color-text);
} */
.hint strong {
	font-weight: 700;
	color: var(--color-red-orange);
	display: block;
}
.firstletter::first-letter {
	text-transform: uppercase;
}
.hero form {
	display: flex;
	flex-direction: row;
	align-items: stretch;
	gap: 4px;
	padding-top: 40px;
}
.hero form input {
	font-size: 24px;
	line-height: 32px;
	font-weight: 700;
	border: none;
}
.form-control {
	flex-grow: 2;
	background-color: var(--color-background-mute);
	border-radius: 24px;
	padding-left: 24px;
	padding-right: 12px;
}
.cta {
	align-self: self-end;
}
.cta button {
	background-color: var(--color-background-mute);
}

.messages-container {
	max-width: 640px;
	margin: 0 auto 32px auto;
}
.messages-container .banner-simple {
	margin-left: 24px;
}
#messages {
	background: url(../assets/icon-plus-grey.svg) no-repeat 0 8px;
	padding-left: 16px;
	min-height: 40px;
}
#feedback {
	background: url(../assets/icon-plus-grey.svg) no-repeat 0 8px;
	margin: 40px 0 0;
	padding-left: 24px;
	min-height: 40px;
}
@media (prefers-color-scheme: dark) {
	#messages,
	#feedback {
		background: url(../assets/icon-plus-grey-dark.svg) no-repeat 0 8px;
	}
}
p.mono {
	padding-top: 8px;
	margin-left: 12px;
	/* transition: all 0.5s ; */
}
p.mono::first-letter {
	text-transform: uppercase;
}
@media (prefers-color-scheme: dark) {
	.hero form input {
		background-color: var(--color-background-mute);
	}
}
</style>
