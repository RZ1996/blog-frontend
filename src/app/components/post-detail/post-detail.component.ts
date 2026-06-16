import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {

  post: any = null;
  loading = false;
  confirmDelete = false;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadPost(Number(id));
    }
  }

  loadPost(id: number): void {
    this.loading = true;
    this.postService.getPostById(id).subscribe({
      next: (post) => {
        this.post = post;
        this.loading = false;
      },
      error: (err) => {
        console.error('Chyba při načítání článku', err);
        this.loading = false;
      }
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  deletePost(): void {
    this.postService.deletePost(this.post.id).subscribe({
      next: () => {
        this.notificationService.success('Článek byl úspěšně smazán');
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        if (err.status === 403) {
          this.notificationService.error('Nemáš oprávnění smazat tento článek');
        } else if (err.status === 404) {
          this.notificationService.error('Článek nebyl nalezen');
        } else {
          this.notificationService.error('Chyba při mazání článku');
        }
      }
    });
  }
}