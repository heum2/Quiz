import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import { useQuery } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigations/types';

import { fetchQuizzes } from '../lib/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Quizzes'>;

function Quizzes({ navigation }: Props): JSX.Element {
  const [current, setCurrent] = useState(0);

  const { isLoading, error, data } = useQuery('quizData', fetchQuizzes);

  useEffect(() => {
    const start = performance.now();
    return () => {
      const end = performance.now();
      const time = end - start;
      console.log(`${time} ms`);
    };
  }, []);

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View>
        <Text>An error has occurred:</Text>
      </View>
    );
  }

  const handlePrev = () => {
    if (current < 1) {
      // TODO: 시간 종료 (나중에 팝업 띄우기)
      navigation.goBack();
      return;
    }

    setCurrent(prev => prev - 1);
  };

  const handleNext = () => {
    if (current + 1 >= data.data.results.length) {
      // TODO: 문제 저장 및 정답, 오답 체크, 시간 종료 (나중에 팝업 띄우기)
      return navigation.replace('Results');
    }

    setCurrent(prev => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <View style={styles.questionWrapper}>
          <Text style={styles.current}>{current + 1}/10</Text>
          <Text style={styles.question}>
            {data.data.results[current].question}
          </Text>
        </View>
        <View>
          {data.data.results[current].answers.map((item, index) => (
            <TouchableHighlight
              key={item}
              underlayColor="#49fdc7"
              style={styles.answerButton}
              onPress={() => {}}>
              <View style={styles.answerWrapper}>
                <View style={styles.numberCircle}>
                  <Text style={styles.numberText}>{index + 1}</Text>
                </View>
                <Text style={styles.answer}>{item}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={handlePrev}>
          <Text style={styles.footerButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleNext}>
          <Text style={styles.footerButtonText}>다음</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1147',
    paddingHorizontal: '5%',
  },
  main: { flex: 5, justifyContent: 'center' },
  questionWrapper: {
    marginBottom: 20,
  },
  current: {
    color: '#49fdc7',
  },
  question: {
    color: '#ffffff',
    fontSize: 18,
  },
  answerButton: {
    borderRadius: 10,
    padding: 10,
  },
  answerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberCircle: {
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#6949FD',
    padding: 5,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: '#ffffff',
    fontWeight: '500',
  },
  answer: {
    color: '#ffffff',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    borderRadius: 10,
    backgroundColor: '#6949FD',
    width: '25%',
    alignItems: 'center',
    padding: 10,
  },
  footerButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default Quizzes;
