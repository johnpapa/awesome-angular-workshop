export class Villain {
  static generateMockVillain(): Villain {
    return {
      id: 0,
      name: '',
      saying: ''
    };
  }
  constructor(
    public id: number,
    public name: string,
    public saying: string
  ) {}
}
