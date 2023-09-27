import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Course = () => {
    const { id } = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Course id: {id}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Course;