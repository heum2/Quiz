import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { Mixins } from '../../styles';

type TextProps = {
  color?: string;
  fontWeight?: number;
  fontSize?: number;
};
type Props = TextProps & PropsWithChildren;

const SText = styled.Text<TextProps>`
  color: ${props => props.color};
  font-size: ${props =>
    props.fontSize ? Mixins.scaleFont(props.fontSize) : Mixins.scaleFont(16)}px;
  font-weight: ${props => props.fontWeight};
`;

function Text({
  color = '#ffffff',
  fontWeight = 400,
  fontSize = 16,
  children,
}: Props): JSX.Element {
  return (
    <SText color={color} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </SText>
  );
}

export default Text;
