import React from 'react';
import { useNavigate } from 'react-router-native'
import { FlatList } from 'react-native'
import { useQuery } from '@apollo/react-hooks';
import { ME } from '../../graphql/queries';
import ReviewItem from '../Repositories/ReviewItem';

const UserReviews = () => {
  const navigate = useNavigate()
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (!data) return null

  const reviews = data?.me.reviews.edges

  return (
    <FlatList
        data={reviews}
        renderItem={({ item }) => <ReviewItem key={item.id} review={item} action navigate={navigate}  refetch={refetch} />}
        keyExtractor={({ node }) => node.id}
    />
  );
};

export default UserReviews;