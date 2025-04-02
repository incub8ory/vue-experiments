<template>
	<div class="project-container" id="stamp-collector">
		<div class="sidebar">
			<SecondaryNavigation :projectID="this.projectID" />

			<section class="lede">
				<h2>{{ this.getProjectTitle(this.projectID) }}</h2>
				<p>
					An evolving collection of manhole and fire hydrant covers &mdash;
					<span class="lowercase">{{
						this.numberInWords(this.manholeCoversDataStore.length)
					}}</span>
					so far &mdash; photographed across Japan over the years
				</p>
				<details>
					<summary>Technical Notes</summary>
					This app uses
					<a href="https://www.npmjs.com/package/exifr">Exifr</a> to extract the
					date and GPS coordinates from the photos' EXIF data;
					<a href="https://geoapify.com">Geoapify</a> (with OpenStreetMap) to reverse geocode the address from the latitude/longitude; and
					<a href="https://stadiamaps.com/stamen"> Stamen / Stadia maps</a> for
					the beautiful, minimalist toner map display. <br /><br />
					For editorial stylistic reasons, I also used
					<a href="https://www.npmjs.com/package/to-words">to-words</a>, a
					package that converts numerals to words (i.e., change “10” to “ten”)
					which I used here to convert the calculated total number of covers in
					the data store.
				</details>
				<details>
					<summary>Additional Resources</summary>
					<a
						href="https://japanjourneys.jp/lifestyle/art/japanese-manhole-drain-cover-art/"
					>
						Japanese Manhole Covers: Where Street Meets Art</a
					>
					offers a quick primer on the history of manhole covers. Visit
					<a href="https://www.gk-p.jp">GKP</a>, Japan&rsquo;s Sewerage Public
					Relations Platform where you&rsquo;ll find a comprehensive listing of
					<a href="https://www.gk-p.jp/activity/mc/"
						>Manhole Cards (マンホールカード)</a
					>.
				</details>
			</section>
		</div>
		<div id="showcase">
			<ol>
				<li
					v-for="image in this.manholeCoversDataStore.slice().reverse()"
					:key="image.id"
				>
					<article>
						<header>
							<p class="stamp-id subhead mono">N° {{ image.id }}</p>
							<p v-if="image.location" class="address">
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
							<div class="item-details item-date">
								<p class="subhead mono">date</p>
								<p>{{ image.date }}</p>
							</div>
							<div class="item-gps">
								<div class="item-details item-lat">
									<p class="subhead mono">lat</p>
									<p>{{ image.location.latString }}</p>
									<p>{{ image.location.latitude }}</p>
								</div>
								<div class="item-details item-lon">
									<p class="subhead mono">lon</p>
									<p>{{ image.location.longString }}</p>
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
import { ToWords } from 'to-words';

import SecondaryNavigation from '../nav/SecondaryNavigation.vue';
import MapComponent from '@/components/experimental/MapComponent.vue';

export default {
	components: {
		SecondaryNavigation,
		MapComponent,
	},

	computed: {
		...mapGetters(['manholeCoversDataStore', 'experimentsDataStore']),
	},
	data() {
		return {
			// For subnav and displaying proj title
			projectID: '07',
		};
	},

	mounted() {
		this.manholeCoversDataStore.forEach((image) => {
			this.getExifrGPS(image.src);
			// this.getExifrGPS(this.$store.state.baseURL + image.src);
		});
	},

	methods: {
		numberInWords(num) {
			const toWords = new ToWords();
			return toWords.convert(num);
		},

		getProjectTitle(projID) {
			const project = this.experimentsDataStore.find(
				(labExperiments) => labExperiments.id === projID
			);

			// console.log('find project index: ' + this.experimentsDataStore.indexOf(project));

			return project.title;
		},

		// use exifr rather than exif-js to get GPS lat, long, date
		async getExifrGPS(imageSrc) {
			// const file = event.target.files[0];
			// const image = this.images.find((img) => img.src === imageSrc);
			const image = this.manholeCoversDataStore.find(
				// (img) => this.$store.state.baseURL + img.src === imageSrc
				(img) => img.src === imageSrc
			);
			const imgElement = new Image();

			try {
				const exifData = await exifr.gps(imageSrc);
				const dateStamp = await exifr.parse(imageSrc, ['GPSDateStamp']);

				const latStringData = await exifr.parse(imageSrc, [
					'GPSLatitude',
					'GPSLatitudeRef',
				]);
				const longStringData = await exifr.parse(imageSrc, [
					'GPSLongitude',
					'GPSLongitudeRef',
				]);

				// console.log(
				// 	'latStringData: ' + latStringData.GPSLatitude,
				// 	'longStringData: ' + longStringData.GPSLongitude
				// );

				const latString =
					latStringData.GPSLatitude[0] +
					'°' +
					latStringData.GPSLatitude[1] +
					"'" +
					latStringData.GPSLatitude[2] +
					'"' +
					latStringData.GPSLatitudeRef;

				const longString =
					longStringData.GPSLongitude[0] +
					'°' +
					longStringData.GPSLongitude[1] +
					"'" +
					longStringData.GPSLongitude[2] +
					'"' +
					longStringData.GPSLongitudeRef;

				if (exifData && exifData.latitude && exifData.longitude) {
					const latitude = exifData.latitude;
					const longitude = exifData.longitude;

					// console.log('dateStamp.GPSDateStamp: ' + dateStamp.GPSDateStamp);
					image.date = this.convertExifDate(dateStamp.GPSDateStamp);

					this.fetchAddress(latitude, longitude)
						.then((address) => {
							image.location = {
								latitude,
								longitude,
								address,
								latString,
								longString,
							};
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

		// Replace nominatim with geoapify to reverse-geocode address
		async fetchAddress(latitude, longitude) {
			// 	url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=38.217422222222226&lon=140.97673055555555`;
			// const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

			// https://api.geoapify.com/v1/geocode/reverse?lat=33.5192&lon=130.5315388888889&format=json&apiKey=YOUR_API_KEY
			const apiKey = import.meta.env.VITE_GEOAPIFY_API;
			const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`;

			try {
				const response = await fetch(url);
				const data = await response.json();

				// photo.address = response.data.display_name;

				// console.log(
				// 	'osm_id: ' + data.osm_id,
				// 	'neighbourhood: ' + data.address.neighbourhood,
				// 	'city: ' + data.address.city,
				// 	'province: ' + data.address.province
				// );

				// return data.display_name;
				return data.results[0].formatted;
			} catch (err) {
				// error.value = 'Error fetching address information.';
				console.error('Geocoding error:', error);
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
		/* 
		padding-bottom: 80px;
		height: calc(100vh - 48px);
		overflow-y: scroll;
		*/

		nav + .lede {
			padding: 0 40px;

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

			.lowercase {
				text-transform: lowercase;
			}
		}

		details {
			font-family: 'HelveticaNowText', 'SF Pro', -apple-system,
				BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial,
				sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
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
		height: calc(100vh - 48px);

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
						.address {
							color: var(--color-heading);
							/* font-size: 14px; */
							font-size: 20px;
							line-height: 1.2;
							letter-spacing: -0.015em;
							max-width: 66.67%;
							padding: 8px 0 12px 0;
						}
					}

					section {
						font-size: 12px;
						padding: 16px 0 40px 0;
						font-feature-settings: 'ss01' on, 'zero' on;
						width: 100%;
						display: flex;
						overflow-x: scroll;

						.item-details {
							font-family: 'SF Pro', -apple-system, BlinkMacSystemFont,
								'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif,
								'Apple Color Emoji', 'Segoe UI Emoji';
							font-feature-settings: 'ss01' on, 'tnum' on, 'zero' on;
						}
						.item-details.item-date {
							min-width: 120px;
						}

						.item-gps {
							display: flex;
							flex-direction: row;
							gap: 0 24px;
						}

						.item-lat,
						.item-lon {
							.subhead + p {
								color: var(--color-heading);
								font-weight: 500;
							}
							.subhead + p + p {
								padding-bottom: 12px;
							}
						}

						.subhead {
							letter-spacing: 0.02em;
							font-variant: small-caps;
							color: var(--color-text);
							padding-bottom: 4px;
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
			/* min-height: 1%; */
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
				/* border-bottom: 1px solid var(--color-border-soft); */
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
