import { useQuery } from '@apollo/react-hooks'
import { GET_REPOSITORIES } from '../../graphql/queries'

const criteriaOpts = {
  latest: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  highest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  lowest_rated: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
}

const useRepostiories = (variables) => {
    const variablesObj = {
      ...criteriaOpts[variables.criteria],
      searchKeyword: variables.searchKeyword,
      first: variables.first
    }

    const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
      fetchPolicy: 'cache-and-network',
      variables: variablesObj
    })

    const handleFetchMore = () => {
      const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

      if (!canFetchMore) {
        return;
      }

      fetchMore({
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables
        }
      })
    }

    return {
      repositories: data?.repositories,
      fetchMore: handleFetchMore,
      loading,
      ... result
    }
}

export default useRepostiories
