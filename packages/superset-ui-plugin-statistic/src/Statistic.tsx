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
import React, { useEffect, createRef } from 'react';
import { styled } from '@superset-ui/core';
import numeral from 'numeral';
import { StatisticProps, StatisticStylesProps } from './types';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://emotion.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const Styles = styled.div<StatisticStylesProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-y: scroll;
`;

const Title = styled.div<any>`
  margin-bottom: 4px;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;

const Subtitle = styled.div<any>`
  margin-top: 4px;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;

const Content = styled.div<any>`
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
  line-height: 1;
`;

const ContentValue = styled.div<any>`
  display: inline-block;
  direction: ltr;
`;

const ContentPrefix = styled.div<any>`
  display: inline-block;
  margin-right: 4px;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;

const ContentSuffix = styled.div<any>`
  display: inline-block;
  margin-left: 4px;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize};
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function Statistic(props: StatisticProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  const {
    height,
    width,
    value,
    valueFormat,
    valueSize,
    valueColor,
    prefixColor,
    prefixSize,
    prefix,
    suffixColor,
    suffixSize,
    suffix,
    title,
    titleColor,
    titleSize,
    subtitle,
    subtitleColor,
    subtitleSize,
  } = props;

  const rootElem = createRef<HTMLDivElement>();
  const formatValue = (value: number, format?: string): string | number =>
    format ? numeral(value).format(format) : value;

  // Often, you just want to get a hold of the DOM and go nuts.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.dir('Plugin element', root);
  });

  let formatedValue = formatValue(value, valueFormat);

  useEffect(() => {
    formatedValue = formatValue(value, valueFormat);
  }, [value, valueFormat]);

  // console.log('Plugin props', props);

  const titleNode = title ? (
    <Title color={titleColor} fontSize={titleSize}>
      {title}
    </Title>
  ) : null;

  const prefixNode = prefix ? (
    <ContentPrefix color={prefixColor} fontSize={prefixSize}>
      {prefix}
    </ContentPrefix>
  ) : null;

  const suffixNode = suffix ? (
    <ContentSuffix color={suffixColor} fontSize={suffixSize}>
      {suffix}
    </ContentSuffix>
  ) : null;

  const subtitleNode = subtitle ? (
    <Subtitle color={subtitleColor} fontSize={subtitleSize}>
      {subtitle}
    </Subtitle>
  ) : null;

  return (
    <Styles ref={rootElem} height={height} width={width}>
      {titleNode}
      <Content color={valueColor} fontSize={valueSize}>
        {prefixNode}
        <ContentValue>{formatedValue}</ContentValue>
        {suffixNode}
      </Content>
      {subtitleNode}
    </Styles>
  );
}
