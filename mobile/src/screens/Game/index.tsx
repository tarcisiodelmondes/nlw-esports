import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import { Background } from "../../components/Background";
import { styles } from "./styles";
import { THEME } from "../../theme";

import LogoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { DuoCard } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

interface Ad {
  hourEnd: string;
  hourStart: string;
  name: string;
  id: string;
  useVoiceChannel: boolean;
  weekDays: [string];
  yearsPlaying: number;
}

export function Game() {
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  const [ads, setAds] = useState<Ad[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState("");

  useEffect(() => {
    async function fetchAds() {
      const response = await fetch(
        `http://192.168.0.100:3333/games/${game.id}/ads`
      );

      const dataObject: Ad[] = await response.json();

      setAds(dataObject);
    }

    fetchAds();
  }, []);

  function handleGoBack() {
    navigation.goBack();
  }

  async function getDiscordUser(adId: string) {
    const response = await fetch(
      `http://192.168.0.100:3333/ads/${adId}/discord`
    );

    const dataObject: Record<"discord", string> = await response.json();

    setDiscordDuoSelected(dataObject.discord);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={LogoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          resizeMode="cover"
          style={styles.cover}
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={ads}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <DuoCard data={item} onConnect={() => getDiscordUser(item.id)} />
            );
          }}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={{ color: "#fff" }}>
              N??o h?? an??ncios publicados ainda...
            </Text>
          )}
        />
        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected("")}
        />
      </SafeAreaView>
    </Background>
  );
}
