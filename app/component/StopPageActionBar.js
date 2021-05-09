import PropTypes from 'prop-types';
import React from 'react';
import DateSelect from './DateSelect';
import SecondaryButton from './SecondaryButton';

const DATE_FORMAT = 'YYYYMMDD';

const printStop = e => {
  e.stopPropagation();
  window.print();
};

const StopPageActionBar = ({ startDate, selectedDate, onDateChange }) => (
  <div id="stop-page-action-bar">
    <DateSelect
      startDate={startDate}
      selectedDate={selectedDate}
      dateFormat={DATE_FORMAT}
      onDateChange={onDateChange}
    />
    <div className="print-button-container">
      <SecondaryButton
        ariaLabel="print"
        buttonName="print"
        buttonClickAction={e => printStop(e)}
        buttonIcon="icon-icon_print"
        smallSize
      />
    </div>
  </div>
);

StopPageActionBar.displayName = 'StopPageActionBar';

StopPageActionBar.propTypes = {
  startDate: PropTypes.string,
  selectedDate: PropTypes.string,
  onDateChange: PropTypes.func,
};

export default StopPageActionBar;
