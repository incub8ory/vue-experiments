<template>
	<div class="project-container" id="stamp-collector">
		<div class="sidebar">
			<SecondaryNavigation :projectID="this.projectID" />

			<div class="lede">
				<h2>{{ this.getProjectTitle(this.projectID) }}</h2>
				<p>
					This app serves as a digital companion to
					{{ this.ekiStampsDataStore.length }} analog souvenir eki stamps
					(駅スタンプ) individually collected at various train stations all over
					Japan from {{ this.startYear
					}}<span v-if="this.startYear !== this.endYear">
						to {{ this.endYear }}</span
					>.
				</p>
				<details>
					<summary>Technical Notes</summary>
					This app uses
					<a href="https://www.npmjs.com/package/exifr">exifr</a> to extract
					EXIF data from the photos, replacing exif-js on an earlier version of
					the app. I also replaced OpenCage, then Nominatim, with
					<a href="https://geoapify.com">Geoapify</a> to handle reverse
					geocoding to obtain the address from the latitude/longitude.
				</details>
			</div>
			
		</div>

		<div id="showcase">
			<ol>
				<li
					v-for="image in this.ekiStampsDataStore.slice().reverse()"
					:key="image.id"
				>
					<article>
						<header>
							<p class="stamp-id subhead mono">N° {{ image.id }}</p>
							<h3>{{ image.title }}</h3>
							<p v-if="image.location" class="stamp-address">
								{{ image.location.address }}
							</p>
						</header>
						<!-- <img
							:src="this.$store.state.baseURL + image.src"
							:alt="image.title"
							class="photo"
						/> -->
						<img :src="image.src" :alt="image.title" class="photo" />
						<MapComponent
							v-if="image.location"
							:mapId="image.id"
							:mapTitle="image.title"
							:latitude="image.location.latitude"
							:longitude="image.location.longitude"
						/>
						<section v-if="image.location">
							<div class="stamp-details stamp-date">
								<p class="subhead mono">date</p>
								<p>{{ image.date }}</p>
							</div>
							<div class="stamp-gps">
								<div class="stamp-details stamp-lat">
									<p class="subhead mono">lat</p>
									<p>{{ image.location.latitude }}</p>
								</div>
								<div class="stamp-details stamp-lon">
									<p class="subhead mono">lon</p>
									<p>{{ image.location.longitude }}</p>
								</div>
							</div>
						</section>
					</article>
				</li>
			</ol>
		</div>
	</div>
</template>

<script>
import exifr from 'exifr';
import { mapGetters } from 'vuex';

import SecondaryNavigation from '../nav/SecondaryNavigation.vue';
import MapComponent from '@/components/experimental/MapComponent.vue';

export default {
	components: {
		SecondaryNavigation,
		MapComponent,
	},

	computed: {
		...mapGetters(['ekiStampsDataStore', 'experimentsDataStore']),
	},

	data() {
		return {
			projectID: '06', // For subnav and displaying proj title
			startYear: null,
			endYear: null,
		};
	},

	mounted() {
		this.ekiStampsDataStore.forEach((image) => {
			// console.log('image src: ' + this.$store.state.baseURL + image.src);
			this.getExifrGPS(image.src);
			// this.getExifrGPS(this.$store.state.baseURL + image.src);
		});
	},
	methods: {
		getProjectTitle(projID) {
			const project = this.experimentsDataStore.find(
				(labExperiments) => labExperiments.id === projID
			);

			// console.log('find project index: ' + this.experimentsDataStore.indexOf(project));

			return project.title;
		},

		getYearRange(imgYear) {
			if (imgYear < this.startYear || this.startYear === null) {
				this.startYear = imgYear;
			}
			if (imgYear > this.startYear || this.endYear === null) {
				this.endYear = imgYear;
			}
			// console.log('startYear: ' + this.startYear, 'endYear: ' + this.endYear);
		},

		// use exifr rather than exif-js to get GPS lat, long, date
		async getExifrGPS(imageSrc) {
			const image = this.ekiStampsDataStore.find(
				// (img) => this.$store.state.baseURL + img.src === imageSrc
				(img) => img.src === imageSrc
			);
			const imgElement = new Image();

			try {
				const exifData = await exifr.gps(imageSrc);
				const dateStamp = await exifr.parse(imageSrc, [
					'GPSDateStamp',
					'CreateDate',
				]);

				if (exifData && exifData.latitude && exifData.longitude) {
					const latitude = exifData.latitude;
					const longitude = exifData.longitude;

					if (typeof dateStamp.GPSDateStamp === 'string') {
						// GPSDateStamp returns a date object
						image.date = this.convertExifDate(dateStamp.GPSDateStamp);
						// image.date = dateStamp.GPSDateStamp;
					} else {
						// in case GPSDateStamp returns undefined
						const dateString = JSON.stringify(dateStamp.CreateDate).substring(
							1,
							11
						);

						image.date = this.convertCreateDate(dateString);

						// get img year from last 4 characters of date string
						const imageYear = image.date.substring(image.date.length - 4);
						this.getYearRange(imageYear);

					}

					this.fetchAddress(latitude, longitude)
						// this.getAddress(latitude, longitude)
						.then((address) => {
							image.location = { latitude, longitude, address };
							// console.log('exifr address: ' + image.location.address);
						})
						.catch((err) => console.error(err));
				} else {
					console.warn('No EXIF data found');
				}
			} catch (error) {
				console.error('Error reading EXIF data:', error);
			}

			imgElement.src = imageSrc;
		},

		// change ExifDate format from yyyy:mm:dd to dd mmm yyyy
		convertExifDate(exifDate) {
			// Convert input string to a Date object
			const dateParts = exifDate.split(':');
			const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Month is 0-based in JS Date

			// Format the date to 'dd mmm yyyy'
			const options = { year: 'numeric', month: 'short', day: '2-digit' };
			const formattedDate = date
				.toLocaleDateString('en-GB', options)
				.replace(',', '');

			// console.log(formattedDate); // Output: "12 Mar 2024"
			return formattedDate;
		},

		convertCreateDate(createDate) {
			const dateParts = createDate.split('-');
			const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

			const options = { year: 'numeric', month: 'short', day: '2-digit' };
			const formattedDate = date
				.toLocaleDateString('en-GB', options)
				.replace(',', '');

			// console.log(formattedDate); // Output: "12 Mar 2024"
			return formattedDate;
		},

		// Replace nominatim with geoapify to reverse-geocode address
		async fetchAddress(latitude, longitude) {
			// const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

			// https://api.geoapify.com/v1/geocode/reverse?lat=33.5192&lon=130.5315388888889&format=json&apiKey=YOUR_API_KEY
			const apiKey = import.meta.env.VITE_GEOAPIFY_API;
			const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

			try {
				const response = await fetch(url);
				const data = await response.json();

				// return data.display_name;
				console.log('data: ' + data);
				return data.results[0].formatted;
			} catch (err) {
				// error.value = 'Error fetching address information.';
				console.error('Geocoding error:', error);
				return 'Address not found';
			}
		},

		async getAddress(latitude, longitude) {
			// const apiKey = 'YOUR_OPENCAGE_API_KEY'; // Replace with your OpenCage API Key
			const apiKey = import.meta.env.VITE_OPENCAGE_API;
			const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				return data.display_name;
			} catch (err) {
				// error.value = 'Error fetching address information.';
				console.error('Geocoding error:', err);
				return 'Address not found';
			}
		},
	},
};
</script>

<style scoped>
.project-container {
	padding: 0 0 40px 0;

	.sidebar {
		padding-top: 40px;
		padding-bottom: 80px;

		nav + .lede {
			padding: 0 40px;
			font-feature-settings: 'ss01' on, 'tnum' on, 'zero' on;

			h2 {
				color: var(--color-heading);
				font-size: 36px;
				/* letter-spacing: -0.03em; */
				line-height: 40px;
				padding-bottom: 36px;
				padding-top: 36px;
			}

			p {
				padding-bottom: 24px;
			}

			a {
				color: var(--color-red-orange);
			}
		}

		details {
			/* font-family: 'HelveticaNowText', 'SF Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji'; */
			margin-top: 24px;
			margin-bottom: 0;
			padding-top: 12px;
			padding-bottom: 8px;
			border-top: 1px solid var(--color-border-soft);
			border-bottom: 1px solid var(--color-border-soft);

			& summary {
				padding-right: 0;
				font-size: 11px;
				text-transform: uppercase;
				letter-spacing: 0.1em;
			}

			a {
				color: var(--color-red-orange);
			}
		}

		details + details {
			margin-top: 0;
			border-top: 0;
		}

		details[open] {
			padding-bottom: 24px;
			padding-right: 80px;

			& summary {
				margin-bottom: 12px;
			}
		}
	}

	#showcase {
		font-family: 'HelveticaNowText', 'SF Pro', -apple-system, BlinkMacSystemFont,
			'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
			'Segoe UI Emoji';

		ol {
			list-style: none;
			padding: 40px 0;

			li {
				list-style: none;
				padding: 0 0 80px;
				margin: 0 auto;

				& > article {
					width: 100%;

					img {
						width: 100%;
						height: 400px;
						object-fit: cover;
					}

					header {
						padding: 40px 0 12px 0;

						.subhead {
							font-size: 12px;
							letter-spacing: 0.02em;
							text-transform: uppercase;
							color: var(--color-text);
							line-height: 1;
						}
						h3 {
							color: var(--color-heading);
							font-size: 28px;
							font-weight: 400;
							letter-spacing: -0.02em;
						}
						.stamp-address {
							max-width: 66.67%;
							font-size: 14px;
							padding: 4px 0 12px 0;
						}
					}

					section {
						font-size: 12px;
						padding: 16px 0 40px 0;
						font-feature-settings: 'ss01' on, 'zero' on;
						width: 100%;
						display: flex;
						overflow-x: scroll;

						.stamp-details {
							font-family: 'SF Pro', -apple-system, BlinkMacSystemFont,
								'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
								'Apple Color Emoji', 'Segoe UI Emoji';
							font-feature-settings: 'ss01' on, 'tnum' on, 'zero' on;
						}
						.stamp-details.stamp-date {
							min-width: 120px;
						}

						.stamp-gps {
							display: flex;
							flex-direction: row;
							gap: 0 24px;
						}

						.stamp-lat {
							.subhead + p {
								padding-bottom: 12px;
							}
						}

						.subhead {
							letter-spacing: 0.02em;
							font-variant: small-caps;
							color: var(--color-text);
						}
					}
				}
			}
		}
	}

	.map-container {
		z-index: 2;
		height: 80px;
		opacity: 0.7;
		margin: 1px 0;

		&:hover {
			opacity: 1;
		}
	}

	@media (width >= 1024px) {
		.project-container {
			display: flex;
		}
		.sidebar {
			width: calc(42vw - 40px);
			/* height: calc(100vw - 65px); */
			position: fixed;
			overflow-x: hidden;
			border-right: 1px solid var(--color-border-soft);
			height: 100%;
			padding-bottom: 80px;
			overflow-y: scroll;

			.lede {
				p {
					color: var(--color-heading);
					font-size: 19px;
					font-weight: 400;
					line-height: 26px;
					max-width: 80%;
				}
			}
		}

		#showcase {
			margin-left: calc(42vw - 65px);
			height: 100%;

			ol {
				height: calc(100vh - 105px);
				overflow-y: scroll;
				width: calc(58vw);
				z-index: 1;
			}
		}

		li article img {
			min-width: 420px;
		}

		.map-container {
			min-width: 420px;
		}
	}

	@media (width < 1024px) {
		.lede {
			margin: 0 auto;
			width: 83%;
			min-width: 320px;

			p {
				/* font-size: 2.7vw; */
				font-size: min(max(22px, 2.7vw), 32px);
				font-weight: 400;
				line-height: 1.325;
				padding-right: 80px;
				padding-bottom: 80px;
				border-bottom: 1px solid var(--color-border-soft);
			}
		}
	}
	@media (width < 600px) {
		.lede {
			width: 100%;
			p {
				font-size: 22px;
			}
		}
		ol {
			li {
				width: calc(100% - 80px);
				min-width: 320px;
			}
		}
		section {
			/* flex-direction: row-reverse; */
			justify-content: left;
		}
	}

	@media (width >= 600px) {
		ol {
			li {
				width: 71%;
				min-width: 320px;
			}
		}
		section {
			/* flex-direction: row-reverse; */
			justify-content: space-between;
		}
	}
}
</style>
