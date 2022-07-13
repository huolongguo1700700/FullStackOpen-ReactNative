import { useMutation } from '@apollo/react-hooks'
import { CREATE_USER } from '../../graphql/mutations'

export const useSignUp = () => {
    const [mutate, result] = useMutation(CREATE_USER)

    const signUp = async ({ username, password }) => {
        const { data } = await mutate({ variables: { username, password }})

        return data
    }

    return [signUp, result]
}