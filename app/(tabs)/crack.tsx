import CryptoJS from 'crypto-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COMMON_PASSWORDS } from './passwords';

// Build rainbow table dynamically from passwords list
const buildTable = () => {
  const table: Record<string, string> = {};
  COMMON_PASSWORDS.forEach((pw) => {
    table[CryptoJS.MD5(pw).toString()] = pw;
    table[CryptoJS.SHA1(pw).toString()] = pw;
    table[CryptoJS.SHA256(pw).toString()] = pw;
  });
  return table;
};

const RAINBOW_TABLE = buildTable();

export default function CrackScreen() {
  const router = useRouter();
  const [hash, setHash] = useState('');
  const [result, setResult] = useState<null | { cracked: boolean; password?: string; attempts: number }>(null);
  const [loading, setLoading] = useState(false);

  const crackHash = () => {
    if (!hash.trim()) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const found = RAINBOW_TABLE[hash.trim().toLowerCase()];
      setResult({
        cracked: !!found,
        password: found,
        attempts: Object.keys(RAINBOW_TABLE).length,
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>💀 Hash Cracker</Text>
        <Text style={styles.tagline}>Rainbow Table Attack Simulator</Text>

        <View style={styles.warningBadge}>
          <Text style={styles.warningText}>⚠️ Educational purposes only — simulates how attackers crack weak passwords</Text>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.label}>Paste Hash to Crack</Text>
          <TextInput
            style={styles.input}
            placeholder="Paste MD5 / SHA1 / SHA256 hash..."
            placeholderTextColor="#444"
            value={hash}
            onChangeText={(t) => { setHash(t); setResult(null); }}
            multiline
          />

          <TouchableOpacity onPress={crackHash} disabled={loading}>
            <LinearGradient
              colors={loading ? ['#333', '#333'] : ['#ff5252', '#ff1744']}
              style={styles.crackBtn}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.crackText}>{loading ? '🔍 Scanning Rainbow Table...' : '💀 Crack Hash'}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {result && (
          <View style={[styles.resultCard, { borderColor: result.cracked ? '#ff5252' : '#00ff88' }]}>
            {result.cracked ? (
              <>
                <Text style={styles.crackedTitle}>💥 CRACKED!</Text>
                <Text style={styles.crackedLabel}>Original Password:</Text>
                <Text style={styles.crackedPassword}>{result.password}</Text>
                <View style={styles.infoBadge}>
                  <Text style={styles.infoText}>🔴 This password is in the rainbow table — never use common passwords!</Text>
                </View>
              </>
            ) : (
              <>
                <Text style={styles.safeTitle}>🛡️ NOT FOUND</Text>
                <Text style={styles.safeText}>Password not found in rainbow table — it's likely strong or unique!</Text>
                <View style={styles.successBadge}>
                  <Text style={styles.successText}>✅ Good job using a strong password!</Text>
                </View>
              </>
            )}
            <Text style={styles.attemptsText}>🔢 Checked {result.attempts} known hashes</Text>
          </View>
        )}

        <View style={styles.glassCard}>
          <Text style={styles.label}>How Rainbow Tables Work</Text>
          {[
            'Attackers pre-compute hashes of common passwords',
            'Store them in a massive lookup table',
            'Compare stolen hashes against the table',
            'If match found — password is instantly revealed',
            'Solution: Use strong, unique passwords + salting',
          ].map((point, i) => (
            <Text key={i} style={styles.bullet}>• {point}</Text>
          ))}
        </View>

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
  header: { fontSize: 28, fontWeight: 'bold', color: '#ff5252', textAlign: 'center' },
  tagline: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 16 },
  warningBadge: { backgroundColor: 'rgba(255,82,82,0.1)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', marginBottom: 20 },
  warningText: { color: '#ff5252', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 10, padding: 14, fontSize: 13, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 16, minHeight: 80, fontFamily: 'monospace' },
  crackBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  crackText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resultCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, borderWidth: 2, marginBottom: 16 },
  crackedTitle: { fontSize: 24, fontWeight: 'bold', color: '#ff5252', textAlign: 'center', marginBottom: 16 },
  crackedLabel: { color: '#888', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 },
  crackedPassword: { color: '#ff5252', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 16, fontFamily: 'monospace' },
  infoBadge: { backgroundColor: 'rgba(255,82,82,0.1)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', marginBottom: 12 },
  infoText: { color: '#ff5252', fontSize: 12, lineHeight: 18 },
  safeTitle: { fontSize: 24, fontWeight: 'bold', color: '#00ff88', textAlign: 'center', marginBottom: 16 },
  safeText: { color: '#aaa', fontSize: 14, textAlign: 'center', marginBottom: 16, lineHeight: 22 },
  successBadge: { backgroundColor: 'rgba(0,255,136,0.1)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(0,255,136,0.3)', marginBottom: 12 },
  successText: { color: '#00ff88', fontSize: 12, textAlign: 'center' },
  attemptsText: { color: '#555', fontSize: 12, textAlign: 'center' },
  bullet: { color: '#aaa', fontSize: 13, lineHeight: 28 },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});