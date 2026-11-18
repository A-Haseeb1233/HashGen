import CryptoJS from 'crypto-js';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [hash, setHash] = useState('');
  const [strength, setStrength] = useState('');
  const [strengthColor, setStrengthColor] = useState('');

  const checks = [
    { label: 'Uppercase letter', test: /[A-Z]/ },
    { label: 'Lowercase letter', test: /[a-z]/ },
    { label: 'Number', test: /[0-9]/ },
    { label: 'Special character', test: /[^A-Za-z0-9]/ },
    { label: '12+ characters', test: { test: (s: string) => s.length >= 12 } },
  ];

  const analyzePassword = () => {
    if (!password) return;
    const generated = CryptoJS.SHA256(password).toString();
    setHash(generated);
    const score = checks.filter(c => c.test.test(password)).length;
    if (score <= 2) { setStrength('Weak ❌'); setStrengthColor('#ff5252'); }
    else if (score <= 3) { setStrength('Medium ⚠️'); setStrengthColor('#ffd54f'); }
    else { setStrength('Strong ✅'); setStrengthColor('#00ff88'); }
  };

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Back Button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>🔑 Password Hasher</Text>
        <Text style={styles.tagline}>See how your password is stored securely</Text>

        {/* Input Card */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Enter Password</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Enter password..."
              placeholderTextColor="#444"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!show}
            />
            <TouchableOpacity style={styles.eyeBtn} onPress={() => setShow(!show)}>
              <Text style={styles.eyeText}>{show ? '🙈' : '👁️'}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={analyzePassword}>
            <LinearGradient colors={['#00ff88', '#00d4ff']} style={styles.analyzeBtn} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={styles.analyzeText}>⚡ Analyze & Hash</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {hash ? (
          <>
            {/* Strength Card */}
            <View style={[styles.glassCard, { borderColor: strengthColor + '55' }]}>
              <Text style={styles.label}>Password Strength</Text>
              <Text style={[styles.strengthText, { color: strengthColor }]}>{strength}</Text>

              {checks.map((item, i) => {
                const ok = item.test.test(password);
                return (
                  <View key={i} style={styles.checkRow}>
                    <Text style={styles.checkIcon}>{ok ? '✅' : '❌'}</Text>
                    <Text style={[styles.checkLabel, { color: ok ? '#aaa' : '#555' }]}>{item.label}</Text>
                  </View>
                );
              })}
            </View>

            {/* Hash Card */}
            <View style={styles.glassCard}>
              <Text style={styles.label}>SHA-256 Hash</Text>
              <Text style={styles.hashText}>{hash}</Text>
              <View style={styles.noteBadge}>
                <Text style={styles.noteText}>⚠️ This is how apps store your password — never in plain text!</Text>
              </View>
            </View>
          </>
        ) : null}

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
  inputRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  input: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', borderRadius: 10, padding: 14, fontSize: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  eyeBtn: { padding: 14, marginLeft: 8, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  eyeText: { fontSize: 18 },
  analyzeBtn: { padding: 16, borderRadius: 12, alignItems: 'center' },
  analyzeText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  strengthText: { fontSize: 22, fontWeight: 'bold', marginBottom: 14 },
  checkRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  checkIcon: { fontSize: 14, marginRight: 10 },
  checkLabel: { fontSize: 13 },
  hashText: { color: '#fff', fontSize: 11, lineHeight: 20, marginBottom: 12, fontFamily: 'monospace' },
  noteBadge: { backgroundColor: 'rgba(255,213,79,0.1)', borderRadius: 10, padding: 12, borderWidth: 1, borderColor: 'rgba(255,213,79,0.3)' },
  noteText: { color: '#ffd54f', fontSize: 12, fontStyle: 'italic' },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});