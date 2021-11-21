import React, { useState } from 'react'
import { StyleSheet, Text, View, LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ThemeProvider } from 'react-native-elements'
import TabNav from './components/TabNav'
import HomeScreen from './screens/HomeScreen'
import { GalleryProvider } from './contexts/GalleryContext'
import 'react-native-gesture-handler'

LogBox.ignoreLogs(['Warning: ...'])

const Stack = createStackNavigator()
export const PhotoContext = React.createContext()

const theme = {
	colors: {
		primary: '#009788',
	},
}

export default function App() {
	return (
		<ThemeProvider theme={theme}>
			<NavigationContainer>
				<GalleryProvider>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Nav" component={TabNav} />
					</Stack.Navigator>
				</GalleryProvider>
			</NavigationContainer>
		</ThemeProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
