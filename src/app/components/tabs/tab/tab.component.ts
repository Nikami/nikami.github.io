import {Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import {TabContentDirective} from '../tab-content.directive';

@Component({
  moduleId: module.id,
  selector: 'tab',
  templateUrl: './tab.component.html'
})
export class TabComponent {

  @Input() name = '';
  @Input() isActive = false;

  @Output() select = new EventEmitter<void>();

  @ContentChild(TabContentDirective) tabContentDirective: TabContentDirective;
}
