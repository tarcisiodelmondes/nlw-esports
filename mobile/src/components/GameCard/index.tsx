import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  ImageURISource,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { THEME } from "../../theme";

import { styles } from "./styles";

interface GameCardProps {
  id: string;
  name: string;
  ads: string;
  cover: ImageURISource;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.cover}
        source={data.cover}
        defaultSource={data.cover}
      >
        <LinearGradient style={styles.footer} colors={THEME.COLORS.FOOTER}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.ads}>{data.ads} anúncios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
