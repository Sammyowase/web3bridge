import type { Question } from '../types/quiz';

interface QuestionCardProps {
  question: Question;
  onAnswerSelect: (answerIndex: number) => void;
  selectedAnswer: number | null;
  showFeedback: boolean;
}

const QuestionCard = ({
  question,
  onAnswerSelect,
  selectedAnswer,
  showFeedback,
}: QuestionCardProps) => {
  return (
    <div className="space-y-12">
      {/* Question Box */}
      <div className="bg-white/95 backdrop-blur-sm p-10 sm:p-12 rounded-3xl shadow-2xl">
        <div className={`inline-block px-6 py-3 rounded-full text-base font-bold mb-8 shadow-lg ${
          question.category === 'Web3' 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
        }`}>
          {question.category}
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-8 sm:p-10 text-left rounded-3xl transition-all duration-200 font-semibold shadow-2xl text-xl sm:text-2xl border-4 ';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-600 text-white';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-gradient-to-r from-rose-500 to-red-600 border-rose-600 text-white';
            } else {
              buttonClass += 'bg-white/50 backdrop-blur-sm border-white/50 text-gray-400';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-gradient-to-r from-violet-500 to-purple-600 border-violet-600 text-white transform scale-[1.02]'
              : 'bg-white/95 backdrop-blur-sm border-white/50 text-gray-800 hover:border-violet-400 hover:bg-white hover:scale-[1.01]';
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showFeedback && isCorrect && <span className="text-5xl">✓</span>}
                {showFeedback && isSelected && !isCorrect && <span className="text-5xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`p-10 rounded-3xl text-left font-bold text-2xl shadow-2xl ${
            selectedAnswer === question.correctAnswer
              ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
              : 'bg-gradient-to-r from-rose-500 to-red-600 text-white'
          }`}
        >
          {selectedAnswer === question.correctAnswer
            ? '🎉 Correct! Well done!'
            : `❌ Wrong! The correct answer was: ${question.options[question.correctAnswer]}`}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
