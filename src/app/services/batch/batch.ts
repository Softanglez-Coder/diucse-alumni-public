import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/services";

export interface Batch {
    id: string;
    name: string;
    year: number;
    semester: string;
    isActive: boolean;
}

@Injectable()
export class BatchService extends BaseService<Batch> {
    constructor() {
        super('batches');
    }
}
