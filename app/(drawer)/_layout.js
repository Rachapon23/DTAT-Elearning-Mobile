import Drawer from "expo-router/drawer";
import { Text, View, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";
import Theme1 from "theme/Theme1";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { router, usePathname } from "expo-router";

const getStorageValue = async (key) => {
    const value = await SecureStore.getItemAsync(key);
    if (value) {
        return value
    }
    return null;
}


const UserDrawer = (change) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [employee, setEmployee] = useState(null);
    const [role, setRole] = useState(null);
    const [activePage, setActivePage] = useState(null);
    const path = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(null);

    const HeaderDrawer = () => {
        StatusBar.setBackgroundColor('#9fbbf6')
        return (
            <View style={{
                paddingTop: StatusBar.currentHeight - 20,
                backgroundColor: "#9fbbf6",
            }} />
        )
    }

    const DrawerContent = () => {
        return (
            <View style={{
                // paddingTop: StatusBar.currentHeight + 20,
                // paddingLeft: 20,
                flex: 1,
                // justifyContent: 'space-between',
            }}>
                <View
                    style={{
                        paddingTop: StatusBar.currentHeight + 20,
                        backgroundColor: "#9fbbf6",
                        paddingBottom: 15,
                    }}
                >
                    <View style={{ display: "flex", flexDirection: "row", paddingLeft: 20 }}>
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 1000,
                            borderColor: "#778cb8",
                            borderWidth: 1,
                            paddingLeft: 20,
                            backgroundColor: "#778cb8",
                            justifyContent: "center",
                        }}
                        >
                            <Text style={{ fontSize: 16 }}>
                                {firstname ? String(firstname).substring(0, 1).toUpperCase() : 'U'}
                            </Text>
                        </View>
                        <View style={{ width: "80%", paddingTop: 2, paddingLeft: 10, display: "flex" }}>
                            <Text ellipsizeMode='tail' numberOfLines={1} style={{ fontSize: 17, fontWeight: "500" }}> {firstname} {lastname}</Text>
                            <Text> {employee} </Text>
                        </View>
                    </View>
                </View>

                <View style={{ paddingHorizontal: 20, paddingTop: 20, display: "flex", flexDirection: "row" }}>
                    <Text >Role as </Text>
                    <Text style={{ fontWeight: "500" }}>{String(role).substring(0, 1).toUpperCase() + String(role).substring(1)}</Text>
                </View>

                <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 15 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: "#d6d6d6" }} />
                </View>

                <DrawerItem activePage={activePage} name={"homein"} title={'Home'} icon={'home-outline'} to={'/homein'} />
                <DrawerItem activePage={activePage} name={"learning"} title={'Learning'} icon={'book-outline'} to={'/learning'} />
                <DrawerItem activePage={activePage} name={"history"} title={'History'} icon={'list-outline'} to={'/history'} />
                <DrawerItem activePage={activePage} name={"calendar"} title={'Calendar'} icon={'calendar-outline'} to={'/calendar'} />
                <DrawerItem activePage={activePage} name={"browse-course"} title={'Browse Course'} icon={'search-outline'} to={'/browse-course'} />

                <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 15 }}>
                    <View style={{ borderBottomWidth: 1, borderColor: "#d6d6d6" }} />
                </View>

                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity style={{ paddingHorizontal: 20, paddingTop: 10, display: "flex", flexDirection: "row" }} onPress={async () => await logout()}>
                        <Ionicons name={"log-out-outline"} size={20} />
                        <Text style={{ paddingLeft: 10 }}>Log out</Text>
                    </TouchableOpacity>
                </View>

            </View >
        )
    }



    const navigate = (name, to) => {
        setActivePage(name);
        if (!to) return
        router.replace(to);
    }

    const DrawerItem = ({ activePage, name, title, active, icon, to }) => {
        active = active ? active : (name === activePage)
        const backgroundColor = active ? 'tomato' : 'transparent'
        return (
            <View style={{ backgroundColor: backgroundColor, marginHorizontal: 10, borderRadius: 5 }}>
                <TouchableOpacity onPress={() => navigate(name, to)} style={{ paddingHorizontal: 20, paddingTop: 10, paddingBottom: 10, display: "flex", flexDirection: "row" }}>
                    <Ionicons name={icon} size={20} />
                    <Text style={{ paddingTop: 1, paddingLeft: 10 }}>{title}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync("token")
        await SecureStore.deleteItemAsync("file_token")
        await SecureStore.deleteItemAsync("firstname")
        await SecureStore.deleteItemAsync("role")
        await SecureStore.deleteItemAsync("user_id")
        router.push('/home');
    }

    const renderContent = () => {
        return <Theme1 content={DrawerContent()} />
    }

    const checkLogin = async () => {
        const token = await getStorageValue("token");
        const role = await getStorageValue("role");
        const firstname = await getStorageValue("firstname")
        const lastname = await getStorageValue("lastname")
        const employee = await getStorageValue("employee")
        setIsLoggedIn(token ? true : false);
        setFirstName(firstname ? firstname : 'No data');
        setLastName(lastname ? lastname : 'No data');
        setEmployee(employee ? employee : 'xxxxxxx')
        setRole(role ? role : 'No data');
    }

    useEffect(() => {
        setActivePage(path.substring(1))
        checkLogin()
    }, [change])

    // console.log('e',e)

    return (
        <Drawer
            drawerContent={renderContent}
            screenOptions={{
                header: () => <HeaderDrawer />,
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                swipeEdgeWidth: 0,
                swipeEnabled: isLoggedIn,
            }}
        >
        </Drawer>
    )
}
export default UserDrawer;