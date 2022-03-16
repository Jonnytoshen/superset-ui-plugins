## @sspingme/superset-ui-preset-openlayers

[![Version](https://img.shields.io/npm/v/@sspingme/superset-ui-preset-openlayers.svg?style=flat-square)](https://www.npmjs.com/package/@sspingme/superset-ui-preset-openlayers)

This plugin provides Preset for Superset - Openlayers for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import SspingmeSupersetUiPresetOpenlayersChartPlugin from '@sspingme/superset-ui-preset-openlayers';

new SspingmeSupersetUiPresetOpenlayersChartPlugin()
  .configure({ key: '@sspingme/superset-ui-preset-openlayers' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-@sspingme/superset-ui-preset-openlayers) for more details.

```js
<SuperChart
  chartType="@sspingme/superset-ui-preset-openlayers"
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
│   ├── SspingmeSupersetUiPresetOpenlayers.tsx
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
