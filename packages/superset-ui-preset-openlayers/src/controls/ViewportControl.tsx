import React from 'react';
import { Popover } from 'antd';
import { toStringHDMS } from 'ol/coordinate';

import ControlHeader from './components/ControlHeader';
import { ControlComponentProps } from './types';
import Label from './components/Label';
import FormLabel from './components/FormLabel';
import TextControl from './TextControl';

export interface ViewportControlValue {
  longitude: number;
  latitude: number;
  zoom: number;
}

export type ViewportControlType = keyof ViewportControlValue;

export type ViewportControlProps = ControlComponentProps<ViewportControlValue>;

export const DEFAULT_VIEWPORT: ViewportControlValue = {
  longitude: 108.923611,
  latitude: 34.540833,
  zoom: 5,
};

const PARAMS: Array<ViewportControlType> = ['longitude', 'latitude', 'zoom'];

const ViewportControl = (props: ViewportControlProps) => {
  const controlValue = props.value || DEFAULT_VIEWPORT;

  const onChange = (ctrl: ViewportControlType, value: number) => {
    if (props.onChange && typeof props.onChange === 'function') {
      props.onChange({
        ...controlValue,
        [ctrl]: value,
      });
    }
  };

  const renderTextControl = (ctrl: ViewportControlType) => (
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
    if (controlValue && controlValue.latitude && controlValue.longitude) {
      return toStringHDMS([controlValue.longitude, controlValue.latitude]);
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

export default ViewportControl;
