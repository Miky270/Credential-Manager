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
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textButton}>Add</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
            >
              <Text style={styles.textButton}>Edit</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.button}
            >
              <Text style={styles.textButton}>Delete</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}>
              <Text style={styles.textButton}>Search</Text>
            </TouchableHighlight>
          </View>
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
