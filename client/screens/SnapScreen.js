import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import { Button, Overlay } from 'react-native-elements'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GalleryContext } from '../contexts/GalleryContext'
import {
	PinchGestureHandler,
	GestureHandlerRootView,
} from 'react-native-gesture-handler'

const SnapScreen = () => {
	const [hasPermission, setHasPermission] = useState(false)
	const [type, setType] = useState(Camera.Constants.Type.back)
	const [flashOn, setFlashOn] = useState(Camera.Constants.FlashMode.off)
	const [gallery, setGallery] = useContext(GalleryContext)
	const isFocused = useIsFocused()
	let cameraRef = useRef(null)
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		;(async () => {
			const { status } = await Camera.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	const handleSnap = async () => {
		let formData = new FormData()

		setIsLoading(true)
		if (cameraRef) {
			let photo = await cameraRef.takePictureAsync({
				quality: 0.7,
				base64: true,
				exif: true,
			})

			formData.append('picture', {
				uri: photo.uri,
				type: 'image/jpeg',
				name: 'picFromPhone.jpg',
			})

			const rawResponse = await fetch('http://172.17.1.176:3000/upload', {
				method: 'post',
				body: formData,
			})
			const response = await rawResponse.json()

			setGallery(prevGallery => [
				...prevGallery,
				{
					url: response.data.url,
					id: response.data.asset_id,
					tags: response.face.detectedFaces,
				},
			])

			if (response.status === 'success') {
				setIsLoading(false)
			}
		}
	}

	const handlePinch = e => {
		e.preventDefault()
		console.log('pinch')
		console.log(e.nativeElement.scale)
	}

	// Return if permission
	if (hasPermission && isFocused) {
		return (
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Camera
					style={{
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'flex-end',
					}}
					type={type}
					ref={ref => (cameraRef = ref)}
					flashMode={flashOn}
				>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginBottom: '2%',
							marginLeft: '2%',
						}}
					>
						<TouchableOpacity
							onPress={() => {
								setType(
									type == Camera.Constants.Type.back
										? Camera.Constants.Type.front
										: Camera.Constants.Type.back
								)
							}}
						>
							<Ionicons
								name="ios-camera-reverse-sharp"
								size={44}
								color="white"
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => {
								setFlashOn(
									flashOn == Camera.Constants.FlashMode.off
										? Camera.Constants.FlashMode.torch
										: Camera.Constants.FlashMode.off
								)
							}}
						>
							<Ionicons name="md-flash" size={44} color="white" />
						</TouchableOpacity>
					</View>
					<Overlay isVisible={isLoading}>
						<Text>Loading...</Text>
					</Overlay>
				</Camera>
				<Button
					icon={<Ionicons name="ios-save-outline" size={24} color="white" />}
					title="snap"
					onPress={() => handleSnap()}
				/>
			</GestureHandlerRootView>
		)
	} else {
		return <View style={{ flex: 1 }} />
	}
}

export default SnapScreen
