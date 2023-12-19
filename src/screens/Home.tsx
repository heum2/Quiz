import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

function Home({ navigation }: Props): JSX.Element {
  const handleMoveQuizzes = () => {
    navigation.push('Quizzes');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>🤔</Text>
        <Text style={styles.title}>Quiz</Text>
      </View>

      <Text style={styles.subtitle}>Let's Play!</Text>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleMoveQuizzes}>
          <Text style={styles.startButtonText}>퀴즈 풀기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F1147',
    paddingHorizontal: '5%',
  },
  titleWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    width: '100%',
    marginTop: 20,
  },
  title: {
    color: '#49fdc7',
    fontWeight: '700',
    fontSize: 42,
  },
  subtitle: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 24,
  },
  startButton: {
    backgroundColor: '#6949FD',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 24,
  },
});

export default Home;
