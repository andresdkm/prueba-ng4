export class FieldModel {
  label: string;
  field: string;
  values: [];
  type: any;
  size: number;

  get size(): number {
    if (this.size) {
      return this.size;
    } else {
      return 6;
    }
  }
}
