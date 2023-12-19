import axios from 'axios';
import { decodeHTMLEntities } from './decode';
import { shuffle } from './shuffle';

type QuizResult = {
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

type QuizData = {
  response_code: number;
  results: QuizResult[];
};

export async function fetchQuizzes() {
  return await axios
    .get<QuizData>('https://opentdb.com/api.php?amount=10&type=multiple')
    .then(res => ({
      ...res,
      data: {
        ...res.data,
        results: res.data.results.map(item => ({
          ...item,
          question: decodeHTMLEntities(item.question),
          correct_answer: decodeHTMLEntities(item.correct_answer),
          answers: shuffle(
            item.incorrect_answers
              .concat(item.correct_answer)
              .map(incorrect => decodeHTMLEntities(incorrect)),
          ),
        })),
      },
    }));
}
