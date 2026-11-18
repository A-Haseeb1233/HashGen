import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function DetectScreen() {
  const router = useRouter();
  const [hash, setHash] = useState('');
  const [result, setResult] = useState<null | { type: string; length: string; bits: string; status: string; color: string }>(null);

  const detectHash = () => {
    const h = hash.trim();
    if (!h) return;

    if (h.length === 32) {
      setResult({ type: '🔵 MD5 Hash', length: '32 characters', bits: '128-bit', status: 'Weak — not recommended for passwords', color: '#4fc3f7' });
    } else if (h.length === 40) {
      setResult({ type: '🟡 SHA-1 Hash', length: '40 characters', bits: '160-bit', status: 'Deprecated — avoid for sensitive use', color: '#ffd54f' });
    } else if (h.length === 64) {
      setResult({ type: '🟢 SHA-256 Hash', length: '64 characters', bits: '256-bit', status: 'Strong — recommended ✅', color: '#00ff88' });
    } else {
      setResult({ type: '❓ Unknown Hash', length: `${h.length} characters`, bits: 'Unknown', status: 'Does not match MD5, SHA-1 or SHA-256', color: '#ff5252' });
    }
  };

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>🕵️ Hash Detector</Text>
        <Text style={styles.tagline}>Paste a hash to identify its type</Text>

        {/* Input Card */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Paste Hash Below</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 5d41402abc4b2a76b9719d911017c592"
            placeholderTextColor="#444"
            value={hash}
            onChangeText={(t) => { setHash(t); setResult(null); }}
            multiline
          />

          <TouchableOpacity onPress={detectHash}>
            <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.detectBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.detectText}>🔍 Detect Hash Type</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Result Card */}
        {result && (
          <View style={[styles.resultCard, { borderColor: result.color }]}>
            <Text style={[styles.resultType, { color: result.color }]}>{result.type}</Text>

            <View style={styles.resultRow}>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>LENGTH</Text>
                <Text style={styles.resultItemValue}>{result.length}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultItemLabel}>BIT SIZE</Text>
                <Text style={styles.resultItemValue}>{result.bits}</Text>
              </View>
            </View>

            <View style={[styles.statusBadge, { backgroundColor: result.color + '22', borderColor: result.color }]}>
              <Text style={[styles.statusText, { color: result.color }]}>⚡ {result.status}</Text>
            </View>
          </View>
        )}

        <Text style={styles.footer}>🦅 FalconH HashGen</Text>
        <View style={{ height: 40 }} />

      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, padding: 24, paddingTop: 60 },
  backBtn: { marginBottom: 20 },
  backText: { color: '#00ff88', fontSize: 14, fontWeight: '600' },
  header: { fontSize: 28, fontWeight: 'bold', color: '#00ff88', textAlign: 'center' },
  tagline: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 30 },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)', marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 10, padding: 14, fontSize: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 16, minHeight: 80, fontFamily: 'monospace' },
  detectBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  detectText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, borderWidth: 2, marginBottom: 16 },
  resultType: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  resultRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  resultItem: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, padding: 12, alignItems: 'center' },
  resultItemLabel: { color: '#555', fontSize: 10, letterSpacing: 1, marginBottom: 4 },
  resultItemValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  statusBadge: { borderRadius: 10, padding: 12, borderWidth: 1, alignItems: 'center' },
  statusText: { fontSize: 13, fontWeight: '600' },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});