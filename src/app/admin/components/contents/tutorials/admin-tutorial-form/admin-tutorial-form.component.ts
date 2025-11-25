import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tutorial } from '../../../../model/admin.model';
import { AdminService } from '../../../../services/admin.service';
import { MateriallistModule } from '../../../../../shared/materiallist/materiallist-module';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-admin-tutorial-form',
  imports: [MateriallistModule, QuillModule],
  templateUrl: './admin-tutorial-form.component.html',
  styleUrl: './admin-tutorial-form.component.scss',
})
export class AdminTutorialFormComponent {
  tutorial: Partial<Tutorial> = {
    title: '',
    content: '',
    category: '',
    author: '',
    published: false,
    price: 0,
  };

  isEdit = false;
  tutorialId: string | null = null;
  quillEditor: any;

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    handlers: {
      image: () => this.customImageHandler(),
    },
  };

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tutorialId = this.route.snapshot.paramMap.get('id');
    this.isEdit = !!this.tutorialId;

    if (this.isEdit && this.tutorialId) {
      // In a real app, you would load the tutorial from the service
      // For demo purposes, we'll just set some default values
    }
  }

  onSubmit() {
    console.log(this.tutorial);

    if (this.isEdit && this.tutorialId) {
      this.adminService.updateTutorial(this.tutorialId, this.tutorial);
    } else {
      this.adminService.createTutorial(
        this.tutorial as Omit<Tutorial, 'id' | 'createdAt' | 'updatedAt'>
      );
    }
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/admin/tutorials']);
  }

  customImageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // STEP-3: Upload to Server
        const uploadedUrl = await this.adminService.uploadImage(file);

        // STEP-4: Insert URL into Quill Editor
        const range = this.quillEditor.getSelection();
        this.quillEditor.insertEmbed(range?.index || 0, 'image', uploadedUrl);
      }
    };
  }

  onEditorCreated(editor: any) {
    this.quillEditor = editor;
  }
}
