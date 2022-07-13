import { gql } from '@apollo/client'
import { REPOSITORY_FIELDS, REVIEW } from './fragments'

export const ME = gql`
  query ME(
    $first: Int
    $after: String
    $includeReviews: Boolean = false
  ) {
    me {
      id
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        ...repositoryReview
      }
    }
  }
  ${REVIEW}
`;

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String,
    $first: Int,
    $after: String
  ) {
    repositories (
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...repositoryFields
          ratingAverage
          reviewCount
        }
        cursor
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }

  ${REPOSITORY_FIELDS}
`

export const GET_REPOSITORY = gql`
  query ($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      url
      ...repositoryFields
      reviews(first: $first, after: $after) {
        ...repositoryReview
      }
    }
  },
  ${REPOSITORY_FIELDS}
  ${REVIEW}
`