import { FlatList, Image, Text, View } from "react-native";

import LogoImg from "../../assets/logo-nlw-esports.png";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";
import { GAMES } from "../../utils/games";
import { styles } from "./styles";

export function Home() {
  const gamesList = GAMES;

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={LogoImg} defaultSource={LogoImg} />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={gamesList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <GameCard key={item.id} data={item} />;
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </View>
  );
}
