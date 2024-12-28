export interface ICrud<T> {
  add(body: T): Promise<T>;
  find(query?: object):  Promise<Array<T> | null>;
  getOne(query?: object): Promise<T | null>;
  update(id: string, body: any): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
