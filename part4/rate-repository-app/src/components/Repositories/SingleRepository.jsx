import { View, FlatList } from 'react-native';
import { useParams } from 'react-router-native'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem item={repository} />
  </View>
);

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, fetchMore } = useRepository({ id, first: 5 })

  const onEndReach = () => {
    fetchMore()
  }

  const reviews = repository?.reviews.edges

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem key={item.node.id} review={item} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
    />
  )
}

export default SingleRepository