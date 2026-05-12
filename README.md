# 📝 Notes App - React Native

A clean and responsive Notes App built using React Native.  
This project focuses on modern UI design, responsive layouts, dark/light mode support, and smooth note browsing experience.

---

## ✨ Features

- 📒 View notes in card layout
- 🔍 Search notes by title or content
- 🌗 Dark / Light theme toggle
- 📱 Responsive layout using `useWindowDimensions`
- 🖼 Custom header background images
- 📝 Open and view full notes
- ⚡ Optimized rendering using `FlatList`
- 🎨 Modern minimal UI

---

## 🛠 Tech Stack

- React Native
- Expo
- JavaScript
- React Native Safe Area Context
- Lucide React Native Icons

---

## 📂 Folder Structure

```txt
assets/
 └── images/
      ├── noteBgDark.png
      ├── noteBgLight.png

app/
 └── index.jsx
```

---

## 🚀 Installation

Clone the repository:

```bash
git clone <your-repo-url>
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

---

## 🎨 Theme System

The app supports dynamic theme switching using:

```js
useColorScheme()
```

Custom theme colors are managed through:

```js
themeColorsData
```

---

## 📱 Responsive Design

Responsive layouts are implemented using:

```js
useWindowDimensions()
```

Features include:

- Landscape support
- Tablet optimization
- Dynamic image ratios
- Adaptive layouts

---

## 📋 Current Limitations

- No persistent storage yet
- Notes are currently static data
- Create/Edit/Delete features are not fully implemented

---

## 🔮 Future Improvements

- AsyncStorage / SQLite integration
- Add new notes
- Edit existing notes
- Delete notes
- Categories & tags
- Markdown support
- Rich text editor
- Cloud sync

---

## 👨‍💻 Author

Built by Deepak A Poojary using React Native & Expo.
