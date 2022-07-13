import React, { useState } from 'react'
import { useNavigate } from 'react-router-native'
import { useDebounce } from 'use-debounce'
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories'
import { Button, Menu, Searchbar } from 'react-native-paper'

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    display: 'flex',
  }
});


const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeaderComponent = () => {
    const {
      setSelectedSorting,
      visible,
      setVisible,
      searchQuery,
      setSearchQuery
    } = this.props

    return (
      <>
        <Searchbar
          placeholder='Search'
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
        <Menu
          style={{ margin: 5 }}
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Button onPress={() => setVisible(true)}>Sorting</Button>}
        >
          <Menu.Item title='Latest repositories' onPress={() => {
            setSelectedSorting('latest')
            setVisible(false)
          }} />
          <Menu.Item title='Highest rated repositories' onPress={() => {
            setSelectedSorting('highest_rated')
            setVisible(false)
          }} />
          <Menu.Item title='Lowest rated repositories' onPress={() => {
            setSelectedSorting('lowest_rated')
            setVisible(false)
          }} />
        </Menu>
      </>
    )
  }

  render() {
    const { repositories, navigate, onEndReach } = this.props
    const repositoryNode = repositories
      ? repositories.edges.map(edge => edge.node)
      : []
  
      return (
        <FlatList
          style={styles.container}
          data={repositoryNode}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={this.renderHeaderComponent}
          renderItem={({ item }) => (
            <Pressable key={item.id} onPress={() => navigate(`/${item.id}`)}>
              <RepositoryItem item={item} />
            </Pressable>
          )}
          keyExtractor={repositories => repositories.id}
          onEndReached={onEndReach}
        />
      );
  }
}

const RepositoryList = () => {
  const navigate = useNavigate()
  const [selectedSorting, setSelectedSorting] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  const [visible, setVisible] = useState()
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)


  const { repositories, fetchMore } = useRepositories({
    first: 5,
    criteria: selectedSorting,
    searchKeyword: debouncedSearchQuery
  })

  const onEndReach = () => {
    fetchMore()
  }

  return <RepositoryListContainer
    repositories={repositories}
    selectedSorting={selectedSorting}
    setSelectedSorting={setSelectedSorting}
    visible={visible}
    setVisible={setVisible}
    navigate={navigate}
    searchQuery={searchQuery}
    setSearchQuery={setSearchQuery}
    onEndReach={onEndReach} />;
};

export default RepositoryList;