import CryptoJS from 'crypto-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Clipboard, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

type MenuItem = { icon: string; label: string; route: any };

export default function App() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [algorithm, setAlgorithm] = useState('SHA256');
  const [hash, setHash] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const algorithms = ['MD5', 'SHA1', 'SHA256'];

  const menuItems: MenuItem[] = [
    { icon: '📚', label: 'Learn Hashing', route: '/learn' },
    { icon: '🕵️', label: 'Detect Hash', route: '/detect' },
    { icon: '🔑', label: 'Password Hasher', route: '/password' },
    { icon: '💀', label: 'Hash Cracker', route: '/crack' },
    { icon: '⚔️', label: 'Hash vs Encryption', route: '/compare' },
    { icon: 'ℹ️', label: 'About', route: '/about' },
  ];

  const generateHash = () => {
    if (!text) return;
    let result = '';
    if (algorithm === 'MD5') result = CryptoJS.MD5(text).toString();
    if (algorithm === 'SHA1') result = CryptoJS.SHA1(text).toString();
    if (algorithm === 'SHA256') result = CryptoJS.SHA256(text).toString();
    setHash(result);
  };

  const copyHash = () => {
    Clipboard.setString(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>

      {menuOpen && (
        <TouchableOpacity style={styles.overlay} onPress={() => setMenuOpen(false)}>
          <View style={styles.drawer}>
            <Text style={styles.drawerTitle}>🦅 FalconH</Text>
            {menuItems.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={styles.drawerItem}
                onPress={() => { setMenuOpen(false); router.push(item.route); }}
              >
                <Text style={styles.drawerIcon}>{item.icon}</Text>
                <Text style={styles.drawerLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.title}>🔐 FalconH HashGen</Text>
            <Text style={styles.subtitle}>Cybersecurity Tool</Text>
          </View>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setMenuOpen(true)}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.label}>Enter Text</Text>
          <TextInput
            style={styles.input}
            placeholder="Type something to hash..."
            placeholderTextColor="#555"
            value={text}
            onChangeText={setText}
          />

          <Text style={styles.label}>Select Algorithm</Text>
          <View style={styles.algorithms}>
            {algorithms.map((algo) => (
              <TouchableOpacity
                key={algo}
                style={[styles.algoBtn, algorithm === algo && styles.algoBtnActive]}
                onPress={() => setAlgorithm(algo)}
              >
                <Text style={[styles.algoText, algorithm === algo && styles.algoTextActive]}>
                  {algo}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity onPress={generateHash}>
            <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.generateBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.generateText}>⚡ Generate Hash</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {hash ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>✅ {algorithm} Hash Result</Text>
            <Text style={styles.hashText}>{hash}</Text>
            <View style={styles.hashInfo}>
              <Text style={styles.infoText}>📏 Length: {hash.length} chars</Text>
              <Text style={styles.infoText}>🔢 Bits: {hash.length * 4}</Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} onPress={copyHash}>
              <Text style={styles.copyText}>{copied ? '✅ Copied!' : '📋 Copy Hash'}</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerLeft: { flex: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#00ff88' },
  subtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  menuBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(0,255,136,0.3)' },
  menuIcon: { fontSize: 20, color: '#00ff88' },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)', marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 10, padding: 14, fontSize: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 20 },
  algorithms: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  algoBtn: { flex: 1, padding: 10, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)' },
  algoBtnActive: { backgroundColor: 'rgba(0,255,136,0.15)', borderColor: '#00ff88' },
  algoText: { color: '#666', fontWeight: '600', fontSize: 13 },
  algoTextActive: { color: '#00ff88' },
  generateBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  generateText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: 'rgba(0,255,136,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(0,255,136,0.3)' },
  resultLabel: { color: '#00ff88', fontWeight: 'bold', marginBottom: 12, fontSize: 14 },
  hashText: { color: '#fff', fontSize: 11, lineHeight: 20, marginBottom: 12, fontFamily: 'monospace' },
  hashInfo: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  infoText: { color: '#555', fontSize: 12 },
  copyBtn: { backgroundColor: 'rgba(0,255,136,0.1)', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(0,255,136,0.3)' },
  copyText: { color: '#00ff88', fontWeight: '600', fontSize: 14 },
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, flexDirection: 'row' },
  drawer: { width: '70%', backgroundColor: '#0f0f1a', padding: 30, paddingTop: 60, borderRightWidth: 1, borderRightColor: 'rgba(0,255,136,0.2)' },
  drawerTitle: { fontSize: 22, fontWeight: 'bold', color: '#00ff88', marginBottom: 40 },
  drawerItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  drawerIcon: { fontSize: 20, marginRight: 16 },
  drawerLabel: { color: '#fff', fontSize: 16, fontWeight: '500' },
});