import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  langs: Array<string> = [];
  defLag: string;
  constructor(
    private tService: TranslateService,
    private config: PrimeNGConfig
  ) {
    this.langs = environment.availableLang.split(',');
    this.defLag = environment.defaultLang;
  }

  public getCurrentLanguageCode(): string{
    return this.tService.currentLang;
  }

  public initTranslationServices(): void {
    this.tService.addLangs(this.langs);
  }

  public initFromBrowser(): void {
    this.changeLanguage(window?.navigator.language?.substring(0, 2));
  }

  public changeLanguage(langCode: string): void {
    console.log('lang service change language request: ' + langCode);
    if (!this.langs.includes(langCode)) {
      console.log('lang service, fallback on default language');
      langCode = this.defLag;
    }
    this.tService.use(langCode);
    this.tService.get('primeng').subscribe((res) => {
      this.config.setTranslation(res);
    });
  }
}
