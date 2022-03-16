import { t, validateNonEmpty } from '@superset-ui/core';
import { columnChoices, ControlPanelConfig } from '@superset-ui/chart-controls';
import { mapStyle, spatial } from '../../utils/controls';
import ViewportControl, {
  DEFAULT_VIEWPORT,
} from '../../controls/ViewportControl';
import ExtentControl, { DEFAULT_EXTENT } from '../../controls/ExtentControl';

const config: ControlPanelConfig = {
  controlPanelSections: [
    // sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [spatial],
        [
          {
            name: 'typeCol',
            config: {
              type: 'SelectControl',
              label: t('Type Column'),
              description: t('Point to your type column.'),
              validators: [validateNonEmpty],
              mapStateToProps: state => ({
                choices: columnChoices(state.datasource),
              }),
            },
          },
        ],
        ['adhoc_filters'],
        ['row_limit'],
      ],
    },
    {
      label: t('Map'),
      expanded: true,
      controlSetRows: [
        [mapStyle],
        [
          {
            name: 'grayscale',
            config: {
              label: t('Grayscale'),
              description: t('Grayscale base layer map style.'),
              type: 'CheckboxControl',
              renderTrigger: true,
              default: false,
            },
          },
        ],
        [
          {
            name: 'viewport',
            config: {
              label: t('Viewport'),
              description: t('Parameters related to the view on the map'),
              renderTrigger: true,
              type: ViewportControl,
              default: DEFAULT_VIEWPORT,
            },
          },
        ],
      ],
    },
    {
      label: t('区域'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'regionVisible',
            config: {
              type: 'CheckboxControl',
              label: t('显示/隐藏'),
              default: false,
            },
          },
        ],
        [
          {
            name: 'regionAdcode',
            config: {
              type: 'SelectControl',
              label: t('区域'),
              clearable: false,
              choices: [
                [100000, '全国'],
                [630000, '青海省'],
              ],
              default: 100000,
              visibility: state => !!state.controls.regionVisible.value,
            },
          },
        ],
        [
          {
            name: 'regionLabelVisible',
            config: {
              type: 'CheckboxControl',
              label: t('显示/隐藏标签'),
              default: true,
              visibility: props => !!props.controls.regionVisible.value,
            },
          },
        ],
        [
          {
            name: 'autoZoom',
            config: {
              type: 'CheckboxControl',
              label: t('自动缩放'),
              description: t('当选择自动缩放，地图将缩放到您选择的区域。'),
              default: true,
              visibility: props => !!props.controls.regionVisible.value,
            },
          },
        ],
      ],
    },
    {
      label: t('资源图谱'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'resourceMapVisible',
            config: {
              type: 'CheckboxControl',
              label: t('显示/隐藏'),
              description: t('Visible of resource map.'),
              default: false,
            },
          },
        ],
        [
          {
            name: 'resourceMapUrl',
            config: {
              type: 'TextControl',
              label: t('URL'),
              description: t('XYZ tile layer url of resource map.'),
              visibility: props => !!props.controls.resourceMapVisible.value,
            },
          },
        ],
        [
          {
            name: 'resourceMapExtent',
            config: {
              type: ExtentControl,
              label: t('Extent'),
              description: t('Extent of resource map.'),
              default: DEFAULT_EXTENT,
              visibility: props => !!props.controls.resourceMapVisible.value,
            },
          },
        ],
      ],
    },
  ],
};

export default config;
