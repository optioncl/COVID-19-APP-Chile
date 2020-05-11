import React from 'react';
import Typography, { Props as TypographyProps } from '../../atoms/Typography';

interface Props extends TypographyProps {
  bold?: boolean;
}

const Subtitle1 = (props: Props) => {
  return (
    <Typography
      {...props}
      fontFamily={props.bold ? 'Nunito-SemiBold' : 'Nunito-Regular'}
      fontSize={16}
      color={'rgba(0, 0, 0, 0.87)'}
      center>
      {props.children}
    </Typography>
  );
};

export default Subtitle1;
