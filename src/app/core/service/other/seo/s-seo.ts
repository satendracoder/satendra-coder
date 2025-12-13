import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SSeo {
  constructor(private title: Title, private meta: Meta) {}

  updateMeta(meta: {
    title: string;
    description: string;
    keywords: string;
    url?: string;
    image?: string;
    auther?: string;
  }) {
    const {
      title,
      description,
      keywords = '',
      url = 'https://satendracoder.com',
      image = 'https://satendracoder.com/assets/favicon.ico',
      auther = 'Satendra Rajput (Software Engineer)',
    } = meta;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:auther', content: auther });

    // Twitter
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.meta.updateTag({ name: 'twitter:auther', content: auther });
  }
}
