import { Component, OnInit } from '@angular/core';
import { LangService } from '../shared/lang.service';
import { NgIf } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
    selector: 'app-language-dropdown',
    template: `
    <p-dropdown
      [options]="countries"
      [(ngModel)]="selectedCountry"
      optionLabel="name"
      (onChange)="onChange()"
      dataKey="lang"
    >
      <ng-template pTemplate="selectedItem">
        <div class="d-flex flex-row" *ngIf="selectedCountry">
          <div class="p-1">
            <img
              [src]="
                './assets/images/flags/' +
                selectedCountry.code.toLowerCase() +
                '.svg'
              "
              style="width: 17px;"
            />
          </div>
          <div class="p-1">{{ selectedCountry.code }}</div>
        </div>
      </ng-template>
      <ng-template let-country pTemplate="item">
        <div class="d-flex flex-row">
          <div class="p-1">
            <img
              [src]="
                './assets/images/flags/' + country.code.toLowerCase() + '.svg'
              "
              style="width: 17px;"
            />
          </div>
          <div class="p-1">{{ country.code }}</div>
        </div>
      </ng-template>
    </p-dropdown>
  `,
    styles: [''],
    standalone: true,
    imports: [
        DropdownModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        NgIf,
    ],
})
export class LanguageDropdownComponent implements OnInit {
  selectedCountry: Country;
  countries: Country[];

  constructor(private langService: LangService) {
    this.selectedCountry = { name: '', code: '', lang: 'en' };
    this.countries = [
      { name: 'Italy', code: 'IT', lang: 'it' },
      { name: 'United Kingdom', code: 'GB', lang: 'en' },
    ];
  }
  ngOnInit(): void {
    let c:string = this.langService.getCurrentLanguageCode();
    this.countries.forEach(x => {
      if(x.lang == c)this.selectedCountry = x;
    });
  }

  onChange(): void {
    console.log(this.selectedCountry);
    this.langService.changeLanguage(this.selectedCountry.lang);
  }
}
interface Country {
  name: string;
  code: string;
  lang: string;
}
