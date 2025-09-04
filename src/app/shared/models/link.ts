export class Link {
  label!: string;
  url!: string;
  icon?: string;
  isExternal?: boolean = false;
  children?: Link[] = [];

  constructor(label: string, url: string) {
    if (!label) {
      throw new Error('Label is required');
    }

    if (!url) {
      throw new Error('URL is required');
    }

    this.label = label;
    this.url = url;
  }

  addChild(child: Link): void {
    if (!this.children) {
      this.children = [];
    }
    this.children.push(child);
  }
}
