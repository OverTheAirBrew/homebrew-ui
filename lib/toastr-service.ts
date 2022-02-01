import { ToastrRef } from '@paljs/ui';
import { RefObject } from 'react';

class ToastrService {
  private ref: any;

  setRef(ref: RefObject<ToastrRef>) {
    this.ref = ref;
  }

  sendMessage(title: string, message: string) {
    this.ref?.current?.add(message, title, {
      position: 'topEnd',
      status: 'Primary',
      duration: 10000,
      hasIcon: true,
      destroyByClick: true,
      preventDuplicates: true,
    });
  }
}

export const toastrService = new ToastrService();
