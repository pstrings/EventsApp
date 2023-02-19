import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export const getStaticPaths = async () => {
  const { allEvents } = await import("../../../data/events.json");

  const allPaths = allEvents.map((e) => {
    return {
      params: {
        // This is for the [id] folder
        category: e.city,
        // This is for the [id].js
        id: e.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const { allEvents } = await import("../../../data/events.json");
  const data = allEvents.find((e) => e.id === id);

  return {
    props: { data },
  };
};

// Event JSX function
const Event = ({ data }) => {
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState("");

  const submitFunction = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const eventID = router?.query.id;

    const validEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validEmail)) {
      setMessage("Please add correct email address");
    }

    try {
      // POST fetch request
      const response = await fetch("/api/email-registration", {
        method: "POST",
        body: JSON.stringify({ email: emailValue, eventID }),
        headers: {
          "Content-Type": "application/json",
        },
        // getting data from response
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      setMessage(data.message);
      inputEmail.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="event">
        <h1>{data.title}</h1>
        <Image src={data.image} alt={data.id} width={600} height={200} />
        <p>{data.description}</p>
        <br />
        <br />
        <form onSubmit={submitFunction} className="email_registration">
          <label htmlFor="email">Get registered for the event:</label>
          <input
            ref={inputEmail}
            type="email"
            id="email"
            placeholder="Enter Email ID"
          />
          <button type="submit">Submit</button>
        </form>
        {message.toUpperCase()}
      </div>
    </>
  );
};

export default Event;
