import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, Text, View } from 'react-native';

import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { loadPlant, PlantProps, removePlant } from '../../lib/storage';

import { Header } from '../../components/Header';
import { PlantCardSecondary } from '../../components/PlantCardSecondary';
import { Load } from '../../components/Load';

import { styles } from './styles';
import waterdrop from '../../assets/waterdrop.png';

export function MyPlants() {

  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('Remove', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não 🙏',
        style: 'cancel'
      },
      {
        text: 'Sim 😢',
        onPress: async () => {
          try {
            await removePlant(plant.id);

            setPlants(old =>
              old.filter(item => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert('Não foi possível remover! 😢');
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageDate() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      );

      setNextWatered(
        `Não esqueça de ragar a ${plantsStoraged[0].name} à ${nextTime} horas.`
      );

      setPlants(plantsStoraged);
      setLoading(false);
    }

    loadStorageDate();
  }, [])

  if(loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
          <Image
            style={styles.spotlightImage}
            source={waterdrop}
          />

          <Text style={styles.spotlightText}>
            {nextWatered}
          </Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>
          Próximas regadas
        </Text>

        <FlatList
          data={plants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => (
            <PlantCardSecondary
              data={item}
              handleRemove={() => handleRemove(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
