// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {filter} from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {LicenseComponent} from '../license/license.component';
import {GlobalsService} from '../services/globals/globals.service';
import {RouteProvider} from '../routing/route-provider/RouteProvider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'flaky.dev';
  showConfigWheel = false;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private globals: GlobalsService
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(
        (event: NavigationEnd) =>
          (this.showConfigWheel = event.url == '/'+RouteProvider.routes.repo.path)
      );
    this.globals.pageDataChange.subscribe(pagedata => {
      const onRepoPage =
        pagedata.currentPage === RouteProvider.routes.repo.name;
      console.log(onRepoPage);
    });
  }

  openLicenseDialog(): void {
    this.dialog.open(LicenseComponent, new MatDialogConfig());
  }
}
