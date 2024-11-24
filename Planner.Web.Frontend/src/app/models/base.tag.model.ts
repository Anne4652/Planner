import { Color } from './color.model';

export interface BaseTag {
  id: number,
  name: string,
  color?: Color,
  isSelected: boolean,
  isEdit: boolean,
}

export const BaseTagColumns = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },

  {
    key: 'name',
    type: 'text',
    label: 'Назва',
    required: true,
  },
  {
    key: 'color',
    type: 'colorSelect',
    label: 'Колір',
    selectItems: [null, ...Object.values(Color).filter(o => typeof (o) === 'string')],
  },

  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
