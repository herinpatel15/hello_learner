import { View, Text } from 'react-native'
import React from 'react'
import * as SecureStore from 'expo-secure-store'
import { Redirect } from 'expo-router'

const index = () => {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const validUser = async () => {
            try {
                const token = SecureStore.getItem('token')
                setIsLoggedIn(!!token)
            } catch (err) {
                console.log(err)
                setIsLoggedIn(false)
            } finally {
                setLoading(false)
            }
        }
        validUser()
    }, [])

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (isLoggedIn) {
        return <Redirect href="./(tabs)/index" />;
    }

    return <Redirect href="./(routes)/onBoarding" />;
};

// return (
//     <>
//         {isLoggedIn ? (
//             <Redirect href="./(tabs)/index" />
//         ) : (
//             <Redirect href="./(routes)/onBoarding" />
//         )}
//     </>
// )

export default index