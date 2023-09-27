import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const Enroll = () => {
    const { id } = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Enroll id: {id}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Enroll;