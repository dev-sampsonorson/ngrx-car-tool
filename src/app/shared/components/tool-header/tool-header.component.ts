import { Attribute, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tool-header',
  template: `
    <header>
      <h1>{{ headerText }}</h1>
    </header>
  `,
  styles: [
  ]
})
export class ToolHeaderComponent {

  constructor(@Attribute('headerText') public headerText: string = '[Tool Header]') { }

}
