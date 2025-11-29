import { Component, HostListener, signal } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { GlobalContact } from '../../../../shared/components/other/global-contact/global-contact';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

interface Topic {
  name: string;
  category?: string;
  short: string;
  details: string;
  tags?: string[];
  newBadge?: boolean;
}

@Component({
  selector: 'app-roadmap-layout',
  imports: [
    MateriallistModule,
    RouterModule,
    MenuCard,
    GlobalContact,
    FooterCard,
  ],
  templateUrl: './roadmap-layout.component.html',
  styleUrl: './roadmap-layout.component.scss',
})
export class RoadmapLayoutComponent {
  isRoadmapRoute = signal<boolean>(false);

  categories: string[] = [
    'All',
    'Programming',
    'Frameworks',
    'Development',
    'Deployment',
    'Other',
  ];

  selectedCategory: string = 'All';

  // All topics provided by user (cleaned, corrected and sorted A–Z)
  topics: Topic[] = [
    {
      name: 'AWS',
      category: 'Deployment',
      short: 'Cloud provider basics.',
      details:
        'Covers EC2, S3, Lambda, RDS, VPC, Load Balancers and cloud architecture fundamentals.',
    },
    {
      name: 'Angular',
      category: 'Frameworks',
      short: 'Build scalable SPAs.',
      details:
        'A TypeScript-based framework for building dynamic single-page applications using components, routing, and RxJS.',
    },
    {
      name: 'Backend Developer',
      category: 'Development',
      short: 'Server-side development.',
      details:
        'Focuses on API development, databases, authentication, security, server logic and performance optimization.',
    },
    {
      name: 'C++',
      category: 'Programming',
      short: 'High-performance systems programming.',
      details:
        'Used for system-level applications, game engines, embedded systems, and memory-efficient development.',
    },
    {
      name: 'DevOps Engineer',
      category: 'Development',
      short: 'Automate CI/CD pipelines.',
      details:
        'Works with CI/CD, monitoring, infrastructure as code, container orchestration and system reliability.',
    },
    {
      name: 'Docker',
      category: 'Deployment',
      short: 'Containerization platform.',
      details:
        'Packages applications into lightweight containers, ensuring consistent deployment across environments.',
    },
    {
      name: 'Express.js',
      category: 'Frameworks',
      short: 'Minimal Node.js framework.',
      details:
        'Used to build fast REST APIs with routing, middleware, authentication and backend utilities.',
    },
    {
      name: 'Frontend Developer',
      category: 'Development',
      short: 'Build modern UIs.',
      details:
        'Works with HTML, CSS, JavaScript, Angular/React, responsive design and UI/UX best practices.',
    },
    {
      name: 'Full Stack Developer',
      category: 'Development',
      short: 'Frontend + Backend expert.',
      details:
        'Handles UI development, APIs, databases, deployments, security, auth and system integration end-to-end.',
    },
    {
      name: 'Git',
      category: 'Programming',
      short: 'Version control system.',
      details:
        'Used for tracking code changes, branching, merging, collaboration and CI/CD workflows.',
    },
    {
      name: 'Go',
      category: 'Programming',
      short: 'Fast backend language.',
      details:
        'Great for microservices, distributed systems, concurrency-heavy apps and high-performance APIs.',
    },
    {
      name: 'Java',
      category: 'Programming',
      short: 'Enterprise backend language.',
      details:
        'Used for scalable applications, Android development, Spring Boot microservices and enterprise systems.',
    },
    {
      name: 'JavaScript',
      category: 'Programming',
      short: 'Language of the web.',
      details:
        'Used for frontend, backend (Node.js), async programming, DOM manipulation, and interactive apps.',
    },
    {
      name: 'Kafka',
      category: 'Other',
      short: 'Distributed event streaming.',
      details:
        'Used for real-time data pipelines, pub-sub messaging, stream processing and event-driven architectures.',
    },
    {
      name: 'Kubernetes',
      category: 'Deployment',
      short: 'Container orchestration.',
      details:
        'Automates container deployment, scaling, networking, and management for large-scale systems.',
    },
    {
      name: 'MLOps',
      category: 'Deployment',
      short: 'Machine learning operations.',
      details:
        'Manages ML pipeline automation, model deployment, monitoring, versioning, and reproducibility.',
    },
    {
      name: 'MongoDB',
      category: 'Other',
      short: 'NoSQL document database.',
      details:
        'Schema-free JSON-like storage, powerful aggregation pipelines, indexing and horizontal scaling.',
    },
    {
      name: 'Python',
      category: 'Programming',
      short: 'Beginner-friendly multi-purpose language.',
      details:
        'Used for automation, web development, data science, ML/AI, scripting and backend APIs.',
    },
    {
      name: 'React',
      category: 'Frameworks',
      short: 'Component-based UI library.',
      details:
        'Builds dynamic user interfaces using components, hooks and virtual DOM.',
    },
    {
      name: 'Redis',
      category: 'Other',
      short: 'In-memory datastore.',
      details:
        'Used for caching, session storage, queues, leaderboard systems and real-time data operations.',
    },
    {
      name: 'SQL',
      category: 'Programming',
      short: 'Relational database queries.',
      details:
        'Covers joins, indexing, query optimization, transactions and relational data modeling.',
    },
    {
      name: 'Spring Boot',
      category: 'Frameworks',
      short: 'Java backend framework.',
      details:
        'Simplifies building production-ready REST APIs with auto-configuration and microservices features.',
    },
    {
      name: 'System Design',
      category: 'Other',
      short: 'Design scalable systems.',
      details:
        'Includes load balancing, caching, sharding, CAP theorem, queues, microservices and architecture patterns.',
    },
  ];

  constructor(private safe: SSafeStorage, private router: Router) {}

  ngOnInit(): void {
    if (this.router) {
      const initialUrl = this.router.url.split('?')[0].replace(/\/$/, '');
      this.isRoadmapRoute.set(initialUrl === '/roadmap');
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => {
          const url = event.urlAfterRedirects.split('?')[0].replace(/\/$/, '');
          this.isRoadmapRoute.set(url === '/roadmap');
        });
    }
  }

  filteredTopics(): Topic[] {
    if (this.selectedCategory === 'All') return this.topics;
    return this.topics.filter((t) => t.category === this.selectedCategory);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  openTopicDetails(topic: Topic) {
    alert(`${topic.name}\n\n${topic.details}`);
  }

  ngAfterViewInit(): void {
    const win = this.safe.nativeWindow;
    if (!win) return;
    const canvas = win.document.getElementById(
      'bgAnimation'
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = win.innerWidth;
    canvas.height = win.innerHeight;

    const dots = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = '#00c6ff';
        ctx.fill();
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;
      });
      requestAnimationFrame(animate);
    }
    animate();
  }
}
