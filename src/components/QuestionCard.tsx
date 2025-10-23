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
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-xl">
        <div className="text-sm font-semibold text-purple-600 mb-2">
          {question.category}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;
          
          let buttonClass = 'w-full p-4 text-left rounded-xl border-2 transition-all duration-300 ';
          
          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-green-100 border-green-500 text-green-800';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-red-100 border-red-500 text-red-800';
            } else {
              buttonClass += 'bg-gray-100 border-gray-300 text-gray-600';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-blue-100 border-blue-500 text-blue-800 transform scale-105'
              : 'bg-white border-gray-300 text-gray-800 hover:border-blue-400 hover:bg-blue-50';
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
          className={`p-4 rounded-xl text-center font-semibold ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
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
