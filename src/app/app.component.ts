import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LayoutComponent } from "./core/layout/layout.component";

@Component({
  standalone: true,
  imports: [RouterModule, LayoutComponent],
  selector: 'tasks-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'tasks';
}
