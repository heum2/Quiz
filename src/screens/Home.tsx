import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import styled from 'styled-components/native';

import { RootStackParamList } from '../navigations/types';

import Container from '../components/Container';
import { Colors, Mixins } from '../styles';
import Text from '../components/Text';

type Props = StackScreenProps<RootStackParamList, 'Home'>;

const TitleWrapper = styled.View`
  align-items: center;
  margin-bottom: ${Mixins.scaleSize(20)}px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  margin-top: ${Mixins.scaleSize(20)}px;
`;

const Button = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.main};
  width: 100%;
  align-items: center;
  justify-content: center;
  height: ${Mixins.scaleSize(50)}px;
  border-radius: ${Mixins.scaleSize(20)}px;
`;

function Home({ navigation }: Props): JSX.Element {
  const handleMoveQuizzes = () => {
    navigation.push('Quizzes', { isRestart: false });
  };

  return (
    <Container justifyContent="center" alignItems="center">
      <TitleWrapper>
        <Text color={Colors.SECONDARY} fontWeight={700} fontSize={50}>
          🤔
        </Text>
        <Text fontWeight={700} fontSize={50}>
          Quiz
        </Text>
      </TitleWrapper>

      <Text fontWeight={700} fontSize={24}>
        Let's Play!
      </Text>

      <ButtonWrapper>
        <Button onPress={handleMoveQuizzes}>
          <Text fontWeight={700} fontSize={24}>
            퀴즈 풀기
          </Text>
        </Button>
      </ButtonWrapper>
    </Container>
  );
}

export default Home;
