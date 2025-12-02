import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  useWindowDimensions,
} from 'react-native';
import { io, Socket } from 'socket.io-client';

interface NotificationItem {
  id: string;
  message: string;
  timestamp: number;
  read: boolean;
}

export default function App() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Responsive dimensions
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isSmallDevice = width < 375;

  useEffect(() => {
    // Simulate connection immediately (no real server needed)
    console.log('Mock Socket connected');
    setIsConnected(true);

    // Create a mock socket object for compatibility
    const mockSocket = {
      connected: true,
      emit: (event: string, data: any) => {
        console.log('Mock emit:', event, data);
      },
      disconnect: () => {
        console.log('Mock Socket disconnected');
        setIsConnected(false);
      }
    } as any;

    setSocket(mockSocket);

    // Cleanup on unmount
    return () => {
      console.log('Cleaning up mock socket');
      setIsConnected(false);
    };
  }, []);

  const simulateNotification = () => {
    const messages = [
      'New message from Peter',
      'Your order has been shipped',
      'Payment received successfully',
      'New comment on your post',
      'System update available',
      'Welcome bonus credited',
      'New follower: @peter_odero',
      'Meeting reminder in 30 minutes',
    ];

    const newNotification: NotificationItem = {
      id: Date.now().toString(),
      message: messages[Math.floor(Math.random() * messages.length)],
      timestamp: Date.now(),
      read: false,
    };

    if (socket) {
      socket.emit('newNotification', newNotification);
      setNotifications((prev) => [newNotification, ...prev]);
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return new Date(timestamp).toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: NotificationItem }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadItem,
        isLandscape && styles.notificationItemLandscape,
      ]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.notificationContent}>
        <View
          style={[
            styles.statusDot,
            item.read ? styles.readDot : styles.unreadDot,
          ]}
        />
        <View style={styles.textContainer}>
          <Text
            style={[
              styles.messageText,
              !item.read && styles.unreadMessageText,
              isSmallDevice && styles.messageTextSmall,
            ]}
          >
            {item.message}
          </Text>
          <Text style={[
            styles.timestampText,
            isSmallDevice && styles.timestampTextSmall,
          ]}>
            {formatTime(item.timestamp)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
   <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' />

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifications</Text>
          <View style={styles.connectionStatus}>
            <View
              style={[
                styles.connectionDot,
                isConnected ? styles.connectedDot : styles.disconnectedDot,
              ]}
            />
            <Text style={styles.connectionText}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>
                Press the button below to simulate a new notification
              </Text>
            </View>
          }
        />

        <TouchableOpacity
          style={styles.simulateButton}
          onPress={simulateNotification}
          activeOpacity={0.8}
        >
          <Text style={styles.simulateButtonText}> Simulate New Notification</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2563eb',
    paddingTop: Platform.OS === 'ios' ? 10 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLandscape: {
    paddingTop: Platform.OS === 'ios' ? 5 : 10,
    paddingBottom: 12,
  },
  headerSmall: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'column',
  },
  headerContentLandscape: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  headerTitleLandscape: {
    fontSize: 24,
    marginBottom: 0,
  },
  headerTitleSmall: {
    fontSize: 24,
  },
  connectionStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  connectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  connectedDot: {
    backgroundColor: '#4ade80',
  },
  disconnectedDot: {
    backgroundColor: '#ef4444',
  },
  connectionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  connectionTextSmall: {
    fontSize: 12,
  },
  listContent: {
    flexGrow: 1,
  },
  listContentEmpty: {
    flex: 1,
  },
  notificationItem: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  notificationItemLandscape: {
    paddingVertical: 12,
  },
  unreadItem: {
    backgroundColor: '#eff6ff',
  },
  notificationContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  readDot: {
    backgroundColor: '#d1d5db',
  },
  unreadDot: {
    backgroundColor: '#2563eb',
  },
  textContainer: {
    flex: 1,
  },
  messageText: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  messageTextSmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  unreadMessageText: {
    fontWeight: '600',
    color: '#1f2937',
  },
  timestampText: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  timestampTextSmall: {
    fontSize: 11,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyTextSmall: {
    fontSize: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  emptySubtextSmall: {
    fontSize: 13,
  },
  buttonWrapper: {
    marginHorizontal: 20,
    marginVertical: 16,
  },
  buttonWrapperLandscape: {
    marginVertical: 10,
  },
  simulateButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 12,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  simulateButtonLandscape: {
    paddingVertical: 12,
  },
  simulateButtonSmall: {
    paddingVertical: 14,
  },
  simulateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  simulateButtonTextSmall: {
    fontSize: 15,
  },
});