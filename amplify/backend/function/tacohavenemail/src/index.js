/**
 * This file defines a lambda function which is invoked when a new booking request is created
 * 
 * This function will send an email to the business, letting them know of the booking request
 */

const SESApi = require("@aws-sdk/client-ses");
const SESClient = SESApi.SESClient;
const SendEmailCommand = SESApi.SendEmailCommand;
const ses = new SESClient({ region: "eu-west-2" });

// Email of the company, to which booking requests should be sent
const requestEmail = "andrewmckinlay41@gmail.com";

/**
 * Callback for this lambda function
 * 
 * This is the actual Javascript code called when the lambda function is triggered
 * 
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async function(event) {
  console.log(`Event: ${JSON.stringify(event)}`);

  // This function is called for *all* database events, not just insertions
  // We skip over database events where the event name is not "INSERT"
  let record = event.Records[0];
  if (record.eventName != "INSERT") {
    return "Not an INSERT event";
  }

  // Send booking request to business
  const businessRequestCommand = new SendEmailCommand({
    Destination: {
      ToAddresses: [requestEmail, record.dynamodb.NewImage.email.S],
    },
    Message: {
      Body: {
        Text: {
          Data:
`A booking has been requested with TacoHaven!

First name: ${record.dynamodb.NewImage.fname.S}
Last name: ${record.dynamodb.NewImage.lname.S}
Email: ${record.dynamodb.NewImage.email.S}
Telephone number: ${record.dynamodb.NewImage.tel.S}
Date: ${record.dynamodb.NewImage.date.S}
Time: ${record.dynamodb.NewImage.time.S}
Number of Guests: ${record.dynamodb.NewImage.numofg.N}
Special Requests: ${record.dynamodb.NewImage.comments.S}

Thank you.`
        },
      },

      Subject: { Data: "TacoHaven - Booking Request" },
    },
    Source: requestEmail,
  });

  await ses.send(businessRequestCommand);
};
