import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { useNavigate } from 'react-router-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_REVIEW } from '../../graphql/mutations'
import FormikTextInput from '../Formik/FormikTextInput'
import Text from '../Text'
import theme from '../../styles/theme'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
  ownerName: yup.string().required(`Repository owner's username is required`),
  repositoryName: yup.string().required(`Repository's name is a required`),
  rating: yup.number()
    .min(0, 'Minimum rating is 0')
    .max(100, 'Maximum rating is 100')
    .required('Rating is required'),
  review: yup.string().required('Review is required')
})

const ReviewForm = () => {
  const navigate = useNavigate()
  const [createReview] = useMutation(CREATE_REVIEW, {
    onCompleted(data) {
      navigate(`/${data.createReview.repositoryId}`)
    }
  })

  const onSubmit = async (filledReview) => {
    try {
      await createReview({
        variables: {
          ...filledReview,
          rating: parseInt(filledReview.rating)
        }
      })
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        review: ''
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            style={styles.input}
            name='ownerName'
            placeholder='Owner Name' />
          <FormikTextInput
            style={styles.input}
            name='repositoryName'
            placeholder='Repository Name'
          />
          <FormikTextInput
            style={styles.input}
            name='rating'
            placeholder='Rating'
            keyboardType='numeric'
          />
          <FormikTextInput
            style={styles.input}
            name='review'
            placeholder='Review'
            multiline
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
}

export default ReviewForm