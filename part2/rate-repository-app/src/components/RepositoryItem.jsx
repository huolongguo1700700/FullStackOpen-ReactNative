import { View, StyleSheet, Image } from 'react-native'
import Text from './Text';
import theme from '../styles/theme'

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1
  },
  tinyLogo: {
    width: 50,
    height: 50,
    flexGrow: 0,
    margin: 5
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    marginTop: 5,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    color: 'white',
    marginHorizontal: 5
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  description: {
    display: 'flex',
    flexShrink: 1,
    margin: 15,
    alignItems: 'center',
  }
});

const kFormatter = (num) => {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}

const RepositoryItem = ({ item }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl
  } = item

  return (
    <View>
        <View style={styles.flexContainer}>
            <Image
                style={styles.tinyLogo}
                source={ownerAvatarUrl}
            />
            <View style={{ display: 'flex', flexDirection: 'column', margin: 5, flexShrink: 1 }}>
                <Text fontWeight='bold'>{fullName}</Text>
                <Text fontWeight='subheading'>Description: {description}</Text>
                <View style={{ flexDirection: 'row', flexGrow: 1 }}>
                    <Text style={styles.language}>{language}</Text>
                </View>
            </View>
            
        </View>

        <View style={styles.descriptionContainer}>
            <View style={styles.description}>
                <Text fontWeight='bold'>{kFormatter(stargazersCount)}</Text>
                <Text>Stars</Text>
            </View>
            <View style={styles.description}>
                <Text fontWeight='bold'>{kFormatter(forksCount)}</Text>
                <Text>Forks</Text>
            </View>
            <View style={styles.description}>
                <Text fontWeight='bold'>{reviewCount}</Text>
                <Text>Reviews</Text>
            </View>
            <View style={styles.description}>
                <Text fontWeight='bold'>{ratingAverage}</Text>
                <Text>Rating</Text>
            </View>
        </View>
    </View>
  )
}

export default RepositoryItem;