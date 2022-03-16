/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { ChartProps, DataRecord } from '@superset-ui/core';
import { DemoProps } from './types';

export default function transformProps(chartProps: ChartProps): DemoProps {
  const { width, height, queriesData, formData } = chartProps;
  const {
    viewport,
    mapStyle,
    grayscale,
    regionAdcode,
    regionLabelVisible,
    regionVisible,
    resourceMapUrl,
    resourceMapVisible,
    resourceMapExtent,
    autoZoom,
    spatial,
    typeCol,
  } = formData;
  const { latCol, lonCol } = spatial;
  const data = queriesData[0].data as DataRecord[];

  return {
    width: `${width}px`,
    height: `${height}px`,
    viewport,
    mapStyle,
    grayscale,
    regionAdcode,
    regionLabelVisible,
    regionVisible,
    resourceMapUrl,
    resourceMapVisible,
    resourceMapExtent,
    autoZoom,
    latCol,
    lonCol,
    typeCol,
    data,
  };
}
