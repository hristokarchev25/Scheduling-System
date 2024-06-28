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
  const [num, setNum] = useState("");

  const deleteFunction = async (idParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "events/" + events[0].Id);
    await remove(dbRef);
    console.log('great success');
  };

  const sayHiFunc = async () => {
    console.log("great success");
    console.log(events[0].Id);
  }

  const popupOpenHandler = (args) => {

    if (args.type === 'QuickInfo') {
      //const deleteBtn = args.element.querySelector(".e-popup-footer .e-event-delete");
      const deleteBtn = document.getElementById("QuickDialog");
      deleteBtn.onclick = function () {
        sayHiFunc();
        /* deleteFunction(); */
      };

    }
  };

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
          height={"100%"}
          selectedDate={new Date()}
          eventSettings={{ dataSource: events, allowEditing: false }}
          actionComplete={(e) => {
            if (e.requestType === "eventCreated") {
              addNewEvent(e.data);
            }
          }}
          currentView="Month"
          popupOpen={popupOpenHandler}
        >
          <Inject services={[Day, Week, Month, Agenda]} />
        </ScheduleComponent>
      )}
    </main>
  );
};

export default SchedulingPage;
