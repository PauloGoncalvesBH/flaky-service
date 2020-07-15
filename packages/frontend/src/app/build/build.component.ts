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

import {Component, OnInit, NgZone} from '@angular/core';
import {SearchService} from '../services/search/search.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  InterpretationService,
  expectedParams,
} from '../services/interpretation/interpretation.service';
import {Filter, Test} from '../services/search/interfaces';
import {UtilsService} from '../services/utils.service';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css'],
})
export class BuildComponent implements OnInit {
  constructor(
    public searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
    private interpreter: InterpretationService,
    public utils: UtilsService
  ) {}

  filters = {
    'order by': ['status', 'name'],
  };

  mockTests: Test[] = [
    {
      name: 'should update the rendered pages on input change',
      flaky: true,
      failing: true,
      percentpassing: 98,
      numfails: 2,
      timestamp: {_seconds: 2220},
      environment: {os: 'windows', ref: 'dev'},
    },
    {
      name:
        'should not return to the first page when the paginator is not ready',
      flaky: false,
      failing: true,
      percentpassing: 92,
      numfails: 3,
      timestamp: {_seconds: 3340},
      environment: {os: 'windows', ref: 'dev'},
    },
    {
      name: 'should set the new filters when a repository is found',
      flaky: true,
      failing: false,
      percentpassing: 53,
      numfails: 7,
      timestamp: {_seconds: 5460},
      environment: {os: 'windows', ref: 'dev'},
    },
    {
      name: 'should redirect/refresh when the filters selection changes',
      flaky: true,
      failing: false,
      percentpassing: 66,
      numfails: 5,
      timestamp: {_seconds: 3790},
      environment: {os: 'windows', ref: 'dev'},
    },
    {
      name: 'should create',
      flaky: false,
      failing: false,
      percentpassing: 100,
      numfails: 0,
      timestamp: {_seconds: 1370},
      environment: {os: 'windows', ref: 'dev'},
    },
    {
      name: 'should initialize view',
      flaky: false,
      failing: false,
      percentpassing: 100,
      numfails: 2,
      timestamp: {_seconds: 999},
      environment: {os: 'windows', ref: 'dev'},
    },
  ];

  repositoryName = '';
  organisationName = '';
  buildId = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const foundParams = this.interpreter.parseRouteParam(
        params,
        expectedParams.get('build')
      );
      this.repositoryName = foundParams.queries.get('repo');
      this.organisationName = foundParams.queries.get('org');
      this.buildId = foundParams.queries.get('build');

      /*this.searchService
        .getBuild(
          this.repositoryName,
          this.organisationName,
          foundParams.filters
        )
        .subscribe(repository => {
          this.filterComponent?.setFilters(
            repository.metadata.environments,
            foundParams.filters
          );
        });*/
    });
  }

  onFiltersChanged(filters: Filter[]) {
    this.ngZone.run(() => {
      const route =
        this.organisationName + '/' + this.repositoryName + '/' + this.buildId;
      this.router.navigate([route, this.interpreter.getRouteParam(filters)]);
    });
  }
}
