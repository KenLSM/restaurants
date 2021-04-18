import React from 'react';
import { Accordion } from 'glints-aries';

import { SearchRow, OpeningTime } from '@/Redux/Reducers/results';
import { Colors } from '@/Constants/styles';

import { minTimeToHours, INT_TO_DAY, isNowOpen } from './utils';

const DaySlice = ({ openTimes }: { openTimes: Array<OpeningTime> }) => {
  if (openTimes.length <= 0) return;
  return (
    <div>
      <strong>{INT_TO_DAY[openTimes[0].day]}</strong>{' '}
      {openTimes.map(timeSlice => (
        <p key={timeSlice.start} style={{ marginLeft: '12px' }}>
          {minTimeToHours(timeSlice.start)} &ndash; {minTimeToHours(timeSlice.end)}
        </p>
      ))}
    </div>
  );
};

const TimePanel = ({ openingTimes }: { openingTimes: Array<OpeningTime> }) => {
  const groupedTimes = openingTimes.reduce((accum, curTime) => {
    if (!accum[curTime.day]) {
      accum[curTime.day] = [];
    }
    accum[curTime.day] = [...accum[curTime.day], curTime];
    return accum;
  }, []);
  console.log(groupedTimes);
  return (
    <>
      {groupedTimes.map((timeSlices, idx) => (
        <DaySlice key={idx} openTimes={timeSlices} />
      ))}
    </>
  );
};

const ItemRow = ({ data }: { data: SearchRow }) => {
  console.log(data);
  const { name } = data;
  const isOpenNow = data.OpeningTimes.some(isNowOpen);
  return (
    <div
      style={{
        background: Colors.auxiliary,
        paddingLeft: '0.5em',
        paddingRight: '0.5em',
        marginBottom: '0.2em',
        border: `1px solid ${Colors.secondary}`,
        color: Colors.primary,
        borderRadius: '4px',
      }}
    >
      <Accordion iconPosition="right">
        <Accordion.Panel
          label={
            <>
              <span>{name}</span>
              <br />
              <span style={{ fontSize: '12px' }}>{isOpenNow ? 'Open Now!' : 'Closed'}</span>
            </>
          }
          content={<TimePanel openingTimes={data.OpeningTimes} />}
        />
      </Accordion>
    </div>
  );
};

export default ItemRow;
