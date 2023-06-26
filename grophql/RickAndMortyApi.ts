import { gql } from '@apollo/client';
import request from 'graphql-request';

export const getFilteredItems = async(page: number, filter: any, query: any) => await request(
  YOUR_GRAPHQL_ENDPOINT,
  query,
{
  page: page,
  filter: {...filter}
}
);

export const getItemById = async(id: number, query: any, field: string) => await request(
  YOUR_GRAPHQL_ENDPOINT,
  query, 
  {id}
).then((data: any) => data[field])

export const YOUR_GRAPHQL_ENDPOINT = 'https://rickandmortyapi.com/graphql';

export const CHARACTERS_QUERY = gql`
query Characters($page: Int!, $filter: FilterCharacter){
    characters(page: $page, filter: $filter) {
      info {
        next
        pages
      }
      results {
        name
        id
        image
        species
        status
      }
    }
  }`;


export const CHARACTER_QUERY = gql`
  query Character($id: ID!){
    character(id: $id) {
        name
        id
        image
        species
        status
        gender
        origin {
            id
            name
        }
        location {
            id
            name
        }
        episode {
            id
            name
        }
    }
  }
  `

export const LOCATION_QUERY = gql`
  query Location($id: ID!){
    location(id: $id) {
      name
      id
      residents {
        name
        image
        id
        species
        status
      }
    }
  }
  `

export const EPISODE_QUERY = gql`
  query Episode($id: ID!){
    episode(id: $id) {
        name
        id
        air_date
        episode
        characters {
            name
            image
            id
            species
            status
        }
    }
  }
  `

  export const EPISODES_QUERY = gql`
  query Episodes ($page: Int!, $filter: FilterEpisode){
    episodes(page: $page, filter: $filter) {
        info {
            next
            pages
          }
      results {
        name
        id
        episode
        characters {
          id
        }
      }
    }
  }`

  export const LOCATIONS_QUERY = gql`
  query Locations ($page: Int!, $filter: FilterLocation){
    locations(page: $page, filter: $filter) {
        info {
            next
            pages
          }
      results {
        name
        id
        dimension
        residents {
          id
        }
      }
    }
  }`
