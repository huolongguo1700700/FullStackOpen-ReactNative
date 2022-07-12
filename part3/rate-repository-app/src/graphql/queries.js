import { gql } from '@apollo/client'
import { REPOSITORY_FIELDS } from './fragments'

export const ME = gql`
  query ME {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...repositoryFields
          ratingAverage
          reviewCount
        }
      }
    }
  }

  ${REPOSITORY_FIELDS}
`