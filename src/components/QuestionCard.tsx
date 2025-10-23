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
    <div className="space-y-8">
      {/* Question Box */}
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 p-8 rounded-3xl shadow-md border-2 border-violet-100">
        <div className={`inline-block px-5 py-2 rounded-full text-sm font-bold mb-5 shadow-md ${
          question.category === 'Web3' 
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
            : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white'
        }`}>
          {question.category}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed">
          {question.question}
        </h2>
      </div>

      {/* Options */}
      <div className="space-y-5">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-6 text-left rounded-2xl transition-all duration-200 font-semibold shadow-md text-lg border-3 ';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-600 text-white shadow-xl';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-gradient-to-r from-rose-500 to-red-600 border-rose-600 text-white shadow-xl';
            } else {
              buttonClass += 'bg-gray-100 border-gray-200 text-gray-400';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-gradient-to-r from-violet-500 to-purple-600 border-violet-600 text-white transform scale-[1.02] shadow-xl'
              : 'bg-white border-gray-300 text-gray-700 hover:border-violet-400 hover:shadow-lg hover:bg-violet-50 hover:scale-[1.01]';
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
                {showFeedback && isCorrect && <span className="text-3xl">✓</span>}
                {showFeedback && isSelected && !isCorrect && <span className="text-3xl">✗</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div
          className={`p-6 rounded-2xl text-center font-bold text-xl shadow-lg ${
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
