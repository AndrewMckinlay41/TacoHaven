/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBookingRequest = /* GraphQL */ `
  query GetBookingRequest($id: ID!) {
    getBookingRequest(id: $id) {
      fname
      lname
      email
      tel
      date
      time
      numofg
      comments
      id
      createdAt
      updatedAt
    }
  }
`;
export const listBookingRequests = /* GraphQL */ `
  query ListBookingRequests(
    $filter: ModelBookingRequestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookingRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        fname
        lname
        email
        tel
        date
        time
        numofg
        comments
        id
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
