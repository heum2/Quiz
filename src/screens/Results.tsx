import React, { useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  LayoutChangeEvent,
  LayoutRectangle,
  processColor,
} from 'react-native';
import { PieChart } from 'react-native-charts-wrapper';
import styled from 'styled-components/native';

import HomeSvg from '../assets/images/home.svg';
import RestartSvg from '../assets/images/restart.svg';

import { RootStackParamList } from '../navigations/types';

import Container from '../components/Container';
import Text from '../components/Text';

import type { Quiz } from '../lib/api';
import { Colors, Mixins } from '../styles';

type Props = StackScreenProps<RootStackParamList, 'Results'>;

type Answer = {
  questions: Quiz[];
  timeRequired: number;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  selectedAnswers: boolean[];
};

const TextWrapper = styled.View<{ paddingVertical: number }>`
  padding-top: ${props => Mixins.scaleSize(props.paddingVertical)}px;
  padding-bottom: ${props => Mixins.scaleSize(props.paddingVertical)}px;
`;

const ChartWrapper = styled.View`
  width: ${Mixins.WINDOW_WIDTH - Mixins.scaleSize(40)}px;
  height: ${Mixins.WINDOW_WIDTH - Mixins.scaleSize(40)}px;
  background-color: ${Colors.PRIMARY_DARK};
  border-radius: ${Mixins.scaleSize(20)}px;
`;

const ButtonWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: ${Mixins.WINDOW_WIDTH - Mixins.scaleSize(40)}px;
  flex: 1;
`;

const IconButton = styled.TouchableOpacity`
  width: 20%;
  height: ${Mixins.scaleSize(30)}PX;
  background-color: ${Colors.PRIMARY};
  padding: ${Mixins.scaleSize(30)}px;
  justify-content: center;
  align-items: center;
  border-radius: ${Mixins.scaleSize(10)}px;
`;

function Results({ navigation }: Props): JSX.Element {
  const [value, setValue] = useState<Answer>();
  const [layout, setLayout] = useState<LayoutRectangle>();

  const timeFormat = (time: number) => {
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const seconds = Math.floor((time / 1000) % 60);

    let result = '';

    if (hours > 0) {
      result = `${hours}시`;
    }
    if (minutes > 0) {
      result += `${minutes}분`;
    }
    result += `${seconds}초`;

    return result;
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };

  useEffect(() => {
    async function getAnswers() {
      const getData = await AsyncStorage.getItem('answer');
      if (!getData) {
        return;
      }
      const result = JSON.parse(getData);
      setValue(result);
    }

    getAnswers();
  }, []);

  if (!value) {
    return (
      <Container justifyContent="center" alignItems="center">
        <ActivityIndicator color="#ffffff" size="large" />
      </Container>
    );
  }

  return (
    <Container alignItems="center">
      <TextWrapper paddingVertical={20}>
        <Text fontSize={24} fontWeight={700}>
          결과
        </Text>
      </TextWrapper>

      <ChartWrapper onLayout={handleLayout}>
        {!!layout && (
          <PieChart
            style={{ flex: 1 }}
            logEnabled
            chartBackgroundColor={processColor('transparent')}
            data={{
              dataSets: [
                {
                  values: [
                    { value: value.correctAnswerCount, label: '정답' },
                    { value: value.incorrectAnswerCount, label: '오답' },
                  ],
                  label: '',

                  config: {
                    colors: [
                      processColor(Colors.SECONDARY),
                      processColor('red'),
                    ],
                    valueTextSize: 20,
                    valueTextColor: processColor('white'),
                    sliceSpace: 5,
                    selectionShift: 13,
                    valueFormatter: "#.#'%'",
                    color: processColor('red'),
                    valueLineColor: processColor('white'),
                    valueLinePart1Length: 0.5,
                  },
                },
              ],
            }}
            legend={{
              enabled: true,
              textSize: Mixins.scaleFont(16),
              form: 'CIRCLE',
              horizontalAlignment: 'RIGHT',
              verticalAlignment: 'CENTER',
              orientation: 'VERTICAL',
              wordWrapEnabled: true,
              textColor: processColor('white'),
            }}
            highlights={[{ x: 2 }]}
            chartDescription={{ text: '' }}
            entryLabelColor={processColor('white')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'HelveticaNeue-Medium'}
            drawEntryLabels={true}
            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            centerTextRadiusPercent={100}
            holeRadius={10}
            transparentCircleRadius={0}
            maxAngle={360}
          />
        )}
      </ChartWrapper>
      <TextWrapper paddingVertical={10}>
        <Text fontSize={18}>소요시간: {timeFormat(value.timeRequired)}</Text>
      </TextWrapper>
      <ButtonWrapper>
        <IconButton onPress={() => navigation.replace('Home')}>
          <HomeSvg fill="#ffffff" />
        </IconButton>
        <IconButton
          onPress={() => navigation.replace('Quizzes', { isRestart: true })}>
          <RestartSvg fill="#ffffff" />
        </IconButton>
      </ButtonWrapper>
    </Container>
  );
}

export default Results;
