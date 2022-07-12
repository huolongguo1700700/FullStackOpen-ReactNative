import { View } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';

const AppBarTab = ({ children, to, onPress }) => (
  <Link onPress={onPress}
    to={to}
    activeOpacity={0.7}
  >
    <View style={{ margin: 5, justifyContent: 'center' }}>
      <Text style={{ color: 'white' }}>
        {children}
      </Text>
    </View>
  </Link>
)

export default AppBarTab;