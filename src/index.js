// Import external dependencies
// This is the Javascript API provided by Amazon for interacting with Amplify
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import { createBookingRequest } from './graphql/mutations';
import { listBookingRequests } from './graphql/queries';

/**
 * Main function, run on page load
 */
function main() {
    console.log("Running TacoHaven app");
    
    configureAmplify();

    // Get the HTML element with ID `booking-form`
    let form = document.getElementById("booking-form");

    // This callback will be run when the form is submitted
    form.addEventListener("submit", function(e) {
        // Don't refresh the page on form submit
        e.preventDefault();

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

    for (let child of elements) {
        // Ignore children of the form element which are not form inputs
        if (child.tagName != "INPUT" && child.tagName != "TEXTAREA") {
            continue;
        }

        request[child.name] = child.value;
    }

    // Insert the booking request into the database
    let res = await API.graphql(graphqlOperation(createBookingRequest, {input: request}));
    console.debug(res);
};

// Add event listener to run main function on page load
addEventListener("load", (_) => {main()});