import React, { useState, useEffect } from 'react'
import { View, ImageBackground, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HomeScreen = props => {
	const [name, setName] = useState('')
	const [isBack, setIsBack] = useState(false)

	useEffect(() => {
		const saveUser = async () => {
			await AsyncStorage.getItem('username', (error, data) => {
				if (data) {
					setIsBack(true)
					setName(data)
				}
			})
		}
		saveUser()
	}, [])

	// Input field
	let welcomeField
	if (isBack) {
		welcomeField = <Text style={styles.welcomeText}>Welcome back {name}</Text>
	} else {
		welcomeField = (
			<Input
				leftIcon={<Icon name="user" size={24} color="#009788" />}
				onChangeText={value => setName(value)}
				value={name}
				placeholder="Toto"
			/>
		)
	}

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<ImageBackground
				source={require('./../assets/home.jpg')}
				resizeMode="cover"
				style={styles.image}
			>
				{welcomeField}
				<Button
					buttonStyle={{ height: 60, width: 200 }}
					color="#009788"
					title="Go To Gallery"
					onPress={() => {
						AsyncStorage.setItem('username', name)
						props.navigation.navigate('Nav', { screen: 'GalleryScreen' })
					}}
				/>

				{isBack && (
					<Button
						color="#F44336"
						title={`Not ${name}? Disconnect`}
						buttonStyle={{
							backgroundColor: '#FF7777',
							marginTop: 60,
						}}
						onPress={() => {
							AsyncStorage.removeItem('username')
							setIsBack(false)
						}}
					/>
				)}
			</ImageBackground>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	welcomeText: {
		fontSize: 24,
		marginBottom: 20,
		fontWeight: 'bold',
		color: '#0b4d4b',
	},
})

export default HomeScreen
