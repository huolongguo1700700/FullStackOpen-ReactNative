import { gql } from '@apollo/client'

export const REPOSITORY_FIELDS = gql`
    fragment repositoryFields on Repository {
        id,
        name,
        fullName,
        ownerName,
        stargazersCount,
        forksCount,
        ownerAvatarUrl,
        description,
        language,
        createdAt
    }
`;

export const REVIEW = gql`
    fragment repositoryReview on ReviewConnection {
        edges {
            node {
                id
                text
                rating
                repositoryId
                createdAt
                user {
                    id
                    username
                }
            }
            cursor
        }
        pageInfo {
            hasPreviousPage
            hasNextPage
            endCursor
            startCursor
        }
        totalCount
    }
`
