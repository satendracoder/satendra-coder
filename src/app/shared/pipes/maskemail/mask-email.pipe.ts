import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskEmail',
})
export class MaskEmailPipe implements PipeTransform {
  transform(email: string): string {
    let [name, domain] = email.split('@');
    return name[0] + '******@' + domain;
  }
}
