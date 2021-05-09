import React from 'react';
import { intlShape } from 'react-intl';

import Icon from '../../Icon';
import ComponentUsageExample from '../../ComponentUsageExample';

function SelectParkAndRideRow(props, { intl }) {
  return (
    <div className="no-margin">
      <div className="cursor-pointer select-row" onClick={props.selectRow}>
        <div className="padding-vertical-normal select-row-icon" >
          <Icon img="icon-icon_car" />
        </div>
        <div className="padding-vertical-normal select-row-text">
          <span className="header-primary no-margin link-color">
            {JSON.parse(props.name)[intl.locale]} ›
          </span>
        </div>
        <div className="clear" />
      </div>
      <hr className="no-margin gray" />
    </div>
  );
}

SelectParkAndRideRow.displayName = 'SelectParkAndRideRow';

SelectParkAndRideRow.description = (
  <div>
    <p>Renders a select citybike row</p>
    <ComponentUsageExample description="">
      <SelectParkAndRideRow
        name={'{"en": "Leppävaara", "fi": "Leppävaara", "sv": "Leppävaara"}'}
        selectRow={() => {}}
      />
    </ComponentUsageExample>
  </div>
  );

SelectParkAndRideRow.propTypes = {
  selectRow: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
};

SelectParkAndRideRow.contextTypes = {
  intl: intlShape,
};

export default SelectParkAndRideRow;
