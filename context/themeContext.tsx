import { useColorScheme } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LightTheme = {
    dark: false,
    colors: {
        bg: '#ffffff',
        text: '#000000'
    }
}

const DarkTheme = {
  dark: true,
  colors: {
    bg: '#000000',
    text: '#ffffff'
  }
}

const ThemeContext = React.createContext({
  theme: LightTheme,
  toggleTheme: () => {}
})

export const useTheme = () => React.useContext(ThemeContext) // always return as function not a variable

export const ThemeProvider = ({children}: any) => {

  const systemColorTheme = useColorScheme()
  const [theme, setTheme] = React.useState(systemColorTheme === 'dark' ? DarkTheme : LightTheme)

  const toggleTheme = async () => {
    const newTheme = theme === DarkTheme ? LightTheme : DarkTheme
    setTheme(newTheme)
    await AsyncStorage.setItem('userTheme', newTheme.dark ? 'dark' : 'light')
  }

  React.useEffect(() => {
    const loadTheme = async () => {
      const storeTheme = await AsyncStorage.getItem('userTheme')
      if (storeTheme) {
        setTheme(storeTheme === 'dark' ? DarkTheme : LightTheme)
      } else {
        setTheme(systemColorTheme === 'dark' ? DarkTheme : LightTheme)
      }
    }
    loadTheme()
  }, [])

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}