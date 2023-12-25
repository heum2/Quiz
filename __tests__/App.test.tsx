import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';

import { describe, it, expect } from '@jest/globals';

import App from '../App';

describe('App', () => {
  it('App이 정상적으로 렌더링 되는가?', () => {
    const screen = render(<App />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
