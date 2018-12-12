import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabContentDirective} from './tabs/tab-content.directive';
import {TabComponent} from './tabs/tab/tab.component';
import {TabsComponent} from './tabs/tabs.component';

const COMPONENTS = [
  TabsComponent,
  TabComponent,
  TabContentDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class SharedModule {}
