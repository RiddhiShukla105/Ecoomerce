import React, { useState } from "react";
import Nav from "./Nav";
import Sidenav from "./Sidenav";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [eventData, setEventData] = useState({ title: "", date: "" });

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  let dates = [];
  for (let i = 0; i < firstDayIndex; i++) dates.push("");
  for (let i = 1; i <= totalDays; i++) dates.push(i);

  const handleAddEvent = () => {
    if (!eventData.title || !eventData.date) return;

    setEvents([...events, eventData]);
    setShowModal(false);
    setEventData({ title: "", date: "" });
  };

  return (
 <>
  {/* FIXED NAVBAR */}
  <div className="fixed top-0 left-0 w-full z-50">
    <Nav />
  </div>

  <div className="flex">

    {/* FIXED SIDEBAR */}
    <div className="fixed left-0 top-16">
      <Sidenav />
    </div>

    {/* MAIN CONTENT */}
    <div className="ml-64 mt-16 w-full p-6 min-h-screen bg-purple-100">

      <div className="bg-white rounded-3xl shadow-2xl p-8 w-[95%] max-w-5xl mx-auto border border-purple-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={prevMonth}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            &lt;
          </button>

          <h2 className="text-4xl font-bold text-purple-700">
            {monthNames[month]} {year}
          </h2>

          <button
            onClick={nextMonth}
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            &gt;
          </button>
        </div>

        {/* Add Event */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600"
          >
            + Add Event
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-3 mb-2">
          {days.map((day) => (
            <div key={day} className="text-center font-semibold text-purple-700">
              {day}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div className="grid grid-cols-7 gap-3">
          {dates.map((date, index) => {
            const isToday =
              date === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();

            let dateString = null;
            let dateEvents = [];

            if (date !== "") {
              dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
                date
              ).padStart(2, "0")}`;
              dateEvents = events.filter((ev) => ev.date === dateString);
            }

            return (
              <div
                key={index}
                className={`h-24 p-2 rounded-xl border shadow-sm flex flex-col text-center
                ${isToday ? "bg-purple-600 text-white shadow-lg" : "bg-purple-50"}`}
              >
                <div className="font-bold">{date}</div>

                {date !== "" && (
                  <div className="flex flex-col gap-1 mt-1 overflow-y-auto">
                    {dateEvents.map((ev, i) => (
                      <span
                        key={i}
                        className="bg-purple-200 text-purple-900 px-1 py-0.5 text-xs rounded-md"
                      >
                        {ev.title}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
            <h3 className="text-xl font-bold mb-4 text-purple-700">Add Event</h3>

            <input
              type="text"
              placeholder="Event Title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              className="w-full border p-2 rounded-lg mb-3"
            />

            <input
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              className="w-full border p-2 rounded-lg mb-4"
            />

            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 rounded-xl"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-xl"
                onClick={handleAddEvent}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  </div>
</>

);

};

export default Calendar;
