import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import useFetch from '../hook/useFetch';

const ScreenHeaderButton = ({ text, to }) => {
    return (
        <Link href={to} asChild>
            <TouchableOpacity>
                <Text>{text}</Text>
            </TouchableOpacity>
        </Link>
    )
}

const Welcome = () => {
    const router = useRouter();
    const mock = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    return (
        <View>
            <Text style={{ fontWeight: '500', fontSize: 20 }}> Find Some Interesting Course </Text>

            <View style={{ paddingTop: 10, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: '75%' }}>
                    <TextInput
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 15,
                            backgroundColor: 'white',
                            borderCurve: 'circular',
                            borderRadius: 5,
                        }}
                        value=''
                        placeholder='Search Course'
                    />
                </View>
                <View style={{ width: '20%', }}>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderColor: 'black', backgroundColor: '#33adff', height: '100%', borderRadius: 12 }}>
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ paddingTop: 10 }}>
                <FlatList
                    data={mock}
                    renderItem={({ item }) => (
                        <View style={{ padding: 2 }}>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'black',
                                    backgroundColor: 'white',
                                }}
                                onPress={() => {
                                    router.push(`/search/${item}`)
                                }}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={item => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const PopularCourse = () => {
    const router = useRouter();
    const state = true;
    // const error = false;
    const mock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const { data, isLoading, error, refetch } = useFetch('list-plant')


    const displayData = () => {
        if (!state) return <ActivityIndicator size='large' />
        if (error) return <Text> Something went wrong </Text>
        return (
            <FlatList
                data={mock}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => router.push(`/details/${item}`)}
                    >
                        <Text>{item}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item}
            />
        )
    }

    return (
        <View style={{ paddingTop: 10 }}>
            <View>
                <Text style={{ fontSize: 20, fontWeight: '400' }}>Course</Text>
            </View>
            <View>
                {
                    displayData()
                }
            </View>
        </View >
    )
}

const HomeBk = () => {
    const router = useRouter();
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
                <View style={{ flex: 1, padding: 10 }}>
                    <Welcome />
                    <PopularCourse />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}

const Home = () => {
    const router = useRouter();
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: '',
                    headerShadowVisible: false,
                    headerLeft: () => <ScreenHeaderButton text="Menu" to="/learning" />,
                    headerRight: () => <ScreenHeaderButton text="Login" to="/login" />,
                    headerTitle: () => <ScreenHeaderButton text="LOGO" to="/home" />,
                }}
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flex: 1, padding: 10, alignItems: 'center' }}>
                    <Text> Home </Text>
                    <ScreenHeaderButton text="About Us (can click)" to="/about-us" />
                </View>
            </ScrollView>

        </SafeAreaView>
    )
}
export default Home;