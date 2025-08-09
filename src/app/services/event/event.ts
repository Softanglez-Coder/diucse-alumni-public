import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/services";

export interface Event {
    id: string;
    title: string;
    description: string;
    category: string;
    date: string;
    time: string;
    location: string;
    venue: string;
    price: string;
    capacity: number;
    registered: number;
    image: string;
    featured: boolean;
    active: boolean;
    registrationLink: string;
}

@Injectable()
export class EventService extends BaseService<Event> {
    constructor() {
        super('events');
    }
}
