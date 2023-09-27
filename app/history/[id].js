import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

const History = () => {
    const { id } = useLocalSearchParams()
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>History id: {id}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default History;