import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const DateDifferenceComponent = ({ targetDate }) => {
  const [timeDifference, setTimeDifference] = useState('');

  useEffect(() => {
    const targetDateObject = new Date(targetDate);

    const difference = formatDistanceToNow(targetDateObject, { addSuffix: true });

    setTimeDifference(difference);
  }, [targetDate]);

  return (
    <div>
      <p> {timeDifference}</p>
    </div>
  );
};

export default DateDifferenceComponent;
