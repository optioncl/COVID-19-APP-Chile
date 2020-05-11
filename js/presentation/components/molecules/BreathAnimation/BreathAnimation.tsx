import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

// Components
import Typography from '../../atoms/Typography';

interface Props {
  duration?: number;
  onFinish?: () => void;
  endMessage?: string;
  style?: React.CSSProperties;
}

const BreathAnimation = (props: Props) => {
  const { duration = 60, onFinish = () => {}, endMessage } = props;

  const [fadeContainer] = useState(new Animated.Value(0));
  const [lottieProgress] = useState(new Animated.Value(1));
  const [fadeEndText] = useState(new Animated.Value(0));
  const [fadeCountdownText] = useState(new Animated.Value(0));
  const [countdown, setCountdown] = useState(duration);

  const methods = {
    startAnimation: () => {
      Animated.parallel([
        Animated.timing(fadeContainer, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(fadeCountdownText, {
          toValue: 1,
          duration: 2500,
        }),
      ]).start();
    },
    finalizeAnimation: () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(lottieProgress, {
            toValue: 0,
          }),
          Animated.timing(fadeCountdownText, {
            toValue: 0,
            duration: 90,
          }),
          Animated.timing(fadeEndText, {
            toValue: 1,
            duration: 110,
          }),
        ]),
        Animated.timing(fadeContainer, {
          toValue: 0,
          duration: 250,
        }),
      ]).start();
      setTimeout(() => onFinish(), 200);
    },
  };

  useEffect(() => {
    if (countdown === duration) methods.startAnimation();
    const timer = setInterval(() => {
      if (countdown > 0) setCountdown(countdown - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown, duration, methods]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeContainer }]}>
      <LottieView
        source={require('./animation.json')}
        autoPlay
        loop={countdown > 0}
        onAnimationFinish={methods.finalizeAnimation}
        progress={lottieProgress}
        style={styles.lottie}
      />
      <Animated.View
        style={[styles.animatedContainer, { opacity: fadeCountdownText }]}>
        <Typography style={styles.text}>{countdown}</Typography>
      </Animated.View>
      <Animated.View
        style={[styles.animatedContainer, { opacity: fadeEndText }]}>
        <Typography style={styles.text}>{endMessage}</Typography>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
  },
  lottie: {
    height: 380,
    width: 380,
    margin: 'auto',
    position: 'relative',
  },
  animatedContainer: {
    position: 'absolute',
    margin: 'auto',
  },
  text: {
    fontFamily: 'Nunito',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default BreathAnimation;
