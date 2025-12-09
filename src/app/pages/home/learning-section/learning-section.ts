import { Component } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-learning-section',
  imports: [MateriallistModule, RouterLink],
  templateUrl: './learning-section.html',
  styleUrl: './learning-section.scss',
})
export class LearningSection {
  categories = [
    {
      title: 'Handbooks',
      description: 'Clear, concise handbooks for fast and effective learning.',
      icon: '📘',
      link: '/handbooks',
    },
    {
      title: 'DSA Sheets',
      description:
        'Solve curated DSA question sheets to boost problem-solving.',
      icon: '📄',
      link: '/dsa-sheets',
    },
    {
      title: 'AI Engineer',
      description: 'Learn AI tools, prompts, workflows, and AI-driven coding.',
      icon: '🤖',
      link: '/generative-ai',
    },
    {
      title: 'Mock Tests',
      description: 'Practice timed tests & evaluate your tech knowledge.',
      icon: '📝',
      link: '/mock-tests',
    },
    {
      title: 'Interview Questions',
      description:
        'Prepare with frequently asked frontend & backend questions.',
      icon: '💼',
      link: '/interview-questions',
    },

    {
      title: 'Our Blogs',
      description: 'Latest updates, coding tips, tutorials & insights.',
      icon: '📰',
      link: '/blog',
    },
    {
      title: 'Online Compiler',
      description: 'Run code instantly in your browser—no installation needed.',
      icon: '💻',
      link: '/compiler',
    },
    {
      title: 'Roadmaps',
      description: 'Guided step-by-step learning paths for all developers.',
      icon: '🗺️',
      link: '/roadmap',
    },
    {
      title: 'Kids Corner',
      description:
        'Safe, fun learning—coding, maths, reading, and creativity for kids.',
      icon: '👩‍👧‍👦',
      link: '/kids-corner',
    },
  ];
}
