import { Component } from '@angular/core';
import { MateriallistModule } from '../../../shared/materiallist/materiallist-module';

@Component({
  selector: 'app-faq-card',
  imports: [MateriallistModule],
  templateUrl: './faq-card.html',
  styleUrl: './faq-card.scss',
})
export class FaqCard {
  activeIndex: number | null = null;

  faqs = [
    {
      question: 'What is Satendra Coder?',
      answer:
        'Satendra Coder is a learning platform that provides handbooks, DSA sheets, mock tests, interview questions, AI resources, blogs, roadmaps, and coding practice for students and developers.',
    },
    {
      question: 'Who can benefit from Satendra Coder?',
      answer:
        'Beginners, students, and developers who want to learn programming, improve skills, prepare for interviews, or build a full-stack career.',
    },
    {
      question: 'Which skills can I learn here?',
      answer:
        'You can learn HTML, CSS, JavaScript, TypeScript, Angular, Java, Spring Boot, Docker, Microservices, MySQL, NoSQL, and AI tools with structured notes and examples.',
    },
    {
      question: 'What learning resources are available?',
      answer:
        'We offer Handbooks, DSA Sheets, Roadmaps, Interview Questions, Mock Tests, AI Engineer guides, Online Compiler, and daily updated blogs.',
    },
    {
      question: 'Is all the content free?',
      answer:
        'Yes, most handbooks, sheets, interview questions, and practice resources are free. Some advanced courses may be premium in the future.',
    },
    {
      question: 'Do I need to create an account?',
      answer:
        'No. You can access most content without login. Creating an account helps track progress and unlock upcoming features.',
    },
    {
      question: 'Does Satendra Coder support PWA installation?',
      answer:
        'Yes, the platform supports PWA. You can install it on desktop or mobile for faster access and app-like performance.',
    },
    {
      question: 'How can I request new topics or improvements?',
      answer:
        'You can suggest new features, topics, or improvements anytime through the feedback section or the community page.',
    },
  ];

  toggleFAQ(index: number) {
    this.activeIndex = this.activeIndex === index ? null : index;
  }
}
