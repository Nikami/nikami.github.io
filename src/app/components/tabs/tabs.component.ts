import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TabComponent} from './tab/tab.component';

@Component({
  moduleId: module.id,
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    if (this.tabs.length > 0) {
      const tabToSelect = this.tabs.find((tab) => tab.isActive) || this.tabs.first;
      this.selectTab(tabToSelect);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.toArray().forEach((t) => t.isActive = false);
    tab.isActive = true;

    setTimeout(() => tab.select.emit(), 0);
  }
}
