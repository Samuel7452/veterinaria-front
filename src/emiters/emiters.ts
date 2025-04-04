import { EventEmitter } from "@angular/core"

export class Emitters {
    static authEmitter = new EventEmitter<boolean>();
    static typeEmitter = new EventEmitter<[any, any]>();
}