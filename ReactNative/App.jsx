import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableHighlight,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const storedCredentials = await AsyncStorage.getItem('credentials');
      if (storedCredentials !== null) {
        setCredentials(JSON.parse(storedCredentials));
      }
    } catch (error) {
      Alert.alert('Errore nel caricamento delle credenziali');
    }
  };

  const saveCredentials = async (newCredentials) => {
    try {
      await AsyncStorage.setItem('credentials', JSON.stringify(newCredentials));
    } catch (error) {
      Alert.alert('Errore nel salvataggio delle credenziali');
    }
  };

  const handleAdd = () => {
    const newCredential = { site, username, password, notes };
    const updatedCredentials = [...credentials, newCredential];
    setCredentials(updatedCredentials);
    saveCredentials(updatedCredentials);
    Alert.alert('Credenziali aggiunte con successo!');
    setSite('');
    setUsername('');
    setPassword('');
    setNotes('');
  };

  const handleEdit = (index) => {
    const editedCredentials = credentials.map((cred, i) =>
      i === index ? { site, username, password, notes } : cred
    );
    setCredentials(editedCredentials);
    saveCredentials(editedCredentials);
    Alert.alert('Credenziali modificate con successo!');
    setSite('');
    setUsername('');
    setPassword('');
    setNotes('');
  };

  const handleDelete = (index) => {
    const filteredCredentials = credentials.filter((_, i) => i !== index);
    setCredentials(filteredCredentials);
    saveCredentials(filteredCredentials);
    Alert.alert('Credenziali eliminate con successo!');
    setSite('');
    setUsername('');
    setPassword('');
    setNotes('');
  };

  const handleSearch = () => {
    const foundCredential = credentials.find((cred) => cred.site === site);
    if (foundCredential) {
      setUsername(foundCredential.username);
      setPassword(foundCredential.password);
      setNotes(foundCredential.notes);
      Alert.alert('Credenziali trovate!');
    } else {
      Alert.alert('Credenziali non trovate!');
    }
  };

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Gestione Credenziali</Text>
          <TextInput
            style={styles.input}
            placeholder="Inserisci il sito"
            onChangeText={(text) => setSite(text)}
            value={site}
          />
          <TextInput
            style={styles.input}
            placeholder="Inserisci lo username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <TextInput
            style={styles.input}
            placeholder="Inserisci la password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Inserisci le note"
            onChangeText={(text) => setNotes(text)}
            value={notes}
          />
          <View style={styles.buttonContainer}>
            <TouchableHighlight style={styles.button} onPress={handleAdd}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => handleEdit(credentials.findIndex((cred) => cred.site === site))}
            >
              <Text style={styles.textButton}>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
              onPress={() => handleDelete(credentials.findIndex((cred) => cred.site === site))}
            >
              <Text style={styles.textButton}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={handleSearch}>
              <Text style={styles.textButton}>Search</Text>
            </TouchableHighlight>
          </View>
          <FlatList
            data={credentials}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.credentialItem}>
                <Text style={styles.credentialText}>Sito: {item.site}</Text>
                <Text style={styles.credentialText}>Username: {item.username}</Text>
                <Text style={styles.credentialText}>Password: {item.password}</Text>
                <Text style={styles.credentialText}>Note: {item.notes}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#026873',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
    backgroundColor: '#a7d9d9',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    width: 100,
    height: 40,
    margin: 5,
    backgroundColor: '#f29b88',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  credentialItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  credentialText: {
    color: '#000',
    fontSize: 16,
  },
});

export default App;