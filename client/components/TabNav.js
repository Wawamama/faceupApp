import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo } from '@expo/vector-icons'
import GalleryScreen from '../screens/GalleryScreen'
import SnapScreen from '../screens/SnapScreen'

const Tab = createBottomTabNavigator()

const TabNav = props => {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => {
					let iconName
					if (route.name === 'Gallery') {
						iconName = 'images'
					} else if (route.name === 'Snap') {
						iconName = 'camera'
					}
					return <Entypo name={iconName} size={24} color={color} />
				},
				tabBarStyle: { backgroundColor: '#111224' },
				tabBarActiveTintColor: '#009788',
				tabBarInactiveTintColor: '#ffffff',
			})}
		>
			<Tab.Screen
				options={{ headerShown: false }}
				name="Gallery"
				component={GalleryScreen}
			/>
			<Tab.Screen
				options={{ headerShown: false }}
				name="Snap"
				component={SnapScreen}
			/>
		</Tab.Navigator>
	)
}

export default TabNav
