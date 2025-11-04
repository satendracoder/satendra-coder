import { Component, HostListener } from '@angular/core';
import { MateriallistModule } from '../../../../shared/materiallist/materiallist-module';
import { MenuCard } from '../../../../pages/home/menu-card/menu-card';
import { GlobalContact } from '../../../../shared/components/other/global-contact/global-contact';
import { FooterCard } from '../../../../pages/home/footer-card/footer-card';
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
  imports: [MateriallistModule, MenuCard, GlobalContact, FooterCard],
  templateUrl: './roadmap-layout.component.html',
  styleUrl: './roadmap-layout.component.scss',
})
export class RoadmapLayoutComponent {
  // Roadmap phases (example)
  roadmap = [
    {
      title: 'Foundation',
      date: 'Week 1 - 4',
      items: ['Basics', 'Setup', 'Hello World'],
    },
    {
      title: 'Build',
      date: 'Month 2 - 4',
      items: ['Core Features', 'APIs', 'Auth'],
    },
    {
      title: 'Polish & Ship',
      date: 'Month 5 - 6',
      items: ['Perf', 'QA', 'Release'],
    },
  ];

  // All topics provided by user (short descriptions + details placeholder)
  topics: Topic[] = [
    {
      name: 'Frontend',
      category: 'Web',
      short: 'Build interactive UIs.',
      details:
        'Frontend includes HTML, CSS, JS frameworks (React/Vue/Angular) and focuses on building user interfaces.',
    },
    {
      name: 'Backend',
      category: 'Web',
      short: 'Server, DB, APIs.',
      details:
        'Backend covers server-side languages (Node, Java, Python), databases, authentication, REST/GraphQL and performance.',
    },
    {
      name: 'Full Stack',
      category: 'Web',
      short: 'Frontend + Backend.',
      details:
        'Full Stack combines both client and server knowledge and deployment.',
    },
    {
      name: 'DevOps',
      category: 'Infra',
      short: 'CI/CD, infra as code.',
      details:
        'DevOps focuses on automation, deployment pipelines, monitoring, and infrastructure tools like Terraform, Kubernetes.',
    },
    {
      name: 'Data Analyst',
      category: 'Data',
      short: 'Data cleaning & viz.',
      details:
        'Data Analysts transform and visualize data, using SQL, Excel, BI tools and storytelling.',
    },
    {
      name: 'AI Engineer',
      category: 'AI',
      short: 'Build ML-powered systems.',
      details:
        'AI Engineers productionize ML models, handle data pipelines, model serving and monitoring.',
    },
    {
      name: 'AI and Data Scientist',
      category: 'AI',
      short: 'Research & models.',
      details:
        'Data Scientists explore data, build models, validate hypotheses and communicate insights.',
    },
    {
      name: 'Data Engineer',
      category: 'Data',
      short: 'Pipelines & ETL.',
      details:
        'Data Engineers build reliable data pipelines, warehousing and streaming solutions.',
    },
    {
      name: 'Android',
      category: 'Mobile',
      short: 'Mobile apps on Android.',
      details:
        'Android development with Kotlin/Java, app architecture, testing and Play Store release.',
    },
    {
      name: 'Machine Learning',
      category: 'AI',
      short: 'Model training & evaluation.',
      details:
        'Study supervised/unsupervised techniques, model selection, evaluation metrics and deployment.',
    },
    {
      name: 'PostgreSQL',
      category: 'DB',
      short: 'Relational DB mastery.',
      details:
        'Postgres advanced queries, indexing, performance tuning, and replication.',
    },
    {
      name: 'iOS',
      category: 'Mobile',
      short: 'iPhone apps with Swift.',
      details:
        'iOS development using Swift / SwiftUI, app lifecycle, and App Store distribution.',
    },
    {
      name: 'Blockchain',
      category: 'Web3',
      short: 'Decentralized apps.',
      details:
        'Blockchain fundamentals, smart contracts, Ethereum, and dApp architecture.',
    },
    {
      name: 'QA',
      category: 'Quality',
      short: 'Testing & automation.',
      details:
        'Quality assurance processes, test automation, unit/integration/e2e testing and CI integration.',
    },
    {
      name: 'Software Architect',
      category: 'Design',
      short: 'High-level system design.',
      details:
        'Design patterns, architecture principles, scalability, and trade-off analysis.',
    },
    {
      name: 'Cyber Security',
      category: 'Security',
      short: 'Protect systems.',
      details:
        'Security best practices, threat modelling, encryption, and secure development lifecycle.',
    },
    {
      name: 'UX Design',
      category: 'Design',
      short: 'User experience & research.',
      details:
        'UX patterns, research, wireframing, prototyping and usability testing.',
    },
    {
      name: 'Technical Writer',
      category: 'Content',
      short: 'Docs & guides.',
      details: 'Create clear docs, API docs, tutorials and developer guides.',
    },
    {
      name: 'Game Developer',
      category: 'Games',
      short: 'Client-side game dev.',
      details:
        'Game loops, rendering, physics, engines like Unity/Unreal and asset pipelines.',
    },
    {
      name: 'Server Side Game Developer',
      category: 'Games',
      short: 'MMO backend & servers.',
      details:
        'Networking, authoritative servers, scaling, latency handling and persistence.',
    },
    {
      name: 'MLOps',
      category: 'AI',
      short: 'Model lifecycle ops.',
      details:
        'MLOps handles reproducibility, CI for ML, model deployment, monitoring and feature stores.',
    },
    {
      name: 'Product Manager',
      category: 'Product',
      short: 'Product strategy & delivery.',
      details:
        'Roadmapping, stakeholder management, prioritization, metrics and GTM.',
    },
    {
      name: 'Engineering Manager',
      category: 'Leadership',
      short: 'Lead engineering teams.',
      details: 'Hiring, career growth, process, and technical leadership.',
    },
    {
      name: 'Developer Relations',
      category: 'Community',
      short: 'Dev advocacy & docs.',
      details:
        'Community building, talks, content, SDKs and feedback loops with engineering.',
    },
    {
      name: 'BI Analyst',
      category: 'Data',
      short: 'Business intelligence.',
      details: 'BI reporting, dashboards, KPIs and SQL for business questions.',
    },
    {
      name: 'Create your own Roadmap',
      category: 'Custom',
      short: 'Personalize your path.',
      details: 'Build a custom learning/career roadmap based on your goals.',
    },
    {
      name: 'Skill-based Roadmaps',
      category: 'Custom',
      short: 'Learn by skills.',
      details: 'Roadmaps focused on mastering individual skills.',
    },

    // Skills list (many)
    {
      name: 'SQL',
      short: 'Queries, joins, optimization.',
      details:
        'From basic SELECT to advanced window functions and performance tuning.',
    },
    {
      name: 'Computer Science',
      short: 'Foundations & theory.',
      details:
        'OS, networking, algorithms, complexity and system design basics.',
    },
    {
      name: 'React',
      short: 'Component-based UI.',
      details:
        'React core, hooks, state mgmt, and ecosystem (Next.js, routing).',
    },
    {
      name: 'Vue',
      short: 'Progressive JS framework.',
      details: 'Vue fundamentals, composition API, and tooling.',
    },
    {
      name: 'Angular',
      short: 'Full framework for apps.',
      details: 'Components, DI, RxJS, routing and CLI workflow.',
    },
    {
      name: 'JavaScript',
      short: 'Language fundamentals.',
      details: 'ES6+, async patterns, closures and runtime behavior.',
    },
    {
      name: 'TypeScript',
      short: 'Typed JS superset.',
      details: 'Types, generics, advanced typing and tooling integration.',
    },
    {
      name: 'Node.js',
      short: 'Server-side JS.',
      details: 'Event loop, streams, Express/Koa, and scalable APIs.',
    },
    {
      name: 'Python',
      short: 'General purpose & ML.',
      details:
        'Scripting, web frameworks, data libraries (pandas, scikit-learn).',
    },
    {
      name: 'System Design',
      short: 'Design large systems.',
      details: 'CAP theorem, load balancing, caching, data partitioning.',
    },
    {
      name: 'Java',
      short: 'Enterprise & backend.',
      details: 'JVM, Spring ecosystem, concurrency and tooling.',
    },
    {
      name: 'ASP.NET Core',
      short: 'Microsoft web framework.',
      details: 'Building APIs, middleware and hosting with .NET Core.',
    },
    {
      name: 'API Design',
      short: 'Design good APIs.',
      details: 'RESTful principles, versioning, pagination and security.',
    },
    {
      name: 'Spring Boot',
      short: 'Java microservices.',
      details:
        'Spring ecosystem, dependency injection, and microservices patterns.',
    },
    {
      name: 'Flutter',
      short: 'Cross-platform mobile.',
      details: 'Dart, widgets, state management and native integrations.',
    },
    {
      name: 'C++',
      short: 'Systems and performance.',
      details: 'Memory management, OOP, and STL.',
    },
    {
      name: 'Rust',
      short: 'Memory-safe systems language.',
      details: 'Ownership model, concurrency and performance.',
    },
    {
      name: 'Go Roadmap',
      short: 'Concurrent backend systems.',
      details: 'Go routines, channels, and building microservices.',
    },
    {
      name: 'Design and Architecture',
      short: 'High-level design.',
      details: 'Principles, patterns and scalable architectures.',
    },
    {
      name: 'GraphQL',
      short: 'Flexible API query language.',
      details: 'Schema design, resolvers, and federation.',
    },
    {
      name: 'React Native',
      short: 'Mobile with React.',
      details: 'Cross-platform apps reusing React skills.',
    },
    {
      name: 'Design System',
      short: 'Reusable UI systems.',
      details: 'Tokens, components, accessibility and documentation.',
    },
    {
      name: 'Prompt Engineering',
      short: 'Design prompts for LLMs.',
      details: 'Prompt patterns, evaluation and safety.',
    },
    {
      name: 'MongoDB',
      short: 'NoSQL document DB.',
      details: 'Schema design, indexing and aggregation.',
    },
    {
      name: 'Linux',
      short: 'OS fundamentals.',
      details: 'Shell, process mgmt, system admin tasks.',
    },
    {
      name: 'Kubernetes',
      short: 'Container orchestration.',
      details: 'Pods, services, deployments, and operators.',
    },
    {
      name: 'Docker',
      short: 'Containerization basics.',
      details: 'Images, containers, Dockerfile patterns and registries.',
    },
    {
      name: 'AWS',
      short: 'Cloud provider basics.',
      details: 'Core services (EC2, S3, RDS, Lambda) and infra design.',
    },
    {
      name: 'Terraform',
      short: 'Infra as code.',
      details: 'State, modules, providers and best practices.',
    },
    {
      name: 'Data Structures & Algorithms',
      short: 'Core CS skills.',
      details: 'Arrays, trees, graphs, DP and common patterns.',
    },
    {
      name: 'Redis',
      short: 'In-memory datastore.',
      details: 'Caching patterns, data structures and persistence.',
    },
    {
      name: 'Git and GitHub',
      short: 'Version control.',
      details: 'Branching, PRs, code review workflow and CI.',
    },
    {
      name: 'PHP',
      short: 'Web backend language.',
      details: 'Laravel, performance and ecosystem.',
    },
    {
      name: 'Cloudflare',
      short: 'Edge services & CDN.',
      details: 'Caching, Workers, DNS and security features.',
    },
    {
      name: 'AI Red Teaming',
      short: 'Assessing AI risks.',
      details: 'Adversarial testing, model robustness and safety.',
    },
    {
      name: 'AI Agents',
      short: 'Autonomous LLM agents.',
      details: 'Agent frameworks, tool usage and orchestration.',
    },
    {
      name: 'Next.js',
      short: 'React framework for SSR.',
      details: 'Routing, data fetching and performance optimization.',
    },
    {
      name: 'Code Review',
      short: 'Best practices.',
      details: 'Constructive feedback, checklist and automation.',
    },
    {
      name: 'Kotlin',
      short: 'Modern JVM language.',
      details: 'Android-first language with concise syntax.',
    },
    {
      name: 'HTML',
      short: 'Markup fundamentals.',
      details: 'Semantic HTML, accessibility and structure.',
      newBadge: false,
    },
    {
      name: 'CSS',
      short: 'Styling websites.',
      details: 'Layouts, Flexbox, Grid and modern CSS features.',
    },
    {
      name: 'Swift & Swift UI',
      short: 'iOS native modern stack.',
      details: 'Swift language and SwiftUI declarative UI.',
    },
    {
      name: 'Shell / Bash',
      short: 'Scripting & automation.',
      details: 'Shell scripting, automation and cron jobs.',
    },
    {
      name: 'Project Ideas',
      short: 'Hands-on project inspirations.',
      details: 'Project lists for frontend, backend, devops and more.',
    },
    {
      name: 'Frontend Performance',
      short: 'Optimize client apps.',
      details: 'Perf budgets, code-splitting and critical rendering path.',
    },
    {
      name: 'Backend Performance',
      short: 'Scale backend systems.',
      details: 'Profiling, caching and concurrency.',
    },
    {
      name: 'API Security',
      short: 'Secure your APIs.',
      details: 'Auth, rate-limiting, input validation and OWASP.',
    },
    // add others similarly...
  ];

  // Modal state
  showModal = false;
  selectedTopic: Topic | null = null;

  openModal(topic: Topic) {
    this.selectedTopic = topic;
    this.showModal = true;
    // prevent body scroll
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    this.showModal = false;
    this.selectedTopic = null;
    document.body.style.overflow = '';
  }

  // close on ESC
  @HostListener('document:keydown.escape', ['$event'])
  onEsc(event: KeyboardEvent | Event) {
    if ((event as KeyboardEvent).key === 'Escape' && this.showModal) {
      this.closeModal();
    }
  }
}
