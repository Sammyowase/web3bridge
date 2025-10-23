# 🎯 Quiz Game

A dynamic, interactive quiz game built with React, TypeScript, and Tailwind CSS. Test your knowledge across various topics with a beautiful, responsive interface!

## ✨ Features

### Core Features
- **Dynamic Question Loading**: Questions loaded from JSON data (easily extendable to API)
- **Interactive UI**: Select answers with instant visual feedback
- **Score Tracking**: Real-time score display throughout the quiz
- **Question Progress**: Track your progress through the quiz
- **Completion Summary**: Detailed results at the end with performance feedback

### Advanced Features
- **⏱️ Timer**: 30-second countdown for each question with visual progress bar
- **🏆 Leaderboard**: Save your scores and compete with others
- **💾 Local Storage**: Persistent leaderboard data across sessions
- **🎨 Beautiful UI**: Gradient backgrounds, smooth animations, and responsive design
- **📱 Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **✅ Answer Feedback**: Immediate visual feedback showing correct/incorrect answers
- **🎭 Performance Messages**: Motivational messages based on your score

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd quiz-game
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🎮 How to Play

1. **Start the Quiz**: The game loads automatically with the first question
2. **Read the Question**: Each question displays with a category tag
3. **Watch the Timer**: You have 30 seconds to answer each question
4. **Select Your Answer**: Click on one of the four options
5. **Get Feedback**: Immediately see if your answer was correct or wrong
6. **Progress Through**: The game automatically moves to the next question
7. **View Your Score**: See your final score and performance message
8. **Save to Leaderboard**: Enter your name to save your score
9. **Check Rankings**: View the top 10 scores on the leaderboard
10. **Play Again**: Restart the quiz anytime to improve your score

## 🏗️ Project Structure

```
quiz-game/
├── src/
│   ├── components/
│   │   ├── QuizGame.tsx        # Main game component with timer logic
│   │   ├── QuestionCard.tsx    # Individual question display
│   │   ├── ScoreBoard.tsx      # Final score display
│   │   └── Leaderboard.tsx     # Leaderboard display
│   ├── data/
│   │   └── questions.json      # Quiz questions data
│   ├── types/
│   │   └── quiz.ts            # TypeScript interfaces
│   ├── App.tsx                # Root component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── public/
├── package.json
└── README.md
```

## 🛠️ Technologies Used

- **React 19**: Modern UI library with hooks
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **Local Storage API**: Persistent data storage

## 📝 Adding More Questions

Edit `src/data/questions.json` to add more questions:

```json
{
  "id": 6,
  "question": "Your question here?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": 0,
  "category": "Category Name"
}
```

- `id`: Unique identifier
- `question`: The question text
- `options`: Array of 4 possible answers
- `correctAnswer`: Index of correct answer (0-3)
- `category`: Question category for display

## 🎨 Customization

### Timer Duration
Change the timer duration in `src/components/QuizGame.tsx`:
```typescript
const TIMER_DURATION = 30; // Change to desired seconds
```

### Styling
The app uses Tailwind CSS. Modify classes in component files to customize:
- Colors: Change gradient colors in className props
- Spacing: Adjust padding and margins
- Animations: Modify transition classes

### Leaderboard Size
Change the number of saved scores in `src/components/QuizGame.tsx`:
```typescript
localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard.slice(0, 10)));
// Change 10 to desired number
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Features Breakdown

### Question Display
- Category badge for each question
- Clear, readable question text
- Four option buttons with hover effects
- Visual feedback for selected answers

### Timer System
- 30-second countdown per question
- Visual progress bar
- Color changes (green → red) as time runs low
- Auto-submit when time expires

### Scoring System
- +1 point for each correct answer
- Real-time score display
- Percentage calculation
- Performance-based messages

### Leaderboard
- Top 10 scores saved
- Player name, score, and date
- Medal icons for top 3 positions
- Percentage display
- Clear leaderboard option

## 🐛 Error Handling

The application handles:
- Missing or invalid question data
- Empty leaderboard states
- Timer edge cases
- Invalid user inputs
- Local storage errors

## 📱 Responsive Design

The quiz is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🚀 Future Enhancements

Potential features to add:
- [ ] Multiple quiz categories
- [ ] Difficulty levels
- [ ] API integration for questions
- [ ] User authentication
- [ ] Social sharing
- [ ] Sound effects
- [ ] Dark mode toggle
- [ ] Question explanations
- [ ] Multiplayer mode
- [ ] Statistics dashboard

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

Built with ❤️ using React, TypeScript, and Tailwind CSS.

### Git Workflow

This project follows a feature-branch workflow:
- `main` - Production-ready code
- Feature branches for new features
- Regular commits for each implementation step

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

**Enjoy the quiz! 🎉**
