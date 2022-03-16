import { ControlSetItem, DatasourceMeta } from '@superset-ui/chart-controls';
import { t, validateNonEmpty } from '@superset-ui/core';
import { MAP_STYLE } from './map-style';

export function columnChoices(datasource: DatasourceMeta | null) {
  if (datasource && datasource.columns) {
    return datasource.columns
      .map(col => [col.column_name, col.verbose_name || col.column_name])
      .sort((opt1, opt2) =>
        opt1[1].toLowerCase() > opt2[1].toLowerCase() ? 1 : -1,
      );
  }
  return [];
}

export const spatial: ControlSetItem = {
  name: 'spatial',
  config: {
    type: 'SpatialControl',
    label: t('Longitude & Latitude'),
    validators: [validateNonEmpty],
    description: t('Point to your spatial columns'),
    mapStateToProps: state => ({
      choices: columnChoices(state.datasource),
    }),
  },
};

export const mapStyle: ControlSetItem = {
  name: 'mapStyle',
  config: {
    label: t('Map Style'),
    description: t('Base layer map style.'),
    type: 'SelectControl',
    clearable: false,
    renderTrigger: true,
    choices: Object.keys(MAP_STYLE).map(key => [key, MAP_STYLE[key].title]),
    default: 'mapstyle_01',
  },
};
