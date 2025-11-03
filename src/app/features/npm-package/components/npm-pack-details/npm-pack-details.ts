import { ReactiveFormsModule } from '@angular/forms';
import { Component, signal } from '@angular/core';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { SnpmPackage } from '../../service/snpm-package';
import { DatePipe } from '@angular/common';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { ActivatedRoute } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-npm-pack-details',
  standalone: true,
  imports: [MenuCard, FooterCard, DatePipe, MateriallistModule, MarkdownModule],
  templateUrl: './npm-pack-details.html',
  styleUrl: './npm-pack-details.scss',
})
export class NpmPackDetails {
  // 🔔 Signals
  packageName = signal<string>('');
  metadata = signal<any | null>(null);
  downloads = signal<any | null>(null);

  latestVersion = signal<string>('');
  lastPublished = signal<string>('');
  license = signal<string>('N/A');
  size = signal<string>('N/A');
  maintainers = signal<any[]>([]);
  readmeFile = signal<any>('');

  constructor(private route: ActivatedRoute, private npmService: SnpmPackage) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const pkg = params.get('id') || '';
      this.packageName.set(pkg);
      //console.log('📦 Package ID:', pkg);

      if (!pkg) return;

      // Metadata
      this.npmService.getPackageMetadata(pkg).subscribe((data) => {
        this.metadata.set(data);
        // console.log(data, 'jkjsagjh');

        const latest = data['dist-tags']?.latest ?? '';
        this.latestVersion.set(latest);
        this.license.set(data.license ?? 'N/A');
        this.lastPublished.set(data.time?.[latest] ?? '');
        this.maintainers.set(data.maintainers ?? []);
        this.readmeFile.set(data?.readme);

        const unpackedSize = data.versions?.[latest]?.dist?.unpackedSize;
        this.size.set(
          unpackedSize ? (unpackedSize / 1024).toFixed(1) + ' KB' : 'N/A'
        );
      });

      // Downloads
      this.npmService.getDownloads(pkg, 'last-week').subscribe((data) => {
        this.downloads.set(data);
      });
    });
  }
}
