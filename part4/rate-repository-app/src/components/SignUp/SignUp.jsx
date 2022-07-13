import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import FormikTextInput from '../Formik/FormikTextInput'
import theme from '../../styles/theme'
import Text from '../Text'
import { useSignUp } from '../hooks/useSignUp'
import { useSignIn } from '../hooks/useSignIn'

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    },
    btn: {
        backgroundColor: theme.colors.primary,
        borderRadius: 5,
        margin: 10
      },
      input: {
        height: 40,
        width: 300,
        margin: 10
    }
})

const validationSchema = yup.object().shape({
  username: yup.string()
    .min(1, 'Username must be longer than 1 character')
    .max(30, 'Username must be less than 30 characters')
    .required('Username is required'),
  password: yup.string()
    .min(5, 'Password must be longer than 5 characters')
    .max(50, 'Password must be less than 50 characters')
    .required('Password is required'),
  confirmationPassword: yup.string()
    .oneOf([yup.ref('password')], 'Password does not match')
    .required('Confirmation password is required')
})

const SignUpContainer = ({ onSubmit }) => (
  <Formik
    initialValues={{
      username: '',
      password: ''
    }}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            style={styles.input}
            name='username'
            placeholder='Username'
          />
          <FormikTextInput
            style={styles.input}
            name='password'
            placeholder='Password'
            secureTextEntry
          />
          <FormikTextInput
            style={styles.input}
            name='confirmationPassword'
            placeholder='Confirmation Password'
            secureTextEntry
          />
  
          <TouchableWithoutFeedback onPress={handleSubmit}>
            <View style={styles.btn}>
              <Text style={{ color: 'white', margin: 5 }}>Create a review</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    )}
  </Formik>
)

const SignUp = () => {
    const [signUp] = useSignUp()
    const [signIn] = useSignIn()
    const navigate = useNavigate()
    
    const onSubmit = async (input) => {
        try {
          const { username, password } = input
          await signUp({ username, password })
          await signIn({ username, password })
          navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <SignUpContainer onSubmit={onSubmit} />
    )
}

export default SignUp