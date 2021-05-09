import PropTypes from 'prop-types';
import React from 'react';
import { routerShape } from 'react-router';

import SelectOptionContainer, {
  getFiveStepOptions,
  getLinearStepOptions,
  optionsShape,
  valueShape,
} from './SelectOptionContainer';
import { replaceQueryParams } from '../../util/queryUtils';

const TransferOptionsSection = (
  { walkBoardCost, walkBoardCostOptions, minTransferTime, defaultSettings },
  { router },
) => (
  <React.Fragment>
    <SelectOptionContainer
      currentSelection={walkBoardCost}
      defaultValue={defaultSettings.walkBoardCost}
      highlightDefaultValue={false}
      onOptionSelected={value =>
        replaceQueryParams(router, { walkBoardCost: value })
      }
      options={getFiveStepOptions(
        defaultSettings.walkBoardCost,
        walkBoardCostOptions,
      )}
      title="transfers"
    />
    <SelectOptionContainer
      currentSelection={minTransferTime}
      defaultValue={defaultSettings.minTransferTime}
      displayPattern="number-of-minutes"
      displayValueFormatter={seconds => seconds / 60}
      onOptionSelected={value =>
        replaceQueryParams(router, { minTransferTime: value })
      }
      options={getLinearStepOptions(
        defaultSettings.minTransferTime,
        60,
        60,
        12,
      )}
      sortByValue
      title="transfers-margin"
    />
  </React.Fragment>
);

TransferOptionsSection.propTypes = {
  minTransferTime: valueShape.isRequired,
  defaultSettings: PropTypes.shape({
    walkBoardCost: PropTypes.number.isRequired,
    minTransferTime: PropTypes.number.isRequired,
  }).isRequired,
  walkBoardCost: valueShape.isRequired,
  walkBoardCostOptions: optionsShape.isRequired,
};

TransferOptionsSection.contextTypes = {
  router: routerShape.isRequired,
};

export default TransferOptionsSection;
