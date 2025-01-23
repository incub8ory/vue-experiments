<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
      <h1 class="text-2xl font-bold mb-4 text-center text-gray-800">Photo Location Extractor</h1>
      
      <div class="mb-4">
        <label for="photo-upload" class="block text-sm font-medium text-gray-700 mb-2">
          Upload a photo
        </label>
        <input
          type="file"
          id="photo-upload"
          accept="image/*"
          @change="handleFileUpload"
          class="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
        />
      </div>

      <div v-if="loading" class="text-center text-gray-600">
        <span class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></span>
        <p class="mt-2">Processing...</p>
      </div>

      <div v-if="error" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
        <p>{{ error }}</p>
      </div>

      <div v-if="coordinates" class="mb-4">
        <h2 class="text-lg font-semibold mb-2 text-gray-700">Coordinates</h2>
        <p class="text-gray-600">Latitude: {{ coordinates.latitude }}</p>
        <p class="text-gray-600">Longitude: {{ coordinates.longitude }}</p>
      </div>

      <div v-if="address" class="mb-4">
        <h2 class="text-lg font-semibold mb-2 text-gray-700">Address</h2>
        <p class="text-gray-600">{{ address }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EXIF from 'exif-js'

const coordinates = ref(null)
const address = ref('')
const loading = ref(false)
const error = ref('')

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return

  loading.value = true
  error.value = ''
  coordinates.value = null
  address.value = ''

  EXIF.getData(file, function() {
    const lat = EXIF.getTag(this, "GPSLatitude")
    const lon = EXIF.getTag(this, "GPSLongitude")
    const latRef = EXIF.getTag(this, "GPSLatitudeRef") || "N"
    const lonRef = EXIF.getTag(this, "GPSLongitudeRef") || "E"

    if (lat && lon) {
      const latitude = convertDMSToDD(lat[0], lat[1], lat[2], latRef)
      const longitude = convertDMSToDD(lon[0], lon[1], lon[2], lonRef)
      coordinates.value = { latitude, longitude }
      fetchAddress(latitude, longitude)
    } else {
      loading.value = false
      error.value = "No GPS data found in the image."
    }
  })
}

const convertDMSToDD = (degrees, minutes, seconds, direction) => {
  let dd = degrees + minutes / 60 + seconds / (60 * 60)
  if (direction === "S" || direction === "W") {
    dd = dd * -1
  }
  return dd
}

const fetchAddress = async (lat, lon) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
    const data = await response.json()
    address.value = data.display_name
  } catch (err) {
    error.value = "Error fetching address information."
  } finally {
    loading.value = false
  }
}
</script>