import React, { useEffect, useState } from "react";
import {
    TextInput,
    Text,
    Pressable,
    View,
    StyleSheet,
    StatusBar,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Switch,
    useColorScheme,
    ImageBackground,
    ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sun, Moon, FilePlusCorner } from "lucide-react-native";
import { useWindowDimensions } from "react-native";

const notesList = [
    {
        id: "1",
        title: "React State Management",
        createdAt: "2026-05-10",
        notes: "Learned about useState and useEffect hooks. Need to explore Zustand for global state management in larger projects."
    },
    {
        id: "2",
        title: "Portfolio Ideas",
        createdAt: "2026-05-08",
        notes: "Add smooth GSAP animations, project filtering, and a dark/light theme toggle for the portfolio redesign."
    },
    {
        id: "3",
        title: "YouTube Shorts Content",
        createdAt: "2026-05-06",
        notes: "Create piano visualizer shorts with romantic Bollywood intros. Focus on cinematic text animations and smooth transitions."
    },
    {
        id: "4",
        title: "Power BI Dashboard",
        createdAt: "2026-05-04",
        notes: "Need to optimize slicers and improve loading speed by reducing unnecessary calculated columns."
    },
    {
        id: "5",
        title: "VBA Automation",
        createdAt: "2026-05-02",
        notes: "Build a macro to consolidate allocation sheets from multiple Excel files into one workbook automatically."
    },
    {
        id: "6",
        title: "React Native Notes App",
        createdAt: "2026-04-30",
        notes: "Need to improve responsive layouts for tablets and landscape mode using useWindowDimensions and flexible card grids."
    },
    {
        id: "7",
        title: "UI Animation Ideas",
        createdAt: "2026-04-28",
        notes: "Experiment with GSAP inspired animations in React Native using Reanimated for smooth transitions and gestures."
    },
    {
        id: "8",
        title: "Discord Community Setup",
        createdAt: "2026-04-25",
        notes: "Create separate channels for web development, UI inspiration, coding help, and project showcases."
    },
    {
        id: "9",
        title: "Color Palette Feature",
        createdAt: "2026-04-22",
        notes: "Implement automatic text color suggestions based on extracted background colors for better accessibility."
    },
    {
        id: "10",
        title: "LeetCode Clone Planning",
        createdAt: "2026-04-20",
        notes: "Need problem categories, difficulty filters, markdown editor support, and code execution integration."
    }
];

const filterSearchData = (data, text) => {
    return data.filter(
        item =>
            item.title.toLowerCase().includes(text.toLowerCase()) ||
            item.notes.toLowerCase().includes(text.toLowerCase())
    );
};

const themeColorsData = {
    light: {
        background: "#ffffff",
        text: "#111827",
        subText: "#6b7280",
        cardBg: "#f4f6f6",
        cardBorder: "#e5e7eb",
        noteBg: "#f4f6f6"
    },

    dark: {
        background: "#000000",
        text: "#ffffff",
        subText: "#9ca3af",
        cardBg: "#141416",
        cardBorder: "#1f2937",
        noteBg: "#141416"
    }
};
const formatted = dateString => {
    const date = new Date(dateString);
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);

    return `${day} ${month} ${year}`;
};

export default function Index() {
    const [text, setText] = useState("");
    const [selectedNote, setSelectedNote] = useState("");
    const [isSelected, setIsSelected] = useState(false);
    const systemTheme = useColorScheme();
    const [enabled, setEnabled] = useState(systemTheme === "dark");
    const [manualTheme, setManualTheme] = useState(true);
    const { width, height } = useWindowDimensions();
    const isLandscape = width > height;
    const theme = enabled ? themeColorsData.dark : themeColorsData.light;

    const noteBgSource = enabled
        ? require("../../assets/images/noteBgDark.png")
        : require("../../assets/images/noteBgLight.png");

    const Item = ({ item }) => (
        <Pressable
            style={[
                styles.card,
                { backgroundColor: theme.cardBg, color: "white" }
            ]}
            onPress={() => openNote(item)}
        >
            <Text style={[styles.title, { color: theme.text }]}>
                {item.title}
            </Text>
            <Text style={[styles.createdAt, { color: theme.subText }]}>
                created at: {formatted(item.createdAt)}
            </Text>
            <Text
                numberOfLines={2}
                ellipsizeMode="tail"
                style={[styles.noteArea, { color: theme.text }]}
            >
                {item.notes}
            </Text>
        </Pressable>
    );

    const viewNotes = () => {};

    const notesDataTobeRendered =
        text == "" ? notesList : filterSearchData(notesList, text);

    const openNote = item => {
        setSelectedNote(item);
        setIsSelected(true);
    };

    const backToList = item => {
        setSelectedNote("");
        setIsSelected(false);
    };

    return (
        <SafeAreaView
            style={[styles.container, { backgroundColor: theme.background }]}
        >
            <StatusBar barStyle={enabled ? "light-content" : "dark-content"} />
            <View
                style={[
                    styles.viewOne,
                    { display: !isSelected ? "flex" : "none" }
                ]}
            >
                <ImageBackground
                    source={noteBgSource}
                    resizeMode="contain"
                    style={[
                        imageStyles.image,
                        { aspectRatio: isLandscape ? 21 / 6 : 16 / 9 }
                    ]}
                />
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        gap: 10,
                        alignItems: "center",
                        zIndex: 10
                    }}
                >
                    <TextInput
                        style={[styles.input, { color: theme.text }]}
                        placeholder="Type something..."
                        onChangeText={setText}
                        value={text}
                        placeholderTextColor={theme.text}
                    />
                    <Pressable
                        onPress={() => setEnabled(!enabled)}
                        style={[
                            switchStyles.switchContainer,
                            enabled
                                ? switchStyles.switchOn
                                : switchStyles.switchOff
                        ]}
                    >
                        <View
                            style={[
                                switchStyles.thumb,
                                enabled
                                    ? switchStyles.thumbRight
                                    : switchStyles.thumbLeft
                            ]}
                        >
                            {enabled ? (
                                <Moon size={14} color="#000" />
                            ) : (
                                <Sun size={14} color="#f59e0b" />
                            )}
                        </View>
                    </Pressable>
                </View>
                <FlatList
                    data={notesDataTobeRendered}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item.id}
                    style={{
                        flex: 1
                    }}
                    // numColumns={isLandscape ? 2 : 1}
                    contentContainerStyle={{
                        paddingVertical: 12,
                        gap: 12
                    }}
                />
            </View>
            <KeyboardAvoidingView
                style={[
                    styles.viewTwo,
                    {
                        display: isSelected ? "flex" : "none",
                        color: theme.text,
                        backgroundColor: theme.noteBg
                    }
                ]}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{ backgroundColor: theme.noteBg }}>
                    <TextInput style={[styles.title, { color: theme.text }]}>
                        {selectedNote.title}
                    </TextInput>
                    <Text
                        style={[
                            styles.createdAt,
                            { color: theme.subText, paddingLeft: 5 }
                        ]}
                    >
                        Created at : {formatted(selectedNote.createdAt)}
                    </Text>
                    <TextInput
                        multiline
                        numberOfLines={5}
                        editable
                        style={{ color: theme.text }}
                    >
                        {selectedNote.notes}
                    </TextInput>
                </View>
                <View style={styles.actionButtons}>
                    <Pressable
                        style={saveBtnCombined}
                        onPress={() =>
                            alert(`Target id is : ${selectedNote.id}
yet to learn about storage
                        `)
                        }
                    >
                        <Text>Save</Text>
                    </Pressable>
                    <Pressable style={backBtnCombined} onPress={backToList}>
                        <Text>Back</Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
            <Pressable
                style={{
                    alignItems: "center",
                    display: !isSelected ? "flex" : "none"
                }}
                onPress={() => alert("Yet to learn about storage")}
            >
                <FilePlusCorner color={theme.text} />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    viewOne: {
        flex: 1,
        display: "flex",
        paddingBottom: 10,
        gap: 10
    },
    viewTwo: {
        flex: 1,
        display: "flex",
        padding: 10,
        justifyContent: "space-between",

        borderRadius: 10
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 16,
        fontWeight: "bold"
    },
    createdAt: {
        fontSize: 12
    },
    noteArea: {
        fontStyle: "italic"
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        flex: 1,
        borderRadius: 10
    },
    actionButtons: {
        flex: 0,
        alignItems: "flex-start",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        borderRadius: 5,
        padding: 10,
        width: 60,
        alignItems: "center",
        backgroundColor: "white"
    },
    saveBtn: { backgroundColor: "#69f421" },
    backBtn: { backgroundColor: "#ffb215" }
});

const imageStyles = StyleSheet.create({
    image: {
        width: "100%",
        aspectRatio: 16 / 9
    }
});

const switchStyles = StyleSheet.create({
    switchContainer: {
        width: 64,
        height: 32,
        borderRadius: 20,
        paddingHorizontal: 4,
        justifyContent: "center"
    },

    switchOn: {
        backgroundColor: "#252525"
    },

    switchOff: {
        backgroundColor: "#c0c0c0"
    },

    thumb: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },

    thumbLeft: {
        alignSelf: "flex-start"
    },

    thumbRight: {
        alignSelf: "flex-end"
    }
});

const saveBtnCombined = StyleSheet.flatten([styles.btn, styles.saveBtn]);
const backBtnCombined = StyleSheet.flatten([styles.btn, styles.backBtn]);
