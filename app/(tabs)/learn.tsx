import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LearnScreen() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#0a0a1a', '#1a0a2e', '#0a1628']} style={styles.gradient}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.header}>📚 Learn Hashing</Text>
        <Text style={styles.tagline}>Cybersecurity Concepts Simplified</Text>

        {/* What is Hashing */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🤔 What is Hashing?</Text>
          <Text style={styles.para}>
            Hashing converts any input into a fixed-length string called a <Text style={styles.highlight}>hash</Text>. It is a one-way process — you cannot reverse it to get the original input.
          </Text>
        </View>

        {/* How it works */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>⚙️ How Does It Work?</Text>
          {[
            'Give any input (e.g. "hello")',
            'Algorithm processes it mathematically',
            'A fixed-length hash is generated',
            'Same input always = same hash',
            '1 character change = completely different hash',
          ].map((point, i) => (
            <Text key={i} style={styles.bullet}>• {point}</Text>
          ))}
        </View>

        {/* MD5 */}
        <View style={[styles.card, { borderLeftColor: '#4fc3f7' }]}>
          <Text style={[styles.cardTitle, { color: '#4fc3f7' }]}>🔵 MD5</Text>
          {[
            'Produces 128-bit (32 character) hash',
            'Very fast algorithm',
            'Considered weak for passwords today',
            'Still used for file checksums',
          ].map((p, i) => <Text key={i} style={styles.bullet}>• {p}</Text>)}
        </View>

        {/* SHA1 */}
        <View style={[styles.card, { borderLeftColor: '#ffd54f' }]}>
          <Text style={[styles.cardTitle, { color: '#ffd54f' }]}>🟡 SHA-1</Text>
          {[
            'Produces 160-bit (40 character) hash',
            'More secure than MD5',
            'Deprecated for sensitive use cases',
            'Still found in older systems',
          ].map((p, i) => <Text key={i} style={styles.bullet}>• {p}</Text>)}
        </View>

        {/* SHA256 */}
        <View style={[styles.card, { borderLeftColor: '#00ff88' }]}>
          <Text style={[styles.cardTitle, { color: '#00ff88' }]}>🟢 SHA-256</Text>
          {[
            'Produces 256-bit (64 character) hash',
            'Most secure of the three',
            'Used in Bitcoin & blockchain',
            'Used in SSL certificates & HTTPS',
          ].map((p, i) => <Text key={i} style={styles.bullet}>• {p}</Text>)}
        </View>

        {/* Why Important */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>🛡️ Why is Hashing Important?</Text>
          {[
            'Passwords stored as hashes — not plain text',
            'Detects if a file has been tampered with',
            'Core part of blockchain & cryptocurrency',
            'Used in digital signatures & certificates',
            'Ensures data integrity in communication',
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
  header: { fontSize: 28, fontWeight: 'bold', color: '#00ff88', textAlign: 'center' },
  tagline: { fontSize: 13, color: '#666', textAlign: 'center', marginBottom: 30 },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 16, padding: 16, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: '#00ff88', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#00ff88', marginBottom: 10 },
  para: { color: '#ccc', fontSize: 14, lineHeight: 22 },
  highlight: { color: '#00ff88', fontWeight: 'bold' },
  bullet: { color: '#aaa', fontSize: 13, lineHeight: 26, marginLeft: 4 },
  footer: { color: '#444', textAlign: 'center', marginTop: 10, fontSize: 12 },
});