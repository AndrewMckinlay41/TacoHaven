// This file stores the main client Javascript code for TacoHaven
//
// This "links up" the booking form with AWS Amplify - when it is submitted,
// we insert the data into the database & send an email.

// Import external dependencies
// This is the Javascript API provided by Amazon for interacting with Amplify
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { createBookingRequest } from './graphql/mutations';
import { listBookingRequests } from './graphql/queries';

/**
 * Main function, runs on page load
 */
function main() {
    console.log("Running TacoHaven app");
    
    configureAmplify();

    // Get the DOM element with ID `booking-form`
    let form = document.getElementById("booking-form");

    // This function will be run when the form is submitted
    form.addEventListener("submit", function(e) {
        // Don't refresh the page on form submit
        e.preventDefault();

        // Get the DOM elements which are children of the form (i.e: the
        // inputs), and send them to the API.
        processForm(e.target.children);
    });
}

/**
 * This function initialises the Amplify API with our public API keys
 */
function configureAmplify() {
    Amplify.configure(awsconfig);
    console.debug(Amplify);
}

/**
 * Submits form contents to AWS Amplify
 */
async function processForm(elements) {
    // This object will store the fields of the booking form
    let request = {};

    // Loop through all the inputs to store their values
    for (let child of elements) {
        // Ignore children of the form element which are not form inputs
        if (child.tagName != "INPUT" && child.tagName != "TEXTAREA") {
            continue;
        }

        // Fill in the request details from the form
        request[child.name] = child.value;
    }

    // Insert the booking request into the database
    // The AWS client SDK is asynchronous, so we need to await the result
    let apiResponse = await API.graphql(graphqlOperation(createBookingRequest, {input: request}));
    console.debug(apiResponse);
};

// Add event listener to run main function on page load
addEventListener("load", (_) => {main()});