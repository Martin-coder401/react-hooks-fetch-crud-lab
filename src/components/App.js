import React, { useEffect, useState } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  // GET: Fetch questions on load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // POST: Add a new question
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // DELETE: Remove a question
  function handleDeleteQuestion(deletedId) {
    const updatedQuestions = questions.filter(q => q.id !== deletedId);
    setQuestions(updatedQuestions);
  }

  // PATCH: Update correctIndex
  function handleUpdateCorrectIndex(updatedQuestion) {
    const updated = questions.map(q =>
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updated);
  }

  return (
    <main>
      <h1>Quiz Admin Panel</h1>
      <QuestionForm onAddQuestion={handleAddQuestion} />
      <QuestionList
        questions={questions}
        onDelete={handleDeleteQuestion}
        onUpdate={handleUpdateCorrectIndex}
      />
    </main>
  );
}

export default App;
