import { ToastrRef } from '@paljs/ui';
import { RefObject } from 'react';
declare class ToastrService {
    private ref;
    setRef(ref: RefObject<ToastrRef>): void;
    sendMessage(title: string, message: string): void;
}
export declare const toastrService: ToastrService;
export {};
