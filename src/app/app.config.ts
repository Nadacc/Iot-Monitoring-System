import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { MatProgressBarModule } from '@angular/material/progress-bar';

import { routes } from './app.routes';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatListModule} from '@angular/material/list'
import {MatFormFieldModule } from '@angular/material/form-field' 
import {MatInputModule} from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    importProvidersFrom(MatCardModule,
      MatProgressBarModule,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      MatMenuModule,
      MatListModule,
      MatFormFieldModule,
      MatInputModule,
      MatDialogModule,
      MatRadioModule,
      MatDatepickerModule,
      MatNativeDateModule,
      FormsModule)
]
};
