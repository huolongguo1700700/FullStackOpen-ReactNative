import { useQuery } from '@apollo/react-hooks';
import { GET_REPOSITORY } from '../../graphql/queries';

const useRepository = ({ id, first }) => {
  const { data, fetchMore, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id, first },
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data?.repository.reviews.pageInfo.endCursor,
        id,
        first
      }
    })
  }

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore
  };
};

export default useRepository;
