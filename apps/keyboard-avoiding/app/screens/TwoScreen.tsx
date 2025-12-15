import Input from "@/components/Input";
import { Colors } from "@/constants/theme";
import { FlatList, KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TwoScreen = () => {
    const data: any[] = Array.from({ length: 20 }).fill("Turned it up should no valley cousin he. Speaking numerous ask did horrible packages set. Ashamed herself has distant can studied mrs. Led therefore its middleton perpetual fulfilled provision frankness. Small he drawn after among every three no. All having but you edward genius though remark one.")

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    padding: 10,
                    fontSize: 24,
                    fontWeight: 600,
                }}>Chat Messages</Text>

                <FlatList
                    data={data}
                    renderItem={({ item, index }: { item: string, index: number }) => {
                        const isMine = index % 2 == 1;
                        return (
                            <View style={{
                                backgroundColor: isMine ? Colors.light.tint : Colors.light.tabIconDefault,
                                padding: 8,
                                borderRadius: 10,
                                maxWidth: "80%",
                                alignSelf: isMine ? "flex-end" : "flex-start"
                            }}>
                                <Text>{item}</Text>
                            </View>
                        )
                    }}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        gap: 10,
                        paddingBottom: 100
                    }}
                    keyExtractor={(item, index) => item + index}
                    automaticallyAdjustKeyboardInsets
                >
                </FlatList>
                <KeyboardAvoidingView
                    // style={{
                    //     flex: 1,
                    // }}
                    behavior={"position"}
                    keyboardVerticalOffset={60}
                >
                    <Input></Input>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default TwoScreen;
