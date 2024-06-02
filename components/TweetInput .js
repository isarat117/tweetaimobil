import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import properties from '../utils';

const TweetInput = () => {
  const [formData, setFormData] = useState({
    tweet_owner: '',
    tweet: '',
  });
  const [estimate, setEstimate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage]=useState('')
  const [estimateColor, setEstimateColor]=useState('')

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true); // Yükleme süresi başlatılır
    setEstimate('');
    setMessage('');
    try {
      console.log(formData);
     
      const response = await axios.post(`${properties.domainName}/get-tweet-estimate`, formData);
   
      setEstimate(response.data.estimate);

      // estimate state'i güncellendikten sonra mesajı belirle
      if(response.data.estimate === true){
        setMessage('Bu Tweetin coinin fiyatı üzerinde olumlu bir etkisi vardır');
        setEstimateColor('green')
      } else {
        setMessage('Bu Tweet fiyata etki etmeyebilir ya da düşürebilir');
        setEstimateColor('red')
      }
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setIsLoading(false); // Yükleme süresi sona erdirilir
    }
  };

  return (
    <View>
        <View style={{marginTop:50}}></View>
      <TextInput
        style={styles.input}
        placeholder="Coin Adı"
        value={formData.tweet_owner}
        onChangeText={(value) => handleChange('tweet_owner', value)}
      />
      <TextInput
        style={[styles.input, {height: 100}]}
        placeholder="Tweet İçeriği"
        multiline
        value={formData.tweet}
        onChangeText={(value) => handleChange('tweet', value)}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Yükleniyor...' : 'Submit'}
        </Text>
      </TouchableOpacity>
      
      {isLoading && <ActivityIndicator style={styles.loading} />}
      <View style={{backgroundColor:estimateColor, padding:10, marginTop:10}}>
      {estimate !== '' && <Text style={styles.estimate}>Sonuç: {message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loading: {
    marginTop: 10,
  },
  estimate: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default TweetInput;
