import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState } from "react";
import { registerLicense, validateLicense } from "@syncfusion/ej2-base";
import "./SchedulingPage.css";
import { getDatabase, ref, set, push, get, remove } from "firebase/database";
import app from "../../firebaseConfig";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NCaF5cXmZCeUx0QXxbf1x0ZFxMYVpbRHJPMyBoS35RckVlW3teeXFURGZfUkJ+"
);

validateLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjX31WcHxQRGFZV0J1WA=="
);

const SchedulingPage = () => {
  const db = getDatabase(app);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "events"));
        const data = snapshot.val();
        const newEvents = [];
        for (let key in data) {
          newEvents.push({
            Id: key,
            Subject: data[key].Subject,
            StartTime: new Date(data[key].StartTime),
            EndTime: new Date(data[key].EndTime),
            IsAllDay: data[key].IsAllDay,
          });
        }
        setEvents(newEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [db]);

  if (!events) {
    console.log("Loading data...");
    return <div>Loading...</div>;
  }

  const actionCompleteHandler = async (event) => {
    switch (event.requestType) {
      case "eventCreated":
        handleAddEvent(event.data);
        break;

      case "eventRemoved":
        const eventIdToDelete = event.data[0].Id;
        await handleDeleteEvent(eventIdToDelete);
        break;
      default:
        break;
    }
  };

  const handleAddEvent = async (event) => {
    try {
      event.forEach((event) => {
        const newEventRef = push(ref(db, "events"));
        set(newEventRef, {
          Subject: event.Subject,
          StartTime: new Date(event.StartTime).getTime(),
          EndTime: new Date(event.EndTime).getTime(),
          IsAllDay: event.IsAllDay,
        });
      });
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  const handleDeleteEvent = async (idParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "events/" + idParam);
    await remove(dbRef);
    console.log("great success");
  };

  return (
    <main className="main-container">
      {events && (
        <ScheduleComponent
          height={"100%"}
          selectedDate={new Date()}
          eventSettings={{ dataSource: events, allowEditing: false }}
          actionComplete={actionCompleteHandler}
          currentView="Month"
        >
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      )}
    </main>
  );
};

export default SchedulingPage;
