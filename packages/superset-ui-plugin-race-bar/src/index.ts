import { ChartMetadata, ChartPlugin, t } from "@superset-ui/core";
import thumbnail from './images/thumbnail.png';
import { RaceBarChartProps, RaceBarFormData } from "./types";
import controlPanel from './controlPanel';
import transformProps from './transformProps';
import buildQuery from "./buildQuery";

export default class RaceBarChartPlugin extends ChartPlugin<RaceBarFormData, RaceBarChartProps> {
  constructor() {
    super({
      controlPanel,
      buildQuery,
      loadChart: () => import('./RaceBar'),
      // loadTransformProps: () => import('./transformProps'),
      metadata: new ChartMetadata({
        name: t('Race Bar'),
        category: t('Bar'),
        description: t(`Race bar of ECharts.`),
        tags: [
          t('Bar'),
          t('Race Bar'),
          t('ECharts')
        ],
        thumbnail,
        useLegacyApi: false
      }),
      transformProps
    });
  }
}