import { StyleSheet, View, Button } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Formik } from 'formik'
import FormikTextInput from './Formik/FormikTextInput';
import * as yup from 'yup';
import { useSignIn } from './hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh'
  },
  btn: {
    alignSelf: 'center'
  },
  textField: {
    height: 50
  }
});

const SignIn = () => {
  const navigate = useNavigate()
  const [ signIn ] = useSignIn()

  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });
  
  const onSubmit = async (values) => {
    const { username, password } = values
    try {
      const data = await signIn({ username, password })
      console.log(data);
      navigate('/')
    }
    catch (e) {
      return
    }
  };

  return (
    <View>
        <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {({ handleSubmit }) => (
              <View style={styles.container}>
                  <FormikTextInput style={styles.textField} name='username' placeholder='Username' />
                  <FormikTextInput style={styles.textField} name='password' placeholder='Password' secureTextEntry  />
                  <Button 
                    onPress={handleSubmit}
                    title='Sign In'
                    />
              </View>
            )}
        </Formik>
    </View>
  )
};

export default SignIn;