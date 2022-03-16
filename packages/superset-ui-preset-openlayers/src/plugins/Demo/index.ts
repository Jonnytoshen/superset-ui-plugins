import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import thumbnail from './images/thumbnail.png';
import transformProps from './transformProps';
import controlPanel from './controlPanel';
import buildQuery from './buildQuery';

export default class OpanlayersDemoChartPlugin extends ChartPlugin {
  constructor() {
    super({
      buildQuery,
      controlPanel,
      loadChart: () => import('./Demo'),
      metadata: new ChartMetadata({
        category: t('Map'),
        description: t(
          'A high-performance, feature-packed library for all your mapping needs.',
        ),
        name: t('Openlayers Demo'),
        tags: [t('ol'), t('openlayers'), t('Geo'), t('Web')],
        thumbnail,
      }),
      transformProps,
    });
  }
}
