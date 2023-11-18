export class Template {
  constructor(x?: Partial<Template>) {
    this.id = x?.id ?? 0;
    this.text = x?.text ?? '';
    this.someDate = new Date(x?.someDate ?? 0);
    this.child = new NestedTemplate(x);
    this.childList = x?.childList?.map(x => new NestedTemplate(x)) ?? [] as NestedTemplate[];
  }

  id: number;
  text: string;
  someDate: Date;
  child: NestedTemplate;
  childList: NestedTemplate[];
}

export class NestedTemplate {
  constructor(x?: Partial<NestedTemplate>) {
    this.id = x?.id ?? 0;
  }

  id: number;
}