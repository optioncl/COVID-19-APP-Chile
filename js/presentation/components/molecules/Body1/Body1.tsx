import React from 'react';
import Typography, { Props as TypographyProps } from '../../atoms/Typography';

interface Props extends TypographyProps {}

const Body1 = (props: Props) => {
  return (
    <Typography
      {...props}
      fontFamily={'Nunito-Regular'}
      fontSize={16}
      color={'rgba(0, 0, 0, 0.87)'}
      center>
      {props.children}
    </Typography>
  );
};

export default Body1;
