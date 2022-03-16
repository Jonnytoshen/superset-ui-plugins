import { Preset, t } from '@superset-ui/core';
import OpanlayersDemoChartPlugin from './plugins/Demo';

export default class OpenlayersChartPreset extends Preset {
  constructor() {
    super({
      name: 'openlayers preset charts',
      description: t(
        'A high-performance, feature-packed library for all your mapping needs.',
      ),
      plugins: [
        new OpanlayersDemoChartPlugin().configure({
          key: 'openlayers_demo_v1',
        }),
      ],
    });
  }
}
