import { useContext } from 'react'
import { useApolloClient, useMutation } from '@apollo/react-hooks'

import AuthStorageContext from '../../context/AuthStorageContext'
import { SIGN_IN } from '../../graphql/mutations'

export const useSignIn = () => {
  const apolloClient = useApolloClient()
  const [mutate, result] = useMutation(SIGN_IN)
  const authStorage = useContext(AuthStorageContext)

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { username, password },
    });

    await authStorage.setAccessToken(data.authenticate.accessToken)

    apolloClient.resetStore()

    return data;
  };

  return [signIn, result]
}
