import { useContext } from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import AppBarTab from "./AppBarTab";
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { ME } from '../../graphql/queries'
import AuthStorageContext from '../../context/AuthStorageContext';

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#24292e',
      color: 'white',
    },
  });

const AppBar = () => {
  const { data } = useQuery(ME)
  const apolloClient = useApolloClient()
  
  const authStorage = useContext(AuthStorageContext)

  const logout = async () => {
    await authStorage.removeAccessToken();

    apolloClient.resetStore();
  };

    return (
        <ScrollView horizontal style={styles.container}>
            <AppBarTab to='/'>Repositories</AppBarTab>
            {
              data?.me ? (
                <>
                  <AppBarTab to='/create-review'>Create a review</AppBarTab>
                  <AppBarTab to='/my-reviews'>My reviews</AppBarTab>
                  <AppBarTab onPress={logout} to='/signin'>Sign out</AppBarTab>
                </>
              )
              : (
                <>
                  <AppBarTab to='/signin'>Sign In</AppBarTab>
                  <AppBarTab to='/signup'>Sign Up</AppBarTab>
                </>
              )
            }
        </ScrollView>
    )
}

export default AppBar;