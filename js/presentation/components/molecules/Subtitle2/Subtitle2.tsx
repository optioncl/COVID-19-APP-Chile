import React from 'react';
import Typography, { Props as TypographyProps } from '../../atoms/Typography';

interface Props extends TypographyProps {
  bold?: boolean;
}

const Subtitle2 = (props: Props) => {
  return (
    <Typography
      {...props}
      fontFamily={'Nunito-Medium'}
      fontSize={14}
      color={'rgba(0, 0, 0, 0.87)'}
      center>
      {props.children}
    </Typography>
  );
};

export default Subtitle2;
