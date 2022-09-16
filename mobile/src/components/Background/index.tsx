import { ReactNode } from "react";
import { ImageBackground } from "react-native";
import { styles } from "./styles";

import BackgroundImg from "../../assets/background-galaxy.png";

interface Props {
  children: ReactNode;
}

export function Background({ children }: Props) {
  return (
    <ImageBackground
      source={BackgroundImg}
      defaultSource={BackgroundImg}
      style={styles.container}
    >
      {children}
    </ImageBackground>
  );
}
