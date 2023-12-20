import React, { PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { Mixins } from '../../styles';

type ContainerProps = {
  justifyContent?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  alignItems?:
    | 'center'
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'left'
    | 'right'
    | 'normal'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
};

type Props = PropsWithChildren & ContainerProps;

const SContainer = styled.View<ContainerProps>`
  flex: 1;
  justify-content: ${props => props.justifyContent};
  align-items: ${props => props.alignItems};
  background-color: ${props => props.theme.colors.background};
  padding-left: ${Mixins.scaleSize(10)}px;
  padding-right: ${Mixins.scaleSize(10)}px;
`;

function Container({
  justifyContent = 'stretch',
  alignItems = 'stretch',
  children,
}: Props): JSX.Element {
  return (
    <SContainer justifyContent={justifyContent} alignItems={alignItems}>
      {children}
    </SContainer>
  );
}

export default Container;
