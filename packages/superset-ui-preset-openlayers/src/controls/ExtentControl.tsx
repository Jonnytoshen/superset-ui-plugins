import React from 'react';
import { Popover } from 'antd';
import { toStringXY } from 'ol/coordinate';
import { isNumber } from 'lodash';
import ControlHeader from './components/ControlHeader';
import Label from './components/Label';
import { ControlComponentProps } from './types';
import FormLabel from './components/FormLabel';
import TextControl from './TextControl';

export interface ExtentControlValue {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

export type ExtentControlType = keyof ExtentControlValue;

export type ExtentControlProps = ControlComponentProps<ExtentControlValue>;

export const DEFAULT_EXTENT: ExtentControlValue = {
  minX: 0,
  minY: -90,
  maxX: 180,
  maxY: 90,
};

const PARAMS: Array<ExtentControlType> = ['minX', 'minY', 'maxX', 'maxY'];

const ExtentControl = (props: ExtentControlProps) => {
  const controlValue = props.value || DEFAULT_EXTENT;

  const onChange = (ctrl: ExtentControlType, value: number) => {
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange({
        ...controlValue,
        [ctrl]: value,
      });
    }
  };

  const renderTextControl = (ctrl: ExtentControlType) => (
    <div key={ctrl}>
      <FormLabel>{ctrl}</FormLabel>
      <TextControl
        value={controlValue[ctrl]}
        onChange={value => onChange(ctrl, value)}
        isFloat
      />
    </div>
  );

  const renderPopover = () => (
    <div id={`filter-popover-${props.name}`}>
      {PARAMS.map(ctrl => renderTextControl(ctrl))}
    </div>
  );

  const renderLabel = () => {
    if (
      controlValue &&
      isNumber(controlValue.minX) &&
      isNumber(controlValue.minY) &&
      isNumber(controlValue.maxX) &&
      isNumber(controlValue.maxY)
    ) {
      return `${toStringXY([
        controlValue.minX,
        controlValue.minY,
      ])} | ${toStringXY([controlValue.maxX, controlValue.maxY])}`;
    }
    return 'N/A';
  };

  return (
    <div>
      <ControlHeader {...props} />
      <Popover
        getPopupContainer={() => document.body}
        content={renderPopover()}
        placement="right"
        trigger="click"
        title="Viewport"
      >
        <Label className="pointer">{renderLabel()}</Label>
      </Popover>
    </div>
  );
};

export default ExtentControl;
