import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
  Аgenda,
  Agenda,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import "./SchedulingPage.css";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "../../firebaseConfig";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVF3WmFZfVpgfF9DYVZUQWYuP1ZhSXxXdkBhW39WdXVQQGFfV0A="
);

const SchedulingPage = () => {
  const db = getDatabase(app);
  const [events, setEvents] = useState([]);

  const addNewEvent = async (data) => {
    try {
      data.forEach((element) => {
        const newEventRef = push(ref(db, "events"));
        set(newEventRef, {
          Subject: element.Subject,
          StartTime: new Date(element.StartTime).getTime(),
          EndTime: new Date(element.EndTime).getTime(),
          IsAllDay: element.IsAllDay,
        });
      });
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

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

  return (
    <main className="main-container">
      {events && (
        <ScheduleComponent
          selectedDate={new Date(2024, 4, 22)}
          eventSettings={{ dataSource: events }}
          actionComplete={(e) => {
            if (e.requestType === "eventCreated") {
              addNewEvent(e.data);
            }
          }}
          currentView="Month"
        >
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      )}
    </main>
  );
};

export default SchedulingPage;
