import { StyleSheet, View, Pressable, Text, StyleProp, PressableStateCallbackType, ViewStyle } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  label: string;
  theme?: 'primary' | 'secondary';
  lightColor?: string;
  darkColor?: string;
  onPress?: () => void;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
};

export default function Button({
  label,
  theme,
  onPress,
  lightColor,
  darkColor,
  style,
}: Props) {
  const borderColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'borderColor'
  );

  const getButtonStyle = (
    state: PressableStateCallbackType,
    baseStyle: StyleProp<ViewStyle>[]
  ) => {
    if (typeof style === 'function') {
      return [...baseStyle, style(state)];
    }
    return [...baseStyle, style];
  };

  if (theme === 'primary') {
    const baseStyle = [styles.button, { borderColor }];
    return (
      <Pressable style={(state) =>  getButtonStyle(state, baseStyle)} onPress={onPress}>
        <Text style={[styles.buttonLabel]}>{label}</Text>
      </Pressable>
    );
  }

  if (theme === 'secondary') {
    const baseStyle = [styles.buttonSecondary];
    return (
      <Pressable style={(state) => getButtonStyle(state, baseStyle)} onPress={onPress}>
        <Text style={[styles.buttonLabel]}>{label}</Text>
      </Pressable>
    );
  }

  const baseStyle = [styles.button, { borderColor }];
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={(state) => getButtonStyle(state, baseStyle)}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 18,
    borderWidth: 2,
    width: 'auto',
    maxHeight: 44,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonSecondary: {
    borderRadius: 18,
    width: 'auto',
    maxHeight: 42,
    height: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#e9e9e9'
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    fontSize: 18,
    width: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
