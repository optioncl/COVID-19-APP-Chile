import React from 'react';
import Stack, {
  Props as StackProps,
  Distribution,
} from '../../atoms/Stack/Stack';

const HStack = (props: StackProps) => {
  return (
    <Stack distribution={Distribution.horizontal} {...props}>
      {props.children}
    </Stack>
  );
};

export default HStack;
