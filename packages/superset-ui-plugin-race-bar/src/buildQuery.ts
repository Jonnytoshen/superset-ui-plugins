import { buildQueryContext } from '@superset-ui/core';
import { RaceBarFormData } from './types';

export default function buildQuery(formData: RaceBarFormData) {
  const { x_axis, y_axis, update_by } = formData;
  const columns: string[] = [];
  if (x_axis) columns.push(x_axis);
  if (y_axis) columns.push(y_axis);
  if (update_by) columns.push(update_by);

  return buildQueryContext(formData, baseQueryObject => [
    {
      ...baseQueryObject,
      columns
    },
  ]);
}