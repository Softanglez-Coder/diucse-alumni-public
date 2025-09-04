import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services';

export interface Batch {
  id: string;
  name: string;
}

@Injectable()
export class BatchService extends BaseService<Batch> {
  constructor() {
    super('batches');
  }
}
