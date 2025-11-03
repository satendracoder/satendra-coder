import { Component, inject } from '@angular/core';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { BlogBanner } from '../../components/blog-banner/blog-banner';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { Category, Blog } from '../../models/blog.interface';
import { Sblog } from '../../service/sblog';
import { BlogCard } from '../../components/blog-card/blog-card';
import { SSeo } from '../../../../core/service/other/seo/s-seo';
import { Router } from '@angular/router';
import { GlobalContact } from '../../../../shared/components/other/global-contact/global-contact';

@Component({
  selector: 'app-blog-layout',
  imports: [
    MenuCard,
    FooterCard,
    MateriallistModule,
    BlogBanner,
    GlobalContact,
  ],
  templateUrl: './blog-layout.html',
  styleUrl: './blog-layout.scss',
})
export class BlogLayout {
  private seo = inject(SSeo);
  titleSeo: string =
    'Satendra Creator – Empowering Developers with Tools, Tutorials & Tech Insights (Hindi & English)';
  description: string =
    'Satendra Creator is a platform by Satendra Rajput offering developer tools, coding tutorials, and tech insights in Hindi & English.';
  keywords: string =
    'satendra Creator, coding tutorials, dev tools, angular, spring boot';

  constructor(private router: Router, private blogService: Sblog) {}

  ngOnInit() {
    this.seo.updateMeta({
      title: this.titleSeo || this.titleSeo.slice(0, 150),
      description: this.description,
      keywords: this.keywords,
      url: 'https://satendracoder.com',
      image: 'https://satendracoder.com/assets/favicon.ico',
    });

    this.blogService.getAllBlogs().subscribe((res) => {
      //console.log(res);

      this.blogs = res;
    });

    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.loadPage();
    this.updatePages();
  }

  blogs: any[] = [];

  currentPage = 1;
  pageSize = 6; // एक पेज में 3 blogs
  totalPages = 0;
  paginatedBlogs: any[] = [];
  pages: number[] = [];

  updatePages() {
    const total = this.totalPages;
    const current = this.currentPage;
    const visible: number[] = [];

    if (total <= 6) {
      // agar pages kam hain to sab dikhao
      for (let i = 1; i <= total; i++) visible.push(i);
    } else {
      if (current <= 4) {
        visible.push(1, 2, 3, 4, -1, total);
      } else if (current >= total - 3) {
        visible.push(1, -1, total - 4, total - 3, total - 2, total - 1, total);
      } else {
        visible.push(1, -1, current - 1, current, current + 1, -1, total);
      }
    }

    this.pages = visible;
  }

  loadPage() {
    const start = (this.currentPage - 1) * this.pageSize;
    this.paginatedBlogs = this.blogs.slice(start, start + this.pageSize);
    this.updatePages(); // 👉 har page change par update karna zaroori hai
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadPage();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.loadPage();
  }

  openBlog(id: number) {
    this.router.navigate(['/blog', id]); // 👉 detail page पर redirect
  }
}
