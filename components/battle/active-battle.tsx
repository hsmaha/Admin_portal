"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { BattleState } from "./battle-page";

interface ActiveBattleProps {
  battleState: BattleState;
  onBattleComplete: ({
    score,
    correctAnswers,
    totalTimeTaken,
  }: {
    score: number;
    correctAnswers: number;
    totalTimeTaken: number;
  }) => void;
  questions: any[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correct_answer: string;
}

interface Player {
  id: string;
  name: string;
  avatar?: string;
  score: number;
  streak: number;
  isCurrentUser: boolean;
}

// State interface
interface GameState {
  currentQuestion: number;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  timeLeft: number;
  score: number;
  streak: number;
  showFeedback: boolean;
  playerRankings: Player[];
  answers: { questionId: number; selectedAnswer: number | null; timeTaken: number }[];
}

// Action types
type GameAction = { type: "SELECT_ANSWER"; payload: number } | { type: "SUBMIT_ANSWER"; payload: { answerIndex: number | null; correctAnswer: number; timeLeft: number; timePerQuestion: number;  } } | { type: "NEXT_QUESTION"; payload: { timePerQuestion: number } } | { type: "TICK_TIMER" } | { type: "UPDATE_PLAYER_RANKINGS"; payload: Player[] } | { type: "RESET_FEEDBACK" };

// Initial state
const createInitialState = (battleState: BattleState): GameState => ({
  currentQuestion: 0,
  selectedAnswer: null,
  isCorrect: null,
  timeLeft: battleState.timePerQuestion,
  score: 0,
  streak: 0,
  showFeedback: false,
  playerRankings: battleState.players,
  answers: [],
  
});

// Reducer function
const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "SELECT_ANSWER":
      if (state.showFeedback) return state;
      return {
        ...state,
        selectedAnswer: action.payload,
      };

   case "SUBMIT_ANSWER": {
  const { answerIndex, timeLeft, timePerQuestion } = action.payload;
  const currentQuestionId = state.currentQuestion + 1;
  const timeTaken = timePerQuestion - timeLeft;

  return {
    ...state,
    selectedAnswer: answerIndex,
    answers: [
      ...state.answers,
      { questionId: currentQuestionId, selectedAnswer: answerIndex, timeTaken },
    ],
  };
}

    case "NEXT_QUESTION":
      return {
        ...state,
        currentQuestion: state.currentQuestion + 1,
        selectedAnswer: null,
        isCorrect: null,
        showFeedback: false,
        timeLeft: action.payload.timePerQuestion,
      };

    case "TICK_TIMER":
      return {
        ...state,
        timeLeft: Math.max(0, state.timeLeft - 1),
      };

    case "UPDATE_PLAYER_RANKINGS":
      return {
        ...state,
        playerRankings: action.payload,
      };

    case "RESET_FEEDBACK":
      return {
        ...state,
        selectedAnswer: null,
        isCorrect: null,
        showFeedback: false,
      };

    default:
      return state;
  }
};

export function ActiveBattle({ battleState, onBattleComplete, questions }: ActiveBattleProps) {
  const [state, dispatch] = useReducer(gameReducer, battleState, createInitialState);


// const [questions, setQuestions] = useState<Question[]>([]);
// const [isLoading, setIsLoading] = useState(true);
// const [error, setError] = useState<string | null>(null);

// useEffect(() => {
//   const fetchQuestions = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/get-question"); 
//       const data = await response.json();
//       setQuestions(data.data); 
//     } catch (err) {
//       console.error("Error fetching questions:", err);
//       setError("Failed to load questions");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   fetchQuestions();
// }, []);

  // Timer effect
  useEffect(() => {
    if (state.timeLeft > 0 && !state.showFeedback) {
      const timer = setTimeout(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);
      return () => clearTimeout(timer);
    } else if (state.timeLeft === 0 && !state.showFeedback) {
      handleAnswerSubmit(null);
    }
  }, [state.timeLeft, state.showFeedback]);

  // Simulate other players' progress
  useEffect(() => {
    const interval = setInterval(() => {
      const updatedRankings = state.playerRankings
        .map((player) => {
          if (!player.isCurrentUser) {
            return {
              ...player,
              score: player.score + Math.floor(Math.random() * 50),
            };
          }
          return player;
        })
        .sort((a, b) => b.score - a.score);

      dispatch({ type: "UPDATE_PLAYER_RANKINGS", payload: updatedRankings });
    }, 3000);

    return () => clearInterval(interval);
  }, [state.playerRankings]);

useEffect(() => {
  if (state.answers.length === questions.length) {
    const totalTimeTaken = state.answers.reduce(
      (sum, ans) => sum + ans.timeTaken,
      0
    );

    console.log("✅ All answers with time taken:", state.answers);
    console.log("⏱️ Total time taken:", totalTimeTaken, "seconds");

    onBattleComplete({
      score: state.score,
      correctAnswers: 0,
      totalTimeTaken,
    });
  }
}, [state.answers]);

  const handleAnswerSelect = (index: number) => {
    dispatch({ type: "SELECT_ANSWER", payload: index });
  };

const handleAnswerSubmit = (index: number | null) => {
  const currentQ = questions[state.currentQuestion];
  const correctAnswerIndex = currentQ.options.indexOf(currentQ.correct_answer);

  dispatch({
    type: "SUBMIT_ANSWER",
    payload: {
      answerIndex: index,
      correctAnswer: correctAnswerIndex,
      timeLeft: state.timeLeft,
      timePerQuestion: battleState.timePerQuestion,
    },
  });

  if (state.currentQuestion < questions.length - 1) {
    dispatch({
      type: "NEXT_QUESTION",
      payload: { timePerQuestion: battleState.timePerQuestion },
    });
  }
};

  
  if (questions.length === 0) return <div>No questions found.</div>;
  const currentQ = questions[state.currentQuestion];
  const progress = (state.currentQuestion / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">
            Question {state.currentQuestion + 1} of {questions.length}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="font-bold">{state.timeLeft}s</span>
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {battleState.mode === "group" && (
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-2">Live Rankings</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {state.playerRankings.slice(0, 5).map((player, index) => (
              <div key={player.id} className={`flex flex-col items-center p-2 rounded-lg border ${player.isCurrentUser ? "border-primary bg-primary/5" : "border-border"}`}>
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                    <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">{index + 1}</div>
                </div>
                <div className="mt-1 text-xs font-medium truncate w-full text-center">{player.name}</div>
                <div className="text-xs text-muted-foreground">{player.score} pts</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Card className="mb-6">
        <CardContent className="pt-6">
         <div className="text-xl font-bold mb-6">{currentQ.text}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((option: string, index: number) => (
                  <Button
                    key={index}
                    variant={state.selectedAnswer === index ? "default" : "outline"}
                    onClick={() => handleAnswerSelect(index)}
                  >
                    <div className="flex items-center w-full">
                      <div className="mr-3 h-6 w-6 rounded-full border flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* <div>
            <div className="text-sm text-muted-foreground">Score</div>
            <div className="font-bold text-xl">{state.score}</div>
          </div>
          {state.streak > 1 && (
            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
              {state.streak}x Streak!
            </Badge>
          )} */}
        </div>

        <Button onClick={() => handleAnswerSubmit(state.selectedAnswer)} disabled={state.selectedAnswer === null || state.showFeedback}>
          Submit Answer
        </Button>
      </div>

    
    </div>
  );
}
