## @superset-ui/plugin-chart-superset-ui-preset-deckgl

[![Version](https://img.shields.io/npm/v/@superset-ui/plugin-chart-superset-ui-preset-deckgl.svg?style=flat-square)](https://www.npmjs.com/package/@superset-ui/plugin-chart-superset-ui-preset-deckgl)

This plugin provides Superset Ui Preset Deckgl for Superset.

### Usage

Configure `key`, which can be any `string`, and register the plugin. This `key` will be used to lookup this chart throughout the app.

```js
import SupersetUiPresetDeckglChartPlugin from '@superset-ui/plugin-chart-superset-ui-preset-deckgl';

new SupersetUiPresetDeckglChartPlugin()
  .configure({ key: 'superset-ui-preset-deckgl' })
  .register();
```

Then use it via `SuperChart`. See [storybook](https://apache-superset.github.io/superset-ui/?selectedKind=plugin-chart-superset-ui-preset-deckgl) for more details.

```js
<SuperChart
  chartType="superset-ui-preset-deckgl"
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
│   ├── SupersetUiPresetDeckgl.tsx
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
