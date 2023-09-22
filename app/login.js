import { View, Text, ScrollView, SafeAreaView, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Stack, Link } from 'expo-router';

const ScreenHeaderButton = ({ text, to }) => {
    return (
        <Link href={to} asChild >
            <TouchableOpacity>
                <Text>{text}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const Login = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderButton text="Menu" to="/learning" />,
                    headerRight: () => <ScreenHeaderButton text="Profile" to="/learning" />,
                    headerTitle: () => <ScreenHeaderButton text="LOGO" to="/home" />,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                    <ScreenHeaderButton text="Login (can click)" to="/learning" />  
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default Login;