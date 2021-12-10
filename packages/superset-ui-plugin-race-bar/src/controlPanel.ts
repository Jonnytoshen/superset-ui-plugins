import { 
  FeatureFlag, 
  isFeatureEnabled, 
  t,
  validateNonEmpty
} from '@superset-ui/core';
import {
  ControlPanelConfig,
  sections,
  columnChoices,
  ControlPanelState,
} from '@superset-ui/chart-controls';
import { dndEntity } from '@superset-ui/chart-controls/lib/shared-controls/dndControls'

const allColumns = {
  type: 'SelectControl',
  default: null,
  validators: [validateNonEmpty],
  mapStateToProps: (state: ControlPanelState) => ({
    choices: columnChoices(state.datasource),
  }),
};

const columnsConfig = isFeatureEnabled(FeatureFlag.ENABLE_EXPLORE_DRAG_AND_DROP)
  ? dndEntity
  : allColumns;

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'y_axis',
            config: {
              ...columnsConfig,
              label: t('Column of Y Axis')
            }
          },
        ],
        [
          {
            name: 'x_axis',
            config: {
              ...columnsConfig,
              label: t('Column of X Axis')
            }
          },
        ],
        [
          {
            name: 'update_by',
            config: {
              ...columnsConfig,
              label: t('Update by Column')
            }
          }
        ],
        // ['metrics'],
        // ['row_limit'],
        // ['adhoc_filters'],
        // ['groupby'],
        // ['columns']
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme']
      ]
    }
  ],
  controlOverrides: {}
};

export default config;