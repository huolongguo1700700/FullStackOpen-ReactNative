import { View, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import Text from '../Text'
import theme from '../../styles/theme'
import { format } from 'date-fns'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_REVIEW } from '../../graphql/mutations'

const styles = StyleSheet.create({
    flexContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    rating: {
        flexGrow: 0,
        width: 50,
        height: 50,
        borderRadius: 25,
        borderColor: theme.colors.primary,
        borderStyle: 'solid',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    textContainer: {
        flexDirection: 'column',
        flexShrink: 1,
    },
    name: {
        flexGrow: 0,
        margin: 5
    },
    text: {
        flexGrow: 1,
        margin: 5
    },
    subheading: {
        margin: 2,
        color: theme.colors.textSecondary
    },
    actions: {
        flexDirection: 'row'
    }
})

const ReviewItem = ({ review, action, navigate, refetch }) => {
  const { rating, createdAt, text, user, repositoryId, id } = review.node
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const onDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'CANCEL', style: 'cancel' },
        {
          text: 'DELETE',
          onPress: async () => {
            if (refetch) {
              await deleteReview({ variables: { id: id } });
              await refetch({ includeReviews: true });
            }
          }
        }
      ]
    )
  }

  return (
    <View style={styles.flexContainer}>
        <View style={styles.rating}>
            <Text>{rating}</Text>
        </View>
        <View style={styles.textContainer}>
            <View style={styles.name}>
                <Text fontWeight='bold'>{user.username}</Text>
            </View>
            <View style={styles.subheading}>
                <Text>{format(new Date(createdAt), 'MM.dd.yyyy')}</Text>
            </View>
            <View style={styles.text}>
                <Text>{text}</Text>
            </View>
            { action && <View style={styles.actions}>
                <TouchableWithoutFeedback onPress={() => navigate(`/${repositoryId}`)}>
                    <View style={{
                        backgroundColor: theme.colors.primary,
                        flexGrow: 0,
                        marginHorizontal: 5,
                        width: 150,
                        alignItems: 'center'
                      }}>
                        <Text style={{ color: 'white', margin: 5 }}>View Repository</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={onDelete}>
                    <View style={{
                        backgroundColor: theme.colors.red,
                        flexGrow: 1,
                        maxWidth: 150,
                        alignItems: 'center'
                      }}>
                        <Text style={{ color: 'white', margin: 5 }}>Delete</Text>
                    </View>
                </TouchableWithoutFeedback>
              </View>
            }
        </View>
    </View>
  )
}

export default ReviewItem