import React from 'react';
import { Image, View } from 'react-native';
import DiscordSVG from '../../assets/discord.svg'

import { styles } from './styles';

const { CDN_IMAGE } = process.env;

interface Props {
  guildId: string;
  iconId: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`

  return (
    <View style={styles.container}>
    {
      iconId ?  
      <Image 
      style={styles.image} 
      source={{ uri }}
      resizeMode="cover"
      /> 
      :
      <DiscordSVG
        width={40}
        height={40}
      />
    }
    </View>

  );
}