import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Exam = () => {
    const { id } = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Exam id: {id}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Exam;