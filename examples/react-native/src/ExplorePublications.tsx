import {
  PublicationSortCriteria,
  PublicationTypes,
  useExplorePublications,
} from "@lens-protocol/react";
import { View, Text } from "react-native";

export function ExplorePublications() {
  const { data: publications, loading } = useExplorePublications({
    sortCriteria: PublicationSortCriteria.TopCommented,
    publicationTypes: [PublicationTypes.Comment, PublicationTypes.Post],
  });

  if (loading) return <Text>Loading</Text>;

  return (
    <View>
      <Text>{JSON.stringify(publications)}</Text>
    </View>
  );
}
