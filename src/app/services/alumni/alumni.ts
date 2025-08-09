import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/services";

export interface Alumni {
    id: string;
    name: string;
    position: string;
    company: string;
    year: string;
    image: string;
    linkedin: string;
    location: string;
    bio: string;
    active: boolean;
    featured: boolean;
}

@Injectable()
export class AlumniService extends BaseService<Alumni> {
    constructor() {
        super('users');
    }
}
