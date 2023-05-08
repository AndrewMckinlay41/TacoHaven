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
    configureAmplify();

    // Get the HTML element with ID `booking-form`
    let form = document.getElementById("booking-form");

    // This callback will be run when the form is submitted
    form.addEventListener("submit", function(e) {
        // Don't refresh the page on form submit
        e.preventDefault();

        processForm(e.target.children);
    });

    let view_button = document.getElementById("view-requests");

    view_button.addEventListener("click", async function(e) {
        e.preventDefault();

        let requests = await API.graphql(graphqlOperation(listBookingRequests));
        console.log(requests);
    })
}

function configureAmplify() {
    Amplify.configure(awsconfig);
    console.log(Amplify);
}

/**
 * Submits form contents to AWS Amplify
 */
async function processForm(elements) {
    let request = {};

    for (let child of elements) {
        // Ignore children of the form element which are not form inputs
        if (child.tagName != "INPUT" && child.tagName != "TEXTAREA") {
            continue;
        }

        request[child.name] = child.value;
    }

    let res = await API.graphql(graphqlOperation(createBookingRequest, {input: request}));
    console.log(res);
};

// Add event listener to run main function on page load
addEventListener("load", (_) => {main()});