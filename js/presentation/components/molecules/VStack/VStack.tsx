import React from 'react';
import Stack, {
  Props as StackProps,
  Distribution,
} from '../../atoms/Stack/Stack';

const VStack = (props: StackProps) => {
  return (
    <Stack distribution={Distribution.vertical} {...props}>
      {props.children}
    </Stack>
  );
};

export default VStack;
