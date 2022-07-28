export interface IProperty {
  id: string;
  type: 'select-box' | 'string' | 'number';
  isRequired: boolean;
  name: string;
  selectBoxValues: string[];
  onChange?: (value: any) => void;
}
