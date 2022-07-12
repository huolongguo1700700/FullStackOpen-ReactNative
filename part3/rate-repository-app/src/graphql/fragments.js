import { gql } from '@apollo/client'

export const REPOSITORY_FIELDS = gql`
    fragment repositoryFields on Repository {
        id,
        name,
        ownerName,
        stargazersCount,
        forksCount,
        url,
        ownerAvatarUrl,
        description,
        language,
        createdAt
    }
`;
