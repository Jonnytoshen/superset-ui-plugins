import { DataRecord } from '@superset-ui/core';
import { ContainerProps } from '../../Container';
import { ExtentControlValue } from '../../controls/ExtentControl';

export type DemoProps = ContainerProps & {
  regionVisible: boolean;
  regionAdcode: number;
  regionLabelVisible: boolean;
  resourceMapVisible: boolean;
  resourceMapUrl: string;
  resourceMapExtent: ExtentControlValue;
  autoZoom: boolean;
  latCol: string;
  lonCol: string;
  typeCol: string;
  data: DataRecord[];
};
