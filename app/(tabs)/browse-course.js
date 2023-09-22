import { Link, Stack } from "expo-router";
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";

const ScreenHeaderButton = ({ text, to }) => {
    return (
        <Link href={to} asChild >
            <TouchableOpacity>
                <Text>{text}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const BrowseCourse = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    headerShadowVisible: false,
                    // headerLeft: () => <ScreenHeaderButton text="Menu" to="/learning" />,
                    // headerRight: () => <ScreenHeaderButton text="Profile" to="/learning" />,
                    headerTitle: () => <ScreenHeaderButton text="LOGO" to="/home" />,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                    <Text> BrowseCourse </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BrowseCourse;