import { Stack, router, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import useFetch from "../../hook/useFetch";

const ScreenHeaderButton = ({ text, onPress }) => {

    const handlePress = () => onPress();


    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
}

const Details = () => {
    const params = useLocalSearchParams()
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(null);
    const { data, isLoading, error, refetch } = useFetch('list-plant')

    const onRefresh = () => {

    }

    const displayData = () => {
        if (isLoading) return <ActivityIndicator size={'large'} />
        if(error) return <Text>Something wrong</Text>
        return (
            <View>
                <Text>{params?.id}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView>
            <Stack.Screen
                options={{
                    headerLeft: () => <ScreenHeaderButton text={'Back'} onPress={() => router.back()} />,
                    headerTitle: '',
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {displayData()}
                </ScrollView>
            </>
        </SafeAreaView>
    )
}

export default Details;