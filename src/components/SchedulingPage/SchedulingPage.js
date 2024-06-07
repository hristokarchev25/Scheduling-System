import {
  ScheduleComponent,
  Day,
  Week,
  Month,
  Inject,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState, useRef } from "react";
import { registerLicense } from "@syncfusion/ej2-base";
import "./SchedulingPage.css";
import { getDatabase, ref, set, push, get } from "firebase/database";
import app from "../../firebaseConfig";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhPYVF3WmFZfVpgfF9DYVZUQWYuP1ZhSXxXdkBhW39WdXVQQGFfV0A="
);

const SchedulingPage = function SchedulingPage() {
  const [events, setEvents] = useState(null);
  const db = getDatabase(app);

  const addNewEvent = async (data) => {
    try {
      console.log("Adding new event:", data); // Log new event data
      data?.forEach((event) => {
        set(push(ref(db, "events")), event);
      });
    } catch (error) {
      console.error("Error adding new event:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await get(ref(db, "events"));
        if (snapshot.exists()) {
          console.log("Data fetched successfully:", snapshot.val());
          const data = snapshot.val();
          const keys = Object.keys(data);
          const values = Object.values(data);

          const events = keys.map((key, index) => {
            return { ...values[index], Id: key };
          });

          setEvents(events);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [db]);

  if (!events) {
    console.log("Loading data...");
    return <div>Loading...</div>; // Or some loading spinner
  }

  console.log(events);

  return (
    <main className="" style={{ height: "100%" }}>
      <ScheduleComponent
        selectedDate={new Date(2024, 4, 22)}
        eventSettings={{ dataSource: events }}
        actionComplete={(e) => {
          if (e.requestType === "eventCreated") {
            addNewEvent(e.data);
          }
        }}
      >
        <Inject services={[Day, Week, Month]} />
      </ScheduleComponent>
    </main>
  );
};

export default SchedulingPage;
