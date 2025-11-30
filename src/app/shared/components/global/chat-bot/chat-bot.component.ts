import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  NgZone,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { MateriallistModule } from '../../../materiallist/materiallist-module';
import { CHAT_DATA } from './chat';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SSafeStorage } from '../../../../core/service/global/safe-storage/s-safe-storage';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chat-bot',
  imports: [MateriallistModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss',
})
export class ChatBotComponent {
  userNameTalk = 'Unkonw';
  showChatBox = false;
  userInput = '';
  messages: {
    sender: 'user' | 'bot';
    text: string;
    type?: 'text' | 'video' | 'link';
    isSpeaking?: boolean;
  }[] = [];
  recognition: any;
  faqData = CHAT_DATA;
  // Variables to track state
  isRecording: boolean = false;
  isAnswering: boolean = false;
  // Add a reference for the voice button element in the component (after view init)
  @ViewChild('voiceBtn') voiceBtn!: ElementRef;
  @ViewChild('chatBox') private chatBox!: ElementRef;

  isBrowser = false;

  constructor(
    private eRef: ElementRef,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
    private safe: SSafeStorage,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.userNameTalk = this.safe.getItem('BankuserName') || 'Unkonw';
    // this.initSpeechRecognition();
    if (this.isBrowser) {
      this.setupSpeechSynthesisEvents();
    }
  }
  // Scroll chat box to bottom after each view update
  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  getSafeYoutubeUrl(url: string): SafeResourceUrl {
    const videoId = this.extractYoutubeId(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoId}`
    );
  }

  extractYoutubeId(url: string): string | null {
    const regex =
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  private scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop =
        this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      // handle error if any
    }
  }

  selectedLanguage: string = 'hi'; // default

  setLanguage(lang: string) {
    this.selectedLanguage = lang;
    // aap yaha speech language ya other logic bhi add kar sakte ho
    console.log(lang);
  }

  toggleChat() {
    this.showChatBox = !this.showChatBox;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    // Agar click chat box ke andar nahi hua
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showChatBox = false;
    }
  }

  sendMessage() {
    const input = this.userInput.trim();
    if (!input) return;

    this.messages.push({ sender: 'user', text: input });
    this.userInput = '';
    this.replyToUser(input);
  }

  replyToUser(userText: string) {
    const answer = this.findAnswer(userText);
    this.messages.push({ sender: 'bot', text: answer.text, type: answer.type });
    if (answer.type === 'text') {
      this.speak(answer.text);
    }
  }

  findAnswer(question: string): {
    text: string;
    type: 'text' | 'link' | 'video';
  } {
    const lowerQuestion = question.toLowerCase();

    // Direct check for keywords
    if (lowerQuestion.includes('tutorial')) {
      return {
        text: 'https://youtu.be/x3X-eC3TNCc?si=eYxmbtiUQ4SmyQ58',
        type: 'video',
      };
    }

    if (
      lowerQuestion.includes('aap link') ||
      lowerQuestion.includes('link app')
    ) {
      return {
        text: 'https://play.google.com/store/apps/details?id=com.wts.redmilapp',
        type: 'link',
      };
    }

    // Search in FAQ data
    for (const faq of this.faqData) {
      const faqQuestion = faq.question.toLowerCase();
      const faqAnswer = faq.answer.toLowerCase();

      if (
        faqQuestion.includes(lowerQuestion) ||
        faqAnswer.includes(lowerQuestion)
      ) {
        const answerText = faq.answer;

        // Detect if it's a video link (YouTube or .mp4)
        if (/\.(mp4)$/i.test(answerText) || answerText.includes('youtu')) {
          return { text: answerText, type: 'video' };
        }

        // Detect if it's a general link
        if (/^https?:\/\/\S+$/i.test(answerText)) {
          return { text: answerText, type: 'link' };
        }

        // Otherwise it's plain text
        return { text: answerText, type: 'text' };
      }
    }

    // Default response
    return {
      text: 'Maaf kijiye, mujhe is prashn ka uttar nahi mila.',
      type: 'text',
    };
  }

  isAnsweringIndex: number | null = null; // Track which index is speaking

  transliterationMap: { [key: string]: string } = {
    'बिल पेमेंट': 'Bill Payment',
    'आपका स्वागत है': 'Aapka Swagat Hai',
  };

  speak(text: string, lang: 'hi' | 'en-hi' = 'hi') {
    if (lang === 'en-hi') {
      text = this.transliterationMap[text] || text;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'en-hi') {
      const voices = speechSynthesis.getVoices();
      const voice = voices.find(
        (v) => v.lang === 'en-IN' || v.lang === 'hi-IN'
      );
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      } else {
        utterance.lang = 'en-US';
      }
    }

    // Mark the latest bot message as speaking
    const lastBotMsgIndex = [...this.messages]
      .reverse()
      .findIndex((msg) => msg.sender === 'bot');
    const realIndex = this.messages.length - 1 - lastBotMsgIndex;

    if (realIndex !== -1) {
      this.messages[realIndex].isSpeaking = true;
    }

    utterance.onend = () => {
      if (realIndex !== -1) {
        this.zone.run(() => {
          this.messages[realIndex].isSpeaking = false;
        });
      }
    };

    speechSynthesis.speak(utterance);
  }

  // Update initSpeechRecognition to toggle isRecording on recognition start/stop

  initSpeechRecognition() {
    const SpeechRecognition =
      (window as any)['webkitSpeechRecognition'] ||
      (window as any)['SpeechRecognition'];
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'hi-IN';
    this.recognition.continuous = true;
    this.recognition.interimResults = false;

    this.recognition.onstart = () => {
      this.zone.run(() => {
        this.isRecording = true;
        this.updateVoiceBtnClass();
      });
    };

    this.recognition.onend = () => {
      this.zone.run(() => {
        this.isRecording = false;
        this.updateVoiceBtnClass();
        // optionally restart recognition if you want continuous listening
        this.recognition.start();
      });
    };

    this.recognition.onresult = (event: any) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();

      this.zone.run(() => {
        this.messages.push({ sender: 'user', text: transcript });
        this.replyToUser(transcript);
      });
    };

    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
    };

    this.recognition.start();
  }

  // Setup SpeechSynthesis events to track when bot starts/stops speaking
  setupSpeechSynthesisEvents() {
    // Monkey patch speak to track isAnswering
    const originalSpeak = speechSynthesis.speak.bind(speechSynthesis);

    speechSynthesis.speak = (utterance: SpeechSynthesisUtterance) => {
      this.zone.run(() => {
        this.isAnswering = true;
        this.updateVoiceBtnClass();
      });

      utterance.onend = () => {
        this.zone.run(() => {
          this.isAnswering = false;
          this.updateVoiceBtnClass();
        });
      };

      originalSpeak(utterance);
    };
  }

  updateVoiceBtnClass() {
    if (!this.voiceBtn) return;

    if (this.isRecording || this.isAnswering) {
      this.voiceBtn.nativeElement.classList.add('recording');
    } else {
      this.voiceBtn.nativeElement.classList.remove('recording');
    }
  }

  // Button click toggle (optional)
  toggleRecognition() {
    if (this.isRecording) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  allSuggestions: string[] = [
    'Redmil app kya hai?',
    'Tutorial video dikhao',
    'Link kaha milega?',
    'Account kaise banayein?',
    'Referral code ka use kaise karein?',
  ];
  filteredSuggestions: string[] = [];

  onInputChange() {
    const query = this.userInput.toLowerCase();
    this.filteredSuggestions = this.allSuggestions.filter((s) =>
      s.toLowerCase().includes(query)
    );
  }

  selectSuggestion(suggestion: string) {
    this.userInput = suggestion;
    this.filteredSuggestions = [];
    this.sendMessage();
  }
}
