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
  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-col h-full">
      {/* Question Box - Redesigned */}
      <div className="relative bg-gradient-to-br from-white via-purple-50 to-pink-50 p-5 sm:p-6 md:p-7 rounded-2xl shadow-2xl mb-3 sm:mb-5 border-3 border-white/50 overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-black mb-3 sm:mb-4 shadow-xl border-2 ${question.category === 'Web3'
            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300'
            : 'bg-gradient-to-r from-orange-500 to-amber-600 text-white border-orange-300'
            }`}>
            <span className="text-lg sm:text-xl">{question.category === 'Web3' ? '🌐' : '💻'}</span>
            {question.category}
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 leading-relaxed">
            {question.question}
          </h2>
        </div>
      </div>

      {/* Options - Redesigned */}
      <div className="flex-1 flex flex-col justify-center space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8 mb-6 sm:mb-8">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === question.correctAnswer;

          let buttonClass = 'group relative w-full p-4 sm:p-5 md:p-6 text-left rounded-2xl transition-all duration-300 font-bold shadow-2xl text-base sm:text-lg md:text-xl border-3 overflow-hidden ';

          if (showFeedback) {
            if (isCorrect) {
              buttonClass += 'bg-gradient-to-r from-emerald-500 to-green-600 border-emerald-400 text-white shadow-emerald-500/50 scale-105';
            } else if (isSelected && !isCorrect) {
              buttonClass += 'bg-gradient-to-r from-rose-500 to-red-600 border-rose-400 text-white shadow-rose-500/50 scale-95';
            } else {
              buttonClass += 'bg-gradient-to-r from-gray-300 to-gray-400 border-gray-300 text-gray-500 opacity-50';
            }
          } else {
            buttonClass += isSelected
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 text-white shadow-purple-500/50 transform scale-105'
              : 'bg-gradient-to-br from-white to-purple-50 border-purple-200 text-gray-800 hover:border-purple-400 hover:shadow-purple-300/50 hover:scale-102 hover:-translate-y-1';
          }

          return (
            <button
              key={index}
              onClick={() => onAnswerSelect(index)}
              disabled={showFeedback}
              className={buttonClass}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-center gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center font-black text-lg sm:text-xl md:text-2xl shadow-lg ${showFeedback
                  ? isCorrect
                    ? 'bg-white/30 text-white'
                    : isSelected
                      ? 'bg-white/30 text-white'
                      : 'bg-white/20 text-gray-400'
                  : isSelected
                    ? 'bg-white/30 text-white'
                    : 'bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600'
                  }`}>
                  {optionLetters[index]}
                </div>
                <span className="flex-1 leading-snug">{option}</span>
                {showFeedback && isCorrect && (
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">✓</span>
                  </div>
                )}
                {showFeedback && isSelected && !isCorrect && (
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">✗</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback - Redesigned */}
      {showFeedback && (
        <div
          className={`relative p-4 sm:p-5 md:p-6 rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-2xl border-3 overflow-hidden ${selectedAnswer === question.correctAnswer
            ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white border-emerald-300 shadow-emerald-500/50'
            : 'bg-gradient-to-r from-rose-500 to-red-600 text-white border-rose-300 shadow-rose-500/50'
            }`}
        >
          <div className="absolute top-0 right-0 text-5xl sm:text-6xl md:text-7xl opacity-10">
            {selectedAnswer === question.correctAnswer ? '🎉' : '💭'}
          </div>
          <div className="relative z-10 flex items-center gap-2 sm:gap-3">
            <span className="text-3xl sm:text-4xl">
              {selectedAnswer === question.correctAnswer ? '🎉' : '❌'}
            </span>
            <div>
              {selectedAnswer === question.correctAnswer
                ? 'Correct! Well done!'
                : (
                  <>
                    <div className="mb-1">Wrong!</div>
                    <div className="text-sm sm:text-base md:text-lg font-semibold opacity-90">
                      Correct answer: {question.options[question.correctAnswer]}
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
