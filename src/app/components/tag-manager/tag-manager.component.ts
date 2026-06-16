import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TagService, TagDTO } from '../../services/tag.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-tag-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tag-manager.component.html',
  styleUrl: './tag-manager.component.css'
})
export class TagManagerComponent implements OnInit {

  tags: TagDTO[] = [];
  newTagName = '';

  constructor(
    private tagService: TagService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTags();
  }

  loadTags(): void {
    this.tagService.getAllTags().subscribe({
      next: (tags) => this.tags = tags,
      error: () => this.notificationService.error('Nepodařilo se načíst tagy')
    });
  }

  createTag(): void {
    if (!this.newTagName.trim()) {
      this.notificationService.error('Název tagu nesmí být prázdný');
      return;
    }
    this.tagService.createTag(this.newTagName.trim()).subscribe({
      next: () => {
        this.notificationService.success('Tag byl vytvořen');
        this.newTagName = '';
        this.loadTags();
      },
      error: () => this.notificationService.error('Chyba při vytváření tagu')
    });
  }

  deleteTag(id: number): void {
    this.tagService.deleteTag(id).subscribe({
      next: () => {
        this.notificationService.success('Tag byl smazán');
        this.loadTags();
      },
      error: () => this.notificationService.error('Chyba při mazání tagu')
    });
  }
}