import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PostService } from '../../services/post.service';
import { NotificationService } from '../../services/notification.service';
import { TagService } from '../../services/tag.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.css'
})
export class PostCreateComponent implements OnInit {

  title = '';
  content = '';
  excerpt = '';
  status = 'PUBLISHED';
  availableTags: string[] = [];
  selectedTags: string[] = [];

  constructor(
    private postService: PostService,
    private notificationService: NotificationService,
    private tagService: TagService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tagService.getAllTags().subscribe({
      next: (tags) => {
        this.availableTags = tags.map(t => t.name);
      },
      error: () => {
        this.notificationService.error('Nepodařilo se načíst tagy');
      }
    });
  }

  toggleTag(tag: string): void {
    if (this.selectedTags.includes(tag)) {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    } else {
      this.selectedTags.push(tag);
    }
  }

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
      status: this.status,
      tags: this.selectedTags
    };

    this.postService.createPost(post).subscribe({
      next: () => {
        this.notificationService.success('Článek byl úspěšně vytvořen');
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.notificationService.error('Chyba při vytváření článku');
      }
    });
  }
}