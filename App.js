import { StyleSheet, Text, View } from 'react-native';
import TweetInput from './components/TweetInput ';

export default function App() {

  return (
    <View >
      <TweetInput/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
