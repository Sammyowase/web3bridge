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
      <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border-2 border-purple-200">
        <div className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3 ${
          question.category === 'Web3' 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' 
            : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
        }`}>
          {question.category}
        </div>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="space-y-2 sm:space-y-3 md:space-y-4">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-3 sm:p-4 md:p-5 text-left rounded-xl sm:rounded-2xl border-2 sm:border-3 transition-all duration-300 font-semibold shadow-md text-sm sm:text-base ';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-600 text-white shadow-lg shadow-green-300';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-gradient-to-r from-red-400 to-pink-500 border-red-600 text-white shadow-lg shadow-red-300';
            } else {
              buttonClass += 'bg-gray-100 border-gray-300 text-gray-500';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-purple-600 text-white transform scale-105 shadow-xl shadow-purple-300'
              : 'bg-gradient-to-r from-white to-gray-50 border-purple-300 text-gray-800 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-200 hover:scale-102';
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
          className={`p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl text-center font-bold text-sm sm:text-base md:text-lg shadow-lg ${
            selectedAnswer === question.correctAnswer
              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-300'
              : 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-red-300'
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
