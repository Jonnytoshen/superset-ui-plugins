## @sspingme/superset-ui-plugin-statistic

[![Version](https://img.shields.io/npm/v/@sspingme/superset-ui-plugin-statistic.svg?style=flat-square)](https://www.npmjs.com/package/@sspingme/superset-ui-plugin-statistic)

This plugin provides Superset Ui Plugin Statistic for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import SupersetUiPluginStatisticChartPlugin from '@sspingme/superset-ui-plugin-statistic';

new SupersetUiPluginStatisticChartPlugin()
  .configure({ key: 'superset-ui-plugin-statistic' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-superset-ui-plugin-statistic) for more details.

```js
<SuperChart
  chartType="superset-ui-plugin-statistic"
  width={600}
  height={600}
  formData={...}
  queriesData={[{
    data: {...},
  }]}
/>
```

### File structure generated

```
├── package.json
├── README.md
├── tsconfig.json
├── src
│   ├── SupersetUiPluginStatistic.tsx
│   ├── images
│   │   └── thumbnail.png
│   ├── index.ts
│   ├── plugin
│   │   ├── buildQuery.ts
│   │   ├── controlPanel.ts
│   │   ├── index.ts
│   │   └── transformProps.ts
│   └── types.ts
├── test
│   └── index.test.ts
└── types
    └── external.d.ts
```
