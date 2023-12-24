import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  LayoutChangeEvent,
  LayoutRectangle,
  TouchableOpacity,
  View,
  processColor,
} from 'react-native';
import { PieChart } from 'react-native-charts-wrapper';

import HomeSvg from '../assets/images/home.svg';
import RestartSvg from '../assets/images/restart.svg';

import { RootStackParamList } from '../navigations/types';

import Container from '../components/Container';
import Text from '../components/Text';

import type { Quiz } from '../lib/api';
import { Colors, Mixins } from '../styles';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

type Answer = {
  questions: Quiz[];
  timeRequired: number;
  correctAnswerCount: number;
  incorrectAnswerCount: number;
  selectedAnswers: boolean[];
};

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
      <View style={{ paddingVertical: Mixins.scaleSize(20) }}>
        <Text fontSize={24} fontWeight={700}>
          결과
        </Text>
      </View>

      <View
        style={{
          width: Mixins.WINDOW_WIDTH - Mixins.scaleSize(40),
          height: Mixins.WINDOW_WIDTH - Mixins.scaleSize(40),
          backgroundColor: Colors.PRIMARY_DARK,
          borderRadius: 20,
        }}
        onLayout={handleLayout}>
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
      </View>
      <View style={{ paddingVertical: Mixins.scaleSize(10) }}>
        <Text fontSize={18}>소요시간: {timeFormat(value.timeRequired)}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: Mixins.WINDOW_WIDTH - Mixins.scaleSize(40),
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => navigation.replace('Home')}
          style={{
            width: '20%',
            height: Mixins.scaleSize(30),
            backgroundColor: Colors.PRIMARY,
            padding: Mixins.scaleSize(30),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <HomeSvg fill="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.replace('Quizzes', { isRestart: true })}
          style={{
            width: '20%',
            height: Mixins.scaleSize(30),
            backgroundColor: Colors.PRIMARY,
            padding: Mixins.scaleSize(30),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <RestartSvg fill="#ffffff" />
        </TouchableOpacity>
      </View>
    </Container>
  );
}

export default Results;
