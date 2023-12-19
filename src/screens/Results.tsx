import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

function Results({}: Props): JSX.Element {
  return (
    <View>
      <Text>Results</Text>
    </View>
  );
}

export default Results;
