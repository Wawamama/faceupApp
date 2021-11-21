const express = require('express')
const fileUpload = require('express-fileupload')
const uniqid = require('uniqid')
const cloudinary = require('cloudinary').v2
const fs = require('fs')
const request = require('sync-request')

const router = express.Router()

cloudinary.config({
	cloud_name: 'daxjdptqt',
	api_key: '447328635917646',
	api_secret: 'g_fmY0U2ZKqzpYe7UaIV3NiFDYU',
})

const fetchFaceAPI = async imgUrl => {
	console.log('fetching faceAPI')
	const options = {
		json: {
			apiKey: '5c0a5d392c1745d2ae84dc0b1483bfd2',
			image: imgUrl,
		},
	}
	const resultDetectionRaw = await request(
		'POST',
		'https://lacapsule-faceapi.herokuapp.com/api/detect',
		options
	)
	let resultDetection = await resultDetectionRaw.body
	resultDetection = await JSON.parse(resultDetection)
	//console.log(resultDetection)
	return resultDetection
}

router.post('/', async (req, res, next) => {
	try {
		console.log('you reached the upload post route')
		if (!req.files) {
			return res.status(400).send('No files were uploaded.')
		}

		const imagePath = `./temp/${uniqid()}.jpg`
		const resultCopy = await req.files.picture.mv(imagePath)

		if (!resultCopy) {
			const resultCloudinary = cloudinary.uploader.upload(
				imagePath,
				async (error, result) => {
					try {
						const faceInfos = await fetchFaceAPI(result.url)
						res.json({
							status: 'success',
							message: 'File uploaded!',
							data: result,
							face: faceInfos,
						})
					} catch (err) {
						console.log(err)
					}
				}
			)

			fs.unlinkSync(imagePath)
		} else {
			res.json({ status: 'fail', message: resultCopy })
		}
	} catch (err) {
		console.log(err)
		res.json({ status: 'fail', message: err.message })
	}
})

module.exports = router
