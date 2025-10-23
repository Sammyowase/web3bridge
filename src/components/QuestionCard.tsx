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
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md border border-indigo-100">
        <div className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${
          question.category === 'Web3' 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
        }`}>
          {question.category}
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-3 sm:p-4 md:p-5 text-left rounded-xl transition-all duration-200 font-medium shadow-sm text-sm sm:text-base ';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-emerald-500 to-green-600 border-2 border-emerald-600 text-white shadow-lg';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-gradient-to-r from-rose-500 to-red-600 border-2 border-rose-600 text-white shadow-lg';
            } else {
              buttonClass += 'bg-gray-50 border-2 border-gray-200 text-gray-400';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 border-2 border-indigo-600 text-white transform scale-[1.02] shadow-lg'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-indigo-400 hover:shadow-md hover:bg-indigo-50';
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showFeedback && isCorrect && <span className="text-2xl">✓</span>}
                {showFeedback && isSelected && !isCorrect && <span className="text-2xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={`p-3 sm:p-4 md:p-5 rounded-xl text-center font-bold text-sm sm:text-base md:text-lg shadow-md ${
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
