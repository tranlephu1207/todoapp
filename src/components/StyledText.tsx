import { Text, TextProps } from 'react-native';

interface StyledTextProps extends TextProps {
  font?: string;
}

export default function StyledText(props: StyledTextProps) {
  return (
    <Text {...props} style={[props.style, !!props.font && { fontFamily: props.font }]} />
  );
}
