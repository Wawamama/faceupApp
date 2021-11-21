import React, { useState, useEffect, useContext } from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native'
import { Card, Badge } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GalleryContext } from '../contexts/GalleryContext'

const GalleryScreen = () => {
	const [name, setName] = useState('')
	const [gallery, setGallery] = useContext(GalleryContext)

	useEffect(() => {
		const getUser = async () => {
			await AsyncStorage.getItem('username', (error, data) => {
				if (data) {
					setName(data)
				}
			})
			await AsyncStorage.getItem('pictures', (err, data) => {
				if (data) {
					const pictures = JSON.parse(data)
					setGallery(pictures)
				}
			})
		}
		getUser()
	}, [])

	useEffect(() => {
		const getPictures = async () => {
			await AsyncStorage.setItem('pictures', JSON.stringify(gallery))
			console.log(gallery)
		}
		getPictures()
	}, [gallery])

	return (
		<View>
			<Text
				style={{
					fontSize: 24,
					textAlign: 'center',
					marginTop: 60,
				}}
			>
				{name}'s gallery
			</Text>

			<ScrollView style={{ marginTop: 10 }}>
				{gallery.map((photo, idx) => (
					<Card key={photo.id}>
						<Card.Image
							style={{ width: '100%', height: 170, marginBottom: 10 }}
							source={{ uri: photo.url }}
						/>
						{photo.tags && (
							<Badge status="success" value={photo.tags[0].gender} />
						)}
						{photo.tags && <Badge status="success" value={photo.tags[0].age} />}
					</Card>
				))}
			</ScrollView>
		</View>
	)
}

export default GalleryScreen
