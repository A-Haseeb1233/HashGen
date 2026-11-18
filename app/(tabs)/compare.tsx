import CryptoJS from 'crypto-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CompareScreen() {
  const router = useRouter();
  const [text, setText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [encryptResult, setEncryptResult] = useState('');
  const [decryptResult, setDecryptResult] = useState('');
  const [error, setError] = useState('');

  const doHash = () => {
    try {
      if (!text.trim()) return;
      setError('');
      setHashResult(CryptoJS.SHA256(text).toString());
      setEncryptResult('');
      setDecryptResult('');
    } catch (e) {
      setError('Hashing failed. Try again!');
    }
  };

  const doEncrypt = () => {
    try {
      if (!text.trim()) return;
      setError('');
      const wordArray = CryptoJS.enc.Utf8.parse(text);
      const encoded = CryptoJS.enc.Base64.stringify(wordArray);
      setEncryptResult(encoded);
      setHashResult('');
      setDecryptResult('');
    } catch (e) {
      setError('Encryption failed. Try again!');
    }
  };

  const doDecrypt = () => {
    try {
      if (!encryptResult) return;
      setError('');
      const wordArray = CryptoJS.enc.Base64.parse(encryptResult);
      const decoded = CryptoJS.enc.Utf8.stringify(wordArray);
      if (!decoded) {
        setError('Decryption failed!');
        return;
      }
      setDecryptResult(decoded);
    } catch (e: any) {
      setError('Error: ' + e.message);
    }
  };

  const reset = () => {
    setText('');
    setHashResult('');
    setEncryptResult('');
    setDecryptResult('');
    setError('');
  };

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>Hashing vs Encryption</Text>
        <Text style={styles.tagline}>Two different concepts — understand the difference</Text>

        <View style={styles.conceptRow}>
          <View style={[styles.conceptCard, { borderColor: '#ff5252' }]}>
            <Text style={[styles.conceptTitle, { color: '#ff5252' }]}>Hashing</Text>
            <Text style={styles.conceptDesc}>One-way{'\n'}Cannot reverse{'\n'}Fixed length</Text>
            <Text style={[styles.conceptTag, { color: '#ff5252' }]}>No Key</Text>
          </View>
          <View style={[styles.conceptCard, { borderColor: '#00ff88' }]}>
            <Text style={[styles.conceptTitle, { color: '#00ff88' }]}>Encryption</Text>
            <Text style={styles.conceptDesc}>Two-way{'\n'}Can decrypt{'\n'}Variable length</Text>
            <Text style={[styles.conceptTag, { color: '#00ff88' }]}>Has Key</Text>
          </View>
        </View>

        <View style={styles.glassCard}>
          <Text style={styles.label}>Enter Text</Text>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            placeholderTextColor="#444"
            value={text}
            onChangeText={(t) => { setText(t); setError(''); }}
          />

          {error ? (
            <View style={styles.errorBadge}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <View style={styles.btnRow}>
            <TouchableOpacity style={styles.halfBtn} onPress={doHash}>
              <LinearGradient colors={['#ff5252', '#ff1744']} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={styles.btnText}>Hash It</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.halfBtn} onPress={doEncrypt}>
              <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={[styles.btnText, { color: '#000' }]}>Encrypt It</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {(hashResult || encryptResult || decryptResult) ? (
            <TouchableOpacity style={styles.resetBtn} onPress={reset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {hashResult ? (
          <View style={[styles.resultCard, { borderColor: '#ff5252' }]}>
            <Text style={[styles.resultTitle, { color: '#ff5252' }]}>Hash Result (SHA-256)</Text>
            <Text style={styles.resultHash}>{hashResult}</Text>
            <View style={styles.alertBadge}>
              <Text style={styles.alertText}>This CANNOT be reversed — no key, no way back!</Text>
            </View>
          </View>
        ) : null}

        {encryptResult ? (
          <View style={[styles.resultCard, { borderColor: '#00ff88' }]}>
            <Text style={[styles.resultTitle, { color: '#00ff88' }]}>Encoded Text (Base64)</Text>
            <Text style={styles.resultHash}>{encryptResult}</Text>
            <View style={[styles.alertBadge, { borderColor: 'rgba(0,255,136,0.3)', backgroundColor: 'rgba(0,255,136,0.1)' }]}>
              <Text style={[styles.alertText, { color: '#00ff88' }]}>This CAN be decrypted with the secret key!</Text>
            </View>
            <TouchableOpacity onPress={doDecrypt} style={{ marginTop: 12 }}>
              <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.btnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
                <Text style={[styles.btnText, { color: '#000' }]}>Decrypt It</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}

        {decryptResult ? (
          <View style={[styles.resultCard, { borderColor: '#00d4ff' }]}>
            <Text style={[styles.resultTitle, { color: '#00d4ff' }]}>Decrypted Text</Text>
            <Text style={styles.decryptedText}>{decryptResult}</Text>
            <View style={[styles.alertBadge, { borderColor: 'rgba(0,212,255,0.3)', backgroundColor: 'rgba(0,212,255,0.1)' }]}>
              <Text style={[styles.alertText, { color: '#00d4ff' }]}>Original text recovered — encryption is two-way!</Text>
            </View>
          </View>
        ) : null}

        <View style={styles.glassCard}>
          <Text style={styles.label}>Key Differences</Text>
          {[
            'Hashing: passwords, file integrity checks',
            'Encryption: messages, files, secure storage',
            'Hashing has no key — cannot reverse',
            'Encryption has a key — can decrypt',
            'Use hashing for passwords, encryption for data',
          ].map((point, i) => (
            <Text key={i} style={styles.bullet}>• {point}</Text>
          ))}
        </View>

        <Text style={styles.footer}>FalconH HashGen</Text>
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
  header: { fontSize: 24, fontWeight: 'bold', color: '#00ff88', textAlign: 'center' },
  tagline: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 24 },
  conceptRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  conceptCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, borderWidth: 2, alignItems: 'center' },
  conceptTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  conceptDesc: { color: '#aaa', fontSize: 12, textAlign: 'center', lineHeight: 20, marginBottom: 8 },
  conceptTag: { fontSize: 11, fontWeight: '600' },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)', marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 },
  input: { backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 10, padding: 14, fontSize: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 16 },
  btnRow: { flexDirection: 'row', gap: 10 },
  halfBtn: { flex: 1 },
  btnGradient: { padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  resetBtn: { marginTop: 12, padding: 10, alignItems: 'center' },
  resetText: { color: '#555', fontSize: 13 },
  errorBadge: { backgroundColor: 'rgba(255,82,82,0.1)', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', marginBottom: 12 },
  errorText: { color: '#ff5252', fontSize: 12, textAlign: 'center' },
  resultCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 16, padding: 20, borderWidth: 2, marginBottom: 16 },
  resultTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 12 },
  resultHash: { color: '#fff', fontSize: 11, lineHeight: 20, marginBottom: 12, fontFamily: 'monospace' },
  alertBadge: { borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(255,82,82,0.3)', backgroundColor: 'rgba(255,82,82,0.1)' },
  alertText: { color: '#ff5252', fontSize: 12, lineHeight: 18 },
  decryptedText: { color: '#00d4ff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  bullet: { color: '#aaa', fontSize: 13, lineHeight: 28 },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});