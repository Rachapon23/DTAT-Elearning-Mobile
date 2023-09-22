import { View, Text, ScrollView, SafeAreaView, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Link, Stack } from 'expo-router';

const ScreenHeaderButton = ({ text, to }) => {
    return (
        <Link href={to} asChild >
            <TouchableOpacity>
                <Text>{text}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const AboutUs = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => <ScreenHeaderButton text="Back" to="/home" />,
                    // headerRight: () => <ScreenHeaderButton text="Profile" to="/learning" />,
                    headerTitle: () => <ScreenHeaderButton text="LOGO" to="/home" />,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                    <Text> About Us </Text>
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default AboutUs;