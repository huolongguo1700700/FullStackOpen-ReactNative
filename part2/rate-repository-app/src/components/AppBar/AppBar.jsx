import { StyleSheet, ScrollView } from 'react-native';
import AppBarTab from "./AppBarTab";
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#24292e',
      color: 'white',
    },
  });

const AppBar = () => {

    return (
        <ScrollView horizontal style={styles.container}>
            <AppBarTab to='/'>Repositories</AppBarTab>
            <AppBarTab to='/signin'>Sign In</AppBarTab>
        </ScrollView>
    )
}

export default AppBar;