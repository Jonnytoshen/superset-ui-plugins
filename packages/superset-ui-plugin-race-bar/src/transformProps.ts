import { RaceBarChartProps, RaceBarTransformedProps } from "./types";

export default function transformProps(chartProps: RaceBarChartProps): RaceBarTransformedProps {
  const { formData, width, height, queriesData } = chartProps;
  const data = queriesData[0].data;

  return {
    formData,
    width,
    height,
    data
  };
}