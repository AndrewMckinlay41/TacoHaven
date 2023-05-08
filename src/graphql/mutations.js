/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBookingRequest = /* GraphQL */ `
  mutation CreateBookingRequest(
    $input: CreateBookingRequestInput!
    $condition: ModelBookingRequestConditionInput
  ) {
    createBookingRequest(input: $input, condition: $condition) {
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
export const updateBookingRequest = /* GraphQL */ `
  mutation UpdateBookingRequest(
    $input: UpdateBookingRequestInput!
    $condition: ModelBookingRequestConditionInput
  ) {
    updateBookingRequest(input: $input, condition: $condition) {
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
export const deleteBookingRequest = /* GraphQL */ `
  mutation DeleteBookingRequest(
    $input: DeleteBookingRequestInput!
    $condition: ModelBookingRequestConditionInput
  ) {
    deleteBookingRequest(input: $input, condition: $condition) {
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
