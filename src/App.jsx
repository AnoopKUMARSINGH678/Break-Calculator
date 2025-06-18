
import React, { useState } from 'react';



function ShiftTracker() {
  const [shifts, setShifts] = useState({
    monday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    tuesday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    wednesday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    thursday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    friday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    saturday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
    sunday: { mStart: '', mEnd: '', aStart: '', aEnd: '', eStart: '', eEnd: '' },
  });

  const parseTime = (dayOffset, timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date(1970, 0, 1 + dayOffset, hours, minutes);
    return date;
  };

  const calculateGap = (endTime, endDayOffset, startTime, startDayOffset) => {
    if (!endTime || !startTime) return '';
    const end = parseTime(endDayOffset, endTime);
    const start = parseTime(startDayOffset, startTime);
    const diffHours = (start - end) / (1000 * 60 * 60);
    return diffHours > 0 ? diffHours.toFixed(1) : '';
  };

  const getNextDayStartTime = (nextShift) => {
    return nextShift.mStart || nextShift.aStart || nextShift.eStart || '';
  };

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="container mx-auto p-4">
      {days.map((day, index) => {
        const shift = shifts[day];
        const nextDay = days[(index + 1) % 7];
        const nextShift = shifts[nextDay];
        const lastEndTime = shift.eEnd || shift.aEnd || shift.mEnd;
        const nextStartTime = getNextDayStartTime(nextShift);

        const maGap = calculateGap(shift.mEnd, index, shift.aStart, index);
        const aeGap = calculateGap(shift.aEnd, index, shift.eStart, index);
        const nextDayGap = calculateGap(lastEndTime, index, nextStartTime, index + 1);

        return (
          <div key={day} className="mb-4 p-4 border rounded">
            <h2 className="text-xl font-bold capitalize">{day}</h2>
            <div className="grid grid-cols-6 gap-2">
              <input
                type="time"
                value={shift.mStart}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, mStart: e.target.value } })}
                className="border p-1"
                placeholder="Morning Start"
              />
              <input
                type="time"
                value={shift.mEnd}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, mEnd: e.target.value } })}
                className="border p-1"
                placeholder="Morning End"
              />
              <input
                type="time"
                value={shift.aStart}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, aStart: e.target.value } })}
                className="border p-1"
                placeholder="Afternoon Start"
              />
              <input
                type="time"
                value={shift.aEnd}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, aEnd: e.target.value } })}
                className="border p-1"
                placeholder="Afternoon End"
              />
              <input
                type="time"
                value={shift.eStart}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, eStart: e.target.value } })}
                className="border p-1"
                placeholder="Evening Start"
              />
              <input
                type="time"
                value={shift.eEnd}
                onChange={(e) => setShifts({ ...shifts, [day]: { ...shift, eEnd: e.target.value } })}
                className="border p-1"
                placeholder="Evening End"
              />
            </div>
            <div className="mt-2">
              <p>Morning-Afternoon Gap: {maGap} hours</p>
              <p>Afternoon-Evening Gap: {aeGap} hours</p>
              <p>Next Day Start Gap: {nextDayGap} hours</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShiftTracker;