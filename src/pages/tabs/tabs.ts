import { SettingsPage } from './../settings/settings';
import { ProfilePage } from './../profile/profile';
import { MainPage } from './../main/main';
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MainPage;
  tab2Root = SettingsPage; 

  constructor() {

  }
}
