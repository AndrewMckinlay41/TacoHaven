import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-west-2" });

export const handler = async(event) => {
  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: ["andrewmckinlay41@gmail.com"],
    },
    Message: {
      Body: {
        Text: { Data: "Test" },
      },

      Subject: { Data: "Test Email" },
    },
    Source: "andrewmckinlay41@gmail.com",
  });

  try {
    let response = await ses.send(command);
    // process data.
    return response;
  }
  catch (error) {
    // error handling.
  }
  finally {
    // finally.
  }
};