import {AfterContentInit, Component, ContentChildren, QueryList} from "@angular/core";
import {TabComponent} from "./tab/tab.component";
import {ReplaySubject} from "rxjs/ReplaySubject";

@Component({
  moduleId: module.id,
  selector: 'tabs',
  templateUrl: 'tabs.component.html'
})
export class TabsComponent implements AfterContentInit {

  public tabs: ReadonlyArray<TabComponent>;
  private tabs$ = new ReplaySubject<QueryList<TabComponent>>(1);

  @ContentChildren(TabComponent)
  set contentChildren(tabs: QueryList<TabComponent>) {
    this.tabs$.next(tabs);
  }

  ngAfterContentInit(): void {
    this.tabs$.subscribe((tabs) => {
      this.tabs = tabs.toArray();
      if (this.tabs.length > 0) {
        const tabToSelect = this.tabs.find((tab) => tab.isActive) || this.tabs[0];
        this.selectTab(tabToSelect);
      }
    });
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((t) => t.isActive = false);
    tab.isActive = true;

    setTimeout(() => tab.select.emit(), 0);
  }
}
