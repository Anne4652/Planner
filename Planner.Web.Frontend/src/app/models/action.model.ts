import {ActionState} from "./state.action.model";
import {ActionEnergy} from "./energy.action.model";
import {ContactTag} from "./contact.tag.model";
import {AreaTag} from "./area.tag.model";
import {LabelTag} from "./label.tag.model";

export interface Action {
  id: number,
  text: string,
  notes?: string,
  state: ActionState,
  isDone: boolean,
  isFocused: boolean,

  timeRequired?: number, // хвилини
  energy?: ActionEnergy,
  dueDate?: Date,

  contactTags?: ContactTag[],
  areaTags?: AreaTag[],
  labelTags?: LabelTag[],

  projectId?: number,

  isEdit: boolean
}

export const BaseActionColumns = [
  {
    key: 'isDone',
    type: 'isDone',
    label: '',
    colWidth: '1%',
  },
  {
    key: 'isFocused',
    type: 'isFocused',
    label: '',
    colWidth: `1%`,
  },
  {
    key: 'text',
    type: 'text',
    label: 'Текст',
    colWidth: `20%`,
  },
  {
    key: 'state',
    type: 'select',
    label: 'Стан',
    selectItems: Object.values(ActionState).filter(o => typeof (o) === 'string'),
    colWidth: '5%',
    onlyEdit: true,
  },
  {
    key: 'timeRequired',
    type: 'select',
    label: 'Час, необхідний',
    selectItems: [null, '5 хвилин', '10 хвилин', '15 хвилин', '30 хвилин', '45 хвилин',
      '1 година', '2 години', '3 години', '4 години', '6 годин', '8 годин', 'ого, це багато!'],
    colWidth: '7%',
  },
  {
    key: 'energy',
    type: 'select',
    label: 'Енергія',
    selectItems: [null, ...Object.values(ActionEnergy).filter(o => typeof (o) === 'string')],
    colWidth: '4%',
  },
  {
    key: 'dueDate',
    type: 'date',
    label: 'Кінцевий термін',
    colWidth: '7%',
  },
  {
    key: 'projectId',
    type: 'projectSelect',
    label: 'Категорія',
    colWidth: '10%',
  },
  {
    key: 'tags',
    type: 'tags',
    label: 'Теги',
    colWidth: '30%',
  },

  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
