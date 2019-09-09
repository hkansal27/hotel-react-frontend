import defaultImg from '../images/room-1.jpeg';

import Styled from 'styled-components';

const StyledHero = Styled.header`
  min-height: 60vh;
  background: url(${props => (props.img ? props.img : defaultImg)}) center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero