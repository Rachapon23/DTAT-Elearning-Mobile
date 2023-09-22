import { Tabs } from "expo-router";

const TabsLayout = () => {
    return (
        <Tabs >
            <Tabs.Screen name="learning" />
            <Tabs.Screen name="history" />
            <Tabs.Screen name="exit" options={{ href: '/home', tabBarLabel: 'home' }} />
            <Tabs.Screen name="calendar" />
            <Tabs.Screen name="browse-course" />
        </Tabs>
    )
}

export default TabsLayout;