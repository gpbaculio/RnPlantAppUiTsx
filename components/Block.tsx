import React from 'react';
import styled, {css} from 'styled-components/native';

interface BlockViewProps {
  center?: boolean;
  bot?: boolean;
  flex?: number;
}

const BlockView = styled.View<BlockViewProps>`
  flex: 1;
  ${(props) =>
    css`
      ${props.center && 'align-items: center;'}
      ${props.bot && 'justify-content: flex-end;'}
      ${props.flex && `flex:${props.flex}`}
    `}
`;

interface BlockProps extends BlockViewProps {
  children: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({children, center, bot, flex}) => (
  <BlockView {...{center, bot, flex}}>{children}</BlockView>
);

export default Block;
