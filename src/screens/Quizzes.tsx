import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useQuery } from 'react-query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled, { css } from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootStackParamList } from '../navigations/types';

import Container from '../components/Container';
import Text from '../components/Text';

import { fetchQuizzes } from '../lib/api';
import { Colors, Mixins } from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Quizzes'>;

type SelectedAnswer = {
  isCorrect: boolean;
  index: number;
  answers: boolean[];
};

const Main = styled.View`
  flex: 5;
  justify-content: center;
`;

const QuestionWrapper = styled.View`
  margin-bottom: ${Mixins.scaleSize(20)}px;
`;

const AnswerButton = styled.TouchableOpacity<{
  isSelected: boolean | null;
  isCorrect: boolean | null;
}>`
  border-radius: ${Mixins.scaleSize(10)}px;
  padding: ${Mixins.scaleSize(10)}px;

  ${props =>
    (props.isSelected || props.isCorrect) &&
    css`
      background-color: ${Colors.SECONDARY};
    `}

  ${props =>
    props.isSelected === false &&
    css`
      background-color: red;
    `}
`;

const AnswerWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NumberCircle = styled.View`
  border-radius: ${Mixins.scaleSize(20)}px;
  margin-right: ${Mixins.scaleSize(10)}px;
  background-color: ${Colors.PRIMARY};
  padding: ${Mixins.scaleSize(5)}px;
  width: ${Mixins.scaleSize(30)}px;
  height: ${Mixins.scaleSize(30)}px;
  justify-content: center;
  align-items: center;
`;

const Footer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const FooterButton = styled.TouchableOpacity<{ visible: boolean }>`
  border-radius: ${Mixins.scaleSize(10)}px;
  background-color: ${props => props.theme.colors.main};
  width: 100%;
  align-items: center;
  padding: ${Mixins.scaleSize(10)}px;
  opacity: 0;

  ${props =>
    props.visible &&
    css`
      opacity: 1;
    `}
`;

function Quizzes({ route, navigation }: Props): JSX.Element {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedAnswer>();
  const [result, setResult] = useState({
    startTime: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
  });

  const { isLoading, isRefetching, error, data } = useQuery(
    'quizData',
    fetchQuizzes,
    {
      enabled: !route.params.isRestart,
      keepPreviousData: route.params.isRestart,
      cacheTime: route.params.isRestart ? Infinity : undefined,
      staleTime: route.params.isRestart ? Infinity : undefined,
    },
  );

  useEffect(() => {
    setResult(prev => ({ ...prev, startTime: performance.now() }));

    return () => {
      setSelectedAnswer(undefined);
    };
  }, []);

  if (isLoading || isRefetching) {
    return (
      <Container justifyContent="center" alignItems="center">
        <ActivityIndicator color="#ffffff" size="large" />
      </Container>
    );
  }

  if (error || !data) {
    return (
      <Container justifyContent="center" alignItems="center">
        <Text>Error</Text>
      </Container>
    );
  }

  const handleClickAnswer = (answer: string, index: number) => {
    const { correct_answer } = data.data.results[activeQuestion];
    const answers = selectedAnswer?.answers ?? [];

    setSelectedAnswer({
      index,
      isCorrect: answer === correct_answer,
      answers: [...answers, answer === correct_answer],
    });
  };

  const handleNext = async () => {
    if (!selectedAnswer) {
      return;
    }

    if (activeQuestion >= data.data.results.length - 1) {
      const end = performance.now();

      const saveData = {
        questions: data.data.results,
        timeRequired: end - result.startTime,
        correctAnswerCount: selectedAnswer.isCorrect
          ? result.correctAnswers + 1
          : result.correctAnswers,
        incorrectAnswerCount: selectedAnswer.isCorrect
          ? result.incorrectAnswers
          : result.incorrectAnswers + 1,
        selectedAnswers: selectedAnswer.answers,
      };

      const stringifyAnswers = JSON.stringify(saveData);
      await AsyncStorage.setItem('answer', stringifyAnswers);

      return navigation.replace('Results');
    }

    setActiveQuestion(prev => prev + 1);

    setResult(prev =>
      selectedAnswer.isCorrect
        ? { ...prev, correctAnswers: prev.correctAnswers + 1 }
        : { ...prev, incorrectAnswers: prev.incorrectAnswers + 1 },
    );
    setSelectedAnswer(undefined);
  };

  return (
    <Container>
      <Main>
        <QuestionWrapper>
          <Text color={Colors.SECONDARY}>{activeQuestion + 1}/10</Text>
          <Text fontSize={18}>
            {data.data.results[activeQuestion].question}
          </Text>
        </QuestionWrapper>
        <View>
          {data.data.results[activeQuestion].answers.map((item, index) => (
            <AnswerButton
              key={item}
              disabled={selectedAnswer ? true : false}
              isSelected={
                selectedAnswer?.index === index
                  ? selectedAnswer.isCorrect
                  : null
              }
              isCorrect={
                selectedAnswer
                  ? data.data.results[activeQuestion].correct_answer === item
                  : null
              }
              onPress={() => handleClickAnswer(item, index)}>
              <AnswerWrapper>
                <NumberCircle>
                  <Text fontWeight={500}>{index + 1}</Text>
                </NumberCircle>
                <Text
                  color={
                    selectedAnswer &&
                    data.data.results[activeQuestion].correct_answer === item
                      ? Colors.BACKGROUND_LIGHT
                      : undefined
                  }
                  fontWeight={500}>
                  {item}
                </Text>
              </AnswerWrapper>
            </AnswerButton>
          ))}
        </View>
      </Main>

      <Footer>
        <FooterButton
          visible={!!selectedAnswer}
          disabled={!selectedAnswer}
          onPress={handleNext}>
          <Text fontWeight={700}>
            {activeQuestion === data.data.results.length - 1
              ? '완료'
              : '다음 문항'}
          </Text>
        </FooterButton>
      </Footer>
    </Container>
  );
}

export default Quizzes;
