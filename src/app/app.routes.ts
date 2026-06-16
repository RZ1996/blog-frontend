import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { authGuard } from './guards/auth.guard';
import { TagManagerComponent } from './components/tag-manager/tag-manager.component';

export const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/new', component: PostCreateComponent, canActivate: [authGuard] },
  { path: 'posts/:id', component: PostDetailComponent },
  { path: 'posts/:id/edit', component: PostCreateComponent, canActivate: [authGuard] },
  { path: 'tags', component: TagManagerComponent, canActivate: [authGuard] },
];