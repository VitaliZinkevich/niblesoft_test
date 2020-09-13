import * as React from 'react';
import { Text as DefaultText, View as DefaultView, TouchableOpacity as DefaultTouchableOpacity } from 'react-native';
import { inject, observer } from 'mobx-react';
import observableStore from '../store/store';
import Colors from '../constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  theme: string
) {
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type TouchableOpacityProps = ThemeProps & DefaultTouchableOpacity['props'];

export const Text = inject('observableStore') (observer (function (props: TextProps) {
  const { observableStore, style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text', observableStore.localTheme);

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}))  

export const View =  inject('observableStore') (observer (function (props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background', observableStore.localTheme);

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
} ))

export const TouchableOpacity = inject('observableStore') (observer (
  function (props: TouchableOpacityProps) {
    const { style, lightColor, darkColor, ...otherProps } = props;
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background', observableStore.localTheme);
  
    return <DefaultTouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
  }
))  
