import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.hero}>
          <Text style={styles.heroIcon}>🦅</Text>
          <Text style={styles.header}>FalconH HashGen</Text>
          <Text style={styles.tagline}>Cybersecurity Learning Tool</Text>
        </View>

        {/* App Info */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>About App</Text>
          <Text style={styles.para}>A cybersecurity tool that generates and identifies cryptographic hashes — built for learning and education.</Text>
        </View>

        {/* Developer */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Developer</Text>
          <Text style={styles.devName}>Abdul Haseeb</Text>
          <Text style={styles.devRole}>Computer Science Student</Text>
        </View>

        {/* Features */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Features</Text>
          {[
            'MD5, SHA-1, SHA-256 Hash Generator',
            'Hash Type Detector',
            'Password Strength Analyzer',
            'Hash Cracker — Rainbow Table Simulator',
            'Hashing vs Encryption — Interactive Demo',
            'Hashing Concepts Guide',
          ].map((item, i) => (
            <Text key={i} style={styles.bullet}>• {item}</Text>
          ))}
        </View>

        {/* Encoding Info */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Encoding Methods Used</Text>
          {[
            'SHA-256 — Secure hashing (irreversible)',
            'MD5 — Legacy hashing (32-char output)',
            'SHA-1 — Deprecated hashing (40-char output)',
            'Base64 — Reversible encoding (for demo)',
            'AES — Advanced Encryption Standard (concept)',
          ].map((item, i) => (
            <Text key={i} style={styles.bullet}>• {item}</Text>
          ))}
        </View>

        {/* Built With */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Built With</Text>
          <View style={styles.techRow}>
            {['React Native', 'Expo Router', 'CryptoJS', 'LinearGradient', 'EAS Build'].map((tech, i) => (
              <View key={i} style={styles.techBadge}>
                <Text style={styles.techText}>{tech}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Subject */}
        <View style={styles.glassCard}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.para}>Mobile Application Development</Text>
        </View>

        {/* Disclaimer */}
        <View style={[styles.glassCard, { borderColor: 'rgba(255,82,82,0.3)' }]}>
          <Text style={[styles.label, { color: '#ff5252' }]}>Disclaimer</Text>
          <Text style={styles.para}>This app is for educational purposes only. All hashing and encoding demonstrations are simulations to help understand cybersecurity concepts.</Text>
        </View>

        <Text style={styles.footer}>Made with ❤️ by FalconH</Text>
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
  hero: { alignItems: 'center', marginBottom: 30 },
  heroIcon: { fontSize: 50, marginBottom: 10 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#00ff88' },
  tagline: { fontSize: 13, color: '#666', marginTop: 4 },
  glassCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: 'rgba(0,255,136,0.2)', marginBottom: 16 },
  label: { color: '#888', fontSize: 12, marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 },
  para: { color: '#ccc', fontSize: 14, lineHeight: 22 },
  devName: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  devRole: { color: '#666', fontSize: 13 },
  bullet: { color: '#aaa', fontSize: 13, lineHeight: 28 },
  techRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  techBadge: { backgroundColor: 'rgba(0,255,136,0.1)', borderRadius: 8, paddingVertical: 6, paddingHorizontal: 12, borderWidth: 1, borderColor: 'rgba(0,255,136,0.3)' },
  techText: { color: '#00ff88', fontSize: 12, fontWeight: '600' },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});