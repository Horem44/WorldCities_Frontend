import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';

const importedMaterialModules = [
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatExpansionModule,
  MatListModule,
  MatMenuModule,
  MatTableModule,
  MatTreeModule,
  MatRippleModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatSortModule,
  MatToolbarModule,
  MatProgressBarModule,
  DragDropModule,
  MatCardModule,
  MatTabsModule,
  MatPaginatorModule,
  MatSidenavModule,
];

@NgModule({
  imports: [CommonModule, ...importedMaterialModules],
  exports: [...importedMaterialModules],
})
export class MaterialModule {}
