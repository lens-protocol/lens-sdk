import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications,
} from '@lens-protocol/react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

export function ExplorePublications() {
  const {data: publications, loading} = useExplorePublications({
    sortCriteria: PublicationSortCriteria.TopCommented,
    publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
  });

  if (loading) return <Text>Loading</Text>;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.header}>Publications to explore:</Text>
      <ScrollView>
        {publications.map(publication => (
          <View key={publication.id} style={styles.publication}>
            <Text>Author: {publication.profile.handle}</Text>
            <Text>{publication.metadata.content}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    fontSize: 24,
  },
  publication: {
    marginVertical: 10,
  },
});
