import { FeatureLike } from 'ol/Feature';
import Style, { StyleFunction } from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Stroke from 'ol/style/Stroke';
import Text from 'ol/style/Text';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';

import photothermalIcon from './images/photothermal.png';
import photovoltaicIcon from './images/photovoltaic.png';
import windfarmIcon from './images/windfarm.png';

export const fontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
'Noto Color Emoji'`;

export function regionLabelStyle(): StyleFunction {
  return (feature: FeatureLike) => {
    const { name } = feature.getProperties();
    const label = (name as string)
      .replace('藏族自治州', '')
      .replace('市', '')
      .replace('蒙古族', '');

    return [
      new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({
            color: [54, 49, 49, 0.8],
          }),
        }),
      }),
      new Style({
        image: new Circle({
          radius: 5,
          stroke: new Stroke({
            width: 1,
            color: [35, 35, 35, 0.8],
          }),
        }),
      }),
      new Style({
        text: new Text({
          text: label,
          font: `12px ${fontFamily}`,
          textAlign: 'center',
          offsetX: 0,
          offsetY: 15,
          fill: new Fill({
            color: [0, 0, 0, 0.8],
          }),
        }),
      }),
    ];
  };
}

export function plantsPlanedStyle(): StyleFunction {
  const colors: Record<string, any> = {
    photothermal: [232, 81, 81],
    photovoltaic: [230, 152, 0],
    windfarm: [0, 191, 143],
  };
  const icons: Record<string, string> = {
    photothermal: photothermalIcon,
    photovoltaic: photovoltaicIcon,
    windfarm: windfarmIcon,
  };

  return (feature: FeatureLike) => {
    const { type } = feature.getProperties();

    return [
      new Style({
        image: new Circle({
          radius: 12,
          stroke: new Stroke({
            width: 1,
            color: colors[type],
          }),
        }),
      }),
      new Style({
        image: new Circle({
          radius: 10,
          fill: new Fill({
            color: colors[type],
          }),
        }),
      }),
      new Style({
        image: new Icon({
          src: icons[type],
          scale: 0.5,
        }),
      }),
    ];
  };
}
