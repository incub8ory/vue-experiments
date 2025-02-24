<template>
	<div class="project-container" id="stamp-collector">
		<div class="sidebar">
			<SecondaryNavigation :projectID="this.projectID" />

			<div class="lede">
				<h2>{{ this.getProjectTitle(this.projectID) }}</h2>
				<p>
					A catalog of {{ this.ekiStampsDataStore.length }} souvenir eki stamps
					(駅スタンプ) collected over the years at train stations and other
					locations in Japan
				</p>
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
						<img
							:src="this.$store.state.baseURL + image.src"
							:alt="image.title"
							class="photo"
						/>
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
			// For subnav and displaying proj title
			projectID: '06',
		};
	},
	mounted() {
		this.ekiStampsDataStore.forEach((image) => {
			console.log('image src: ' + this.$store.state.baseURL + image.src);
			// this.getExifrGPS(image.src);
			this.getExifrGPS(this.$store.state.baseURL + image.src);
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

		// use exifr rather than exif-js to get GPS lat, long, date
		async getExifrGPS(imageSrc) {
			// const file = event.target.files[0];
			// const image = this.images.find((img) => img.src === imageSrc);
			const image = this.ekiStampsDataStore.find(
				(img) => this.$store.state.baseURL + img.src === imageSrc
			);
			const imgElement = new Image();

			try {
				const exifData = await exifr.gps(imageSrc);
				const dateStamp = await exifr.parse(imageSrc, ['GPSDateStamp']);
				if (exifData && exifData.latitude && exifData.longitude) {
					const latitude = exifData.latitude;
					const longitude = exifData.longitude;

					// console.log('dateStamp.GPSDateStamp: ' + dateStamp.GPSDateStamp);
					image.date = this.convertExifDate(dateStamp.GPSDateStamp);

					this.fetchAddress(latitude, longitude)
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

		// Use nominatim instead of opencage to reverse-geocode address
		async fetchAddress(latitude, longitude) {
			// 	url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=38.217422222222226&lon=140.97673055555555`;
			const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

			try {
				const response = await fetch(url);
				const data = await response.json();
				// photo.address = response.data.display_name;
				console.log(
					'osm_id: ' + data.osm_id,
					'neighbourhood: ' + data.address.neighbourhood,
					'city: ' + data.address.city,
					'province: ' + data.address.province
				);
				return data.display_name;
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
		padding-bottom: 80px;

		nav + div {
			padding: 0 40px;

			h2 {
				color: var(--color-heading);
				font-size: 36px;
				/* letter-spacing: -0.03em; */
				line-height: 40px;
				padding-bottom: 36px;
				padding-top: 36px;
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
