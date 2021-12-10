import { CategoricalColorNamespace } from '@superset-ui/core';
import React, { useEffect, useState } from 'react';
import Echart from './Echart';
import { RaceBarTransformedProps } from './types';

export default function RaceBar({
  width,
  height,
  formData,
  data
}: RaceBarTransformedProps) {

  const { xAxis, yAxis, updateBy, colorScheme } = formData;
  const [ echartOptions, setEchartOptions ] = useState({});
  const colorFn = CategoricalColorNamespace.getScale(colorScheme as string);

  useEffect(() => {
    const updates: number[] = [...new Set(data.map(item => item[updateBy] as number))].sort();
    const datasource = data.reduce((entities, item) => {
      const category = item[yAxis] as string;
      const source = (entities[category] 
        ? entities[category]
        : {}) as { [key: number]: number };
      return {
        ...entities,
        [category]: { ...source, [item[updateBy] as string]: item[xAxis] }
      };
    }, {} as { [key: string]: { [key: number]: number } });
    const category = Object.keys(datasource);
    let updateIndex = 0;

    const intervalId = setInterval(() => {
      const update = updates[updateIndex];
      const seriesData = Object.keys(datasource).map(key => datasource[key][update]);

      setEchartOptions({
        grid: {
          top: 10,
          bottom: 30,
          left: 150,
          right: 80
        },
        xAxis: {
          max: 'dataMax'
        },
        yAxis: {
          type: 'category',
          inverse: true,
          max: 10,
          data: category,
          animationDuration: 300,
          animationDurationUpdate: 300,
        },
        series: [
          {
            realtimeSort: true,
            type: 'bar',
            label: {
              show: true,
              precision: 1,
              position: 'right',
              valueAnimation: true,
              fontFamily: 'monospace'
            },
            itemStyle: {
              color: (params: any) => {
                return colorFn.scale(params['name']);
              }
            },
            data: seriesData
          }
        ],
        animationDuration: 0,
        animationDurationUpdate: 2000,
        animationEasing: 'linear',
        animationEasingUpdate: 'linear',
        graphic: {
          elements: [
            {
              type: 'text',
              right: 160,
              bottom: 60,
              style: {
                text: update,
                font: 'bolder 80px monospace',
                fill: 'rgba(100, 100, 100, 0.25)'
              },
              z: 100
            }
          ]
        }
      });

      updateIndex++;
      if (updateIndex >= updates.length) {
        clearInterval(intervalId);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [formData, data]);


  return (
    <Echart
      height={height}
      width={width}
      echartOptions={echartOptions}
    />
  );
}