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
    <div>
      {/* Question Box */}
      <div className="bg-white/95 backdrop-blur-sm p-10 sm:p-12 md:p-14 lg:p-16 rounded-3xl shadow-xl mb-12 sm:mb-16">
        <div className={`inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full text-lg sm:text-xl md:text-2xl font-bold mb-6 sm:mb-8 shadow-lg ${
          question.category === 'Web3' 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
        }`}>
          {question.category}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14 mb-12">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-8 sm:p-10 md:p-12 lg:p-14 text-left rounded-3xl transition-all duration-200 font-semibold shadow-xl text-xl sm:text-2xl md:text-3xl lg:text-4xl border-4 ';
          
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
              <div className="flex items-center justify-between gap-3">
                <span className="flex-1">{option}</span>
                {showFeedback && isCorrect && <span className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">✓</span>}
                {showFeedback && isSelected && !isCorrect && <span className="text-3xl sm:text-4xl md:text-5xl flex-shrink-0">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`p-8 sm:p-10 md:p-12 rounded-3xl font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl shadow-xl ${
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
