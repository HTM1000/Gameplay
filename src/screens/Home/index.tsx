import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/database';

import { Background } from '../../components/Background';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Load } from '../../components/Load';

import { styles } from './styles';

export function Home(){
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(guildSelected: AppointmentProps){
    navigation.navigate('AppointmentDetails', { guildSelected })
  }

  function handleAppointmentCreate(){
    navigation.navigate('AppointmentCreate')
  }

  async function loadAppointment(){
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS)
    const storage : AppointmentProps[] = response ? JSON.parse(response) : [];

    if(category){
      setAppointments(storage.filter(item => item.category === category));
    } else {
      setAppointments(storage)
    }

    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointment();
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate}/>
      </View>

      <View>
        <CategorySelect 
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      </View>
    {
      loading ? <Load /> :
      <>
        <ListHeader 
          title='Partidas Agendadas'
          subtitle={`Total ${appointments.length}`}
        />

      <FlatList 
        data={appointments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Appointment 
          data={item} 
          onPress={() => handleAppointmentDetails(item)}
          />
        )}
        ItemSeparatorComponent={() => <ListDivider /> }
        style={styles.matches}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 69 }}
      />
      </>
    }
    </Background>
  )
}