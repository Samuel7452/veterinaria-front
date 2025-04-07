import { EventEmitter } from "@angular/core"

export class Emitters {
    static authEmitter = new EventEmitter<boolean>();
    static petEmitter = new EventEmitter<number>();
    static typeEmitter = new EventEmitter<[any, any]>();
}