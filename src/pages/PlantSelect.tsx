import React, { useEffect, useState } from 'react';
import { 
  Text, 
  View,
  StyleSheet,
  FlatList
} from 'react-native';
import { EnviromentButton } from '../components/EnviromentButton';

import { Header } from '../components/Header';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import api from '../services/api';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps{
  key: string;
  title: string;
}

interface PlantProps{
  id: string;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  }
}

export function PlantSelect(){
  const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState('all');
  const [loading, setLoading] = useState(true);

  function handleEnviromentSelected(environment: string){ 
    setEnviromentSelected(environment);
    if(environment == 'all')
      return setFilteredPlants(plants);

    const filtered = plants.filter(plant => 
      plant.environments.includes(environment)  
    );
    setFilteredPlants(filtered);
  }

  useEffect(() => {
    async function fetchEnviroment(){
      const { data } = await api
      .get('plants_environments?_sort=title&_order=asc');
      setEnviroment([
        {
          key: 'all',
          title: 'Todos',
        },
        ...data
      ]);
      
    }
    fetchEnviroment();
    
  }, []);

  useEffect(() => {
    async function fetchPlants(){
      const { data } = await api
      .get('plants?_sort=name&_order=asc');
      setPlants(data);
      setLoading(false);
    }

    fetchPlants();
  }, []);

  if(loading)
    return <Load/>

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header/>

        <Text style={styles.title}>
          Em qual ambiente
        </Text>
        <Text style={styles.subtitle}>
          você quer colocar sua planta?
        </Text>
      </View>

      <View>
        <FlatList 
          contentContainerStyle={styles.enviromentList}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={enviroment}
          renderItem={ ({ item }) => (
            <EnviromentButton 
              title={item.title}
              active={item.key === enviromentSelected}
              onPress={() => handleEnviromentSelected(item.key)}
            />
          )}
        />
      </View>
      
      <View style={styles.plants}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={enviromentSelected == 'all'? plants:filteredPlants}
          renderItem={({item}) => (
            <PlantCardPrimary 
              data={item}
            />
          )}
          
        />
      </View>
      

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.background
  },

  header:{
    paddingHorizontal: 30
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15
  },

  subtitle:{
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading
  },

  enviromentList:{
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32
  },

  plants:{
    flex:1,
    paddingHorizontal: 32,
    justifyContent: 'center'
  },

  
})