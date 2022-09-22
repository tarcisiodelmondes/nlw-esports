import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LogoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

interface GameProps {
  id: string;
  title: string;
  _count: { ads: number };
  bannerUrl: string;
}

export function Home() {
  const [gamesList, setGamesList] = useState<GameProps[]>([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchGameList() {
      const response = await fetch("http://192.168.0.100:3333/games/");

      const dataObject: GameProps[] = await response.json();

      setGamesList(dataObject);
    }

    fetchGameList();
  }, []);

  function handleOpenGame({ id, title, bannerUrl }: GameProps) {
    navigation.navigate("game", { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={LogoImg} defaultSource={LogoImg} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={gamesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <GameCard
                key={item.id}
                data={item}
                onPress={() => handleOpenGame(item)}
              />
            );
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
