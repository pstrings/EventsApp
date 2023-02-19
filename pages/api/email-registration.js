import path from "path";
import fs from "fs";

// Build path to our data to access it
const buildPath = () => path.join(process.cwd(), "data", "events.json");

const handler = (req, res) => {
  const { method } = req;
  const filePath = buildPath();

  //   Access our data
  const extractData = (filePath) => {
    const jsonData = fs.readFileSync(filePath);
    return JSON.parse(jsonData);
  };

  // Extract AllEvents from our data
  const { events_categories, allEvents } = extractData(filePath);

  //   404 response if there are no AllEvents
  if (!allEvents) {
    return res.status(404).json({
      message: "Event Data Not Found",
    });
  }

  if (method === "POST") {
    const { email, eventID } = req.body;

    // check format of email is correct
    if (!email | !email.includes("@") | !email.includes(".com")) {
      res.status(422).json({
        message: "Invalid email address",
      });
    }

    // Loop through AllEvents and identify the eventID
    const newAllEvents = allEvents.map((event) => {
      if (event.id === eventID) {
        if (event.emails_registered.includes(email)) {
          res.status(409).json({
            message: "This email has already been registered.",
          });
          return event;
        }
        return {
          ...event,
          emails_registered: [...event.emails_registered, email],
        };
      }
      return event;
    });

    // add email to emails_registered (write on data) only if email doesn't exist
    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );

    res.status(201).json({
      message: `You are successfully registered with the email: ${email} for the event`,
    });
  }
};

export default handler;
