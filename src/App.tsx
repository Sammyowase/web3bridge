import QuizGame from './components/QuizGame'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <ErrorBoundary>
      <QuizGame />
    </ErrorBoundary>
  )
}

export default App
