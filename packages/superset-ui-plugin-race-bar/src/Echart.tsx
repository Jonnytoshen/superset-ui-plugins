import React, {
  useRef,
  useEffect,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { styled } from '@superset-ui/core';
import { ECharts, init } from 'echarts';
import { EchartsHandler, EchartsProps, EchartsStylesProps } from "./types";

const Styles = styled.div<EchartsStylesProps>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
`;

function Echart(
  {
    width,
    height,
    echartOptions,
    eventHandlers,
    zrEventHandlers,
    selectedValues = {}
  }: EchartsProps, 
  ref: React.Ref<EchartsHandler>
) {
  const divRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ECharts>();
  const currentSelection = useMemo(
    () => Object.keys(selectedValues) || [],
    [selectedValues],
  );
  const previousSelection = useRef<string[]>([]);

  useImperativeHandle(ref, () => ({
    getEchartInstance: () => chartRef.current,
  }));

  useEffect(() => {
    if (!divRef.current) return;
    if (!chartRef.current) {
      chartRef.current = init(divRef.current);
    }

    Object.entries(eventHandlers || {}).forEach(([name, handler]) => {
      chartRef.current?.off(name);
      chartRef.current?.on(name, handler);
    });

    Object.entries(zrEventHandlers || {}).forEach(([name, handler]) => {
      chartRef.current?.getZr().off(name);
      chartRef.current?.getZr().on(name, handler);
    });

    chartRef.current.setOption(echartOptions, true);
  }, [echartOptions, eventHandlers, zrEventHandlers]);

  // highlighting
  useEffect(() => {
    if (!chartRef.current) return;
    chartRef.current.dispatchAction({
      type: 'downplay',
      dataIndex: previousSelection.current.filter(
        value => !currentSelection.includes(value),
      ),
    });
    if (currentSelection.length) {
      chartRef.current.dispatchAction({
        type: 'highlight',
        dataIndex: currentSelection,
      });
    }
    previousSelection.current = currentSelection;
  }, [currentSelection]);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.resize({ width, height });
    }
  }, [width, height]);

  return <Styles ref={divRef} height={height} width={width} />;
}

export default forwardRef(Echart);