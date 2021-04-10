import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
// import DrawerNavigator from './drawer'
import TabNavigator from './tabs'
import { HomeNavigator } from './stacks'

export default () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)
