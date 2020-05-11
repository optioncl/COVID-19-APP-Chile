import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export enum Distribution {
  vertical = 'vertical',
  horizontal = 'horizontal',
}

export enum Alignment {
  center = 'center',
  left = 'left',
  right = 'right',
  top = 'top',
  down = 'down',
}

export interface Props {
  children?: ReactNode | ReactNode[];
  style?: StyleProp<ViewStyle>;
  fullSize?: boolean;
  distribution?: Distribution;
  verticalAlignItems?: Alignment.top | Alignment.center | Alignment.down;
  horizontalAlignItems?: Alignment.left | Alignment.center | Alignment.right;
  spaceAround?: boolean;
}

const Stack = ({
  children,
  style = {},
  fullSize = false,
  distribution,
  verticalAlignItems,
  horizontalAlignItems,
  spaceAround = false,
}: Props) => {
  const containerStyle = [style];

  if (distribution === Distribution.vertical) {
    containerStyle.push(styles.verticalDistribution);
  } else if (distribution === Distribution.horizontal) {
    containerStyle.push(styles.horizontalDistribution);
  }

  if (fullSize) {
    containerStyle.push(styles.fullWidth);
  }

  if (spaceAround) {
    containerStyle.push(styles.spaceAround);
    if (!fullSize) {
      containerStyle.push(styles.fullWidth);
    }
  }

  if (distribution === Distribution.vertical) {
    switch (verticalAlignItems) {
      case Alignment.top:
        containerStyle.push(styles.justifyContentFlexStart);
        break;
      case Alignment.center:
        containerStyle.push(styles.justifyContentCenter);
        break;
      case Alignment.down:
        containerStyle.push(styles.justifyContentFlexEnd);
        break;
    }
    switch (horizontalAlignItems) {
      case Alignment.left:
        containerStyle.push(styles.alignItemsFlexEnd);
        break;
      case Alignment.center:
        containerStyle.push(styles.alignItemsCenter);
        break;
      case Alignment.right:
        containerStyle.push(styles.alignItemsFlexEnd);
        break;
    }
  }

  if (distribution === Distribution.horizontal) {
    switch (verticalAlignItems) {
      case Alignment.top:
        containerStyle.push(styles.alignItemsFlexStart);
        break;
      case Alignment.center:
        containerStyle.push(styles.alignItemsCenter);
        break;
      case Alignment.down:
        containerStyle.push(styles.alignItemsFlexEnd);
        break;
    }
    switch (horizontalAlignItems) {
      case Alignment.left:
        containerStyle.push(styles.justifyContentFlexStart);
        break;
      case Alignment.center:
        containerStyle.push(styles.justifyContentCenter);
        break;
      case Alignment.right:
        containerStyle.push(styles.justifyContentFlexEnd);
        break;
    }
  }

  return <View style={containerStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  fullWidth: { flex: 1 },
  spaceAround: { justifyContent: 'space-around' },
  verticalDistribution: { flexDirection: 'column' },
  horizontalDistribution: { flexDirection: 'row' },
  justifyContentFlexStart: { justifyContent: 'flex-start' },
  justifyContentCenter: { justifyContent: 'center' },
  justifyContentFlexEnd: { justifyContent: 'flex-end' },
  alignItemsFlexStart: { alignItems: 'flex-start' },
  alignItemsCenter: { alignItems: 'center' },
  alignItemsFlexEnd: { alignItems: 'flex-end' },
});

export default Stack;
