#  Real-Time Notification Feed Mobile App

A React Native mobile application built with Expo that displays a real-time notification feed with WebSocket integration using Socket.io.

## Project Overview

This is a technical evaluation project that demonstrates:
- Real-time notification updates using Socket.io
- Responsive mobile UI design
- TypeScript implementation
- Cross-platform compatibility (iOS, Android, Web)

## Tech Stack

- **React Native** - Cross-platform mobile framework
- **Expo** - Development platform
- **TypeScript** - Type-safe JavaScript
- **Socket.io-client**  - WebSocket communication
- **React Native Safe Area Context**  - Safe area handling

## Features

### Core Functionality
- Real-time notification feed with instant updates  
- Socket.io connection with visual status indicator  
- Mark notifications as read/unread  
- Timestamp formatting (relative time display)  
- Smooth scrolling with optimized FlatList  

### Responsive Design
- Portrait and landscape orientation support  
- Adapts to all mobile screen sizes (iPhone SE to Pro Max)  
- Real-time layout updates on device rotation  
- Safe area support for notched devices  

### UI/UX
- Clean, modern interface with blue color scheme  
- Visual read/unread indicators (blue dots)  
- Connection status badge (green/red)  
- Empty state with helpful instructions  
- Touch feedback on interactions  

##  Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Expo Go** app on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Peterodero/RealTimeNotification.git
   cd notification-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or if you use yarn:
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   
   **Option A: Physical Device (Recommended)**
   - Open Expo Go app on your phone
   - Scan the QR code displayed in the terminal
     - **iOS:** Use the Camera app
     - **Android:** Use the Expo Go app's QR scanner
   
   **Option B: iOS Simulator (Mac only)**
   ```bash
   # Press 'i' in the terminal after starting the server
   # Or run:
   npm run ios
   ```
   
   **Option C: Android Emulator**
   ```bash
   # Press 'a' in the terminal after starting the server
   # Or run:
   npm run android
   ```

## Testing Real-Time Functionality

The app uses a **mock Socket.io connection** for demonstration purposes (Option A from the requirements). This makes it easy to test without setting up a backend server.

### Method 1: Built-in Simulate Button (Primary Method)

1. **Launch the app** on your device or simulator
2. **Observe the connection status** - You should see a green "Connected" badge at the top
3. **Tap the blue button** at the bottom: "Simulate New Notification"
4. **Watch the notification appear** instantly at the top of the list
5. **Tap any notification** to mark it as read (the blue dot turns gray)
6. **Repeat** to add more notifications and test the scrolling

### Method 2: Using React Native Debugger (Advanced)

1. Start the app in development mode
2. Press `j` in the terminal to open Chrome DevTools
3. In the console, you can manually trigger events:
   ```javascript
   // The app automatically connects on load
   console.log("Connection status: Connected");
   ```

### Expected Behavior

**On App Launch:**
- Connection status shows "Connected" (green dot)
- Empty state message appears
- "Simulate New Notification" button is visible

**When Simulating Notification:**
- New notification appears at the **top** of the list instantly
- Notification has a **blue dot** (unread indicator)
- **Timestamp** shows "Just now"
- **No page refresh** required

**When Tapping Notification:**
- Blue dot changes to gray (read state)
- Background color changes from light blue to white
- Text weight changes from bold to normal

**Timestamp Updates:**
- "Just now" (< 1 minute)
- "5m ago" (< 1 hour)
- "2h ago" (< 24 hours)
- Full date (> 24 hours)

## 📱 Responsive Design Testing

### Test Portrait Mode
1. Launch app in portrait (default)
2. Verify header displays with title and connection status stacked vertically
3. Check that text is readable and properly sized

### Test Landscape Mode
1. **Rotate device** to landscape while app is running
2. **Observe changes:**
   - Header becomes more compact
   - Title and connection status appear in the same row
   - Vertical spacing is reduced
   - More notifications are visible on screen

### Test Different Device Sizes

**Small Device (iPhone SE):**
```bash
# In iOS Simulator, select "iPhone SE (3rd generation)"
```
- Smaller font sizes
- Reduced padding
- Everything fits without overflow

**Large Device (iPhone 15 Pro Max):**
```bash
# In iOS Simulator, select "iPhone 15 Pro Max"
```
- Optimal spacing
- Larger touch targets
- Comfortable reading size

## Project Structure

```
notification-app/
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── assets/                # Images and icons
│   ├── icon.png
│   ├── splash-icon.png
│   └── adaptive-icon.png
└── README.md             # This file
```

## Key Components

### NotificationItem Interface
```typescript
interface NotificationItem {
  id: string;           // Unique identifier
  message: string;      // Notification text
  timestamp: number;    // Unix timestamp (Date.now())
  read: boolean;        // Read/unread state
}
```

### Main Features

**Header Component:**
- App title
- Real-time connection status indicator
- Responsive layout (column → row in landscape)

**Notification List:**
- FlatList for optimized rendering
- Pull-to-refresh capability
- Empty state component
- Infinite scroll support

**Notification Item:**
- Read/unread visual indicator
- Message text
- Relative timestamp
- Touch to mark as read

**Simulate Button:**
- Generates random notifications
- Demonstrates real-time updates
- Easy testing without backend

## Troubleshooting

### Issue: App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npx expo start --clear
```

### Issue: QR code not scanning
- Ensure phone and computer are on the same WiFi network
- Try using tunnel mode: `npx expo start --tunnel`
- Check firewall settings

### Issue: TypeScript errors
```bash
# Reinstall TypeScript dependencies
npm install --save-dev @types/react typescript
```

### Issue: Socket connection in production
- Update the connection URL in `App.tsx`
- Ensure backend has CORS enabled
- Use `https://` for production URLs
