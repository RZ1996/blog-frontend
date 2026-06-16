import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent {

  title = '';
  content = '';
  excerpt = '';
  status = 'PUBLISHED';

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (this.title.length < 3) {
      this.notificationService.error('Nadpis musí mít alespoň 3 znaky');
      return;
    }
    if (this.content.length < 10) {
      this.notificationService.error('Obsah musí mít alespoň 10 znaků');
      return;
    }

    const post = {
      title: this.title,
      content: this.content,
      excerpt: this.excerpt,
      status: this.status
    };

    this.postService.createPost(post).subscribe({
      next: (response) => {
        this.notificationService.success('Článek byl úspěšně vytvořen');
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.notificationService.error('Chyba při vytváření článku');
      }
    });
  }
}