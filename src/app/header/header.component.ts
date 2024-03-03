import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { LanguageDropdownComponent } from '../components/LanguageDropdown.component';

@Component({
    selector: 'app-header',
    template: `
      <div class="w-full">
        <p-menubar [model]="menuItems">
          <ng-template pTemplate="end">
            <app-language-dropdown></app-language-dropdown>
          </ng-template>
        </p-menubar>
      </div>
    `,
    styles: [''],
    standalone: true,
    imports: [MenubarModule,LanguageDropdownComponent]
})
export class HeaderComponent implements OnInit {

  menuItems: MenuItem[] | undefined;

  selectedItem: MenuItem | undefined;

  constructor(private translateService: TranslateService) {
    
  }

  ngOnInit(): void {
    this.translateService.get('HEADER.CUSTOMERS').subscribe(()=>{
      this.menuItems = [
        { label:  this.translateService.instant('HEADER.CUSTOMERS'), routerLink:['/customers']}
      ];
    });
    
    
  }

}
