"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useReducer } from "react";
import { BattleState } from "./battle-page";

interface ActiveBattleProps {
  battleState: BattleState;
  onBattleComplete: ({ score, correctAnswers }: { score: number; correctAnswers: number }) => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
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

export function ActiveBattle({ battleState, onBattleComplete }: ActiveBattleProps) {
  const [state, dispatch] = useReducer(gameReducer, battleState, createInitialState);

  // Mock questions
  const questions: Question[] = [
    {
      id: 1,
      text: "What is the capital city of Australia?",
      options: ["London", "Canberra", "Paris", "Madrid"],
      
    },
    {
      id: 2,
      text: "In which country is the tallest twin tower ‘Petronas’ located? ",
      options: ["Malaysia", "Dubai", "Berlin", "Australia"],
      
    },
    {
      id: 3,
      text: "In which state are both Harvard University and MIT located?",
      options: ["Massachusetts", "Wellington", "Yale University", "Ontario"],
      
    },
    {
      id: 4,
      text: "What is the capital city of New Zealand?",
      options: ["Ontario", "Canberra", "Wellington", "Brazil"],
      
    },
    {
      id: 5,
      text: "Which famous US university is located in New Haven, Connecticut?",
      options: ["Yale University", "Deakin University", "Wollongong University", "Curtin University"],
      
    },
    {
      id: 6,
      text: "What is the currency of Malaysia called?",
      options: ["Malaysian Ringgit", "Statue of Liberty", "Irish", "One World Trade Center"],
      
    },
   
  ];

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

  const handleAnswerSelect = (index: number) => {
    dispatch({ type: "SELECT_ANSWER", payload: index });
  };

const handleAnswerSubmit = (index: number | null) => {
  dispatch({ type: "SUBMIT_ANSWER", payload: { answerIndex: index, correctAnswer: 0, timeLeft: 0, timePerQuestion: battleState.timePerQuestion} });

  if (state.currentQuestion < questions.length - 1) {
    dispatch({
      type: "NEXT_QUESTION",
      payload: { timePerQuestion: battleState.timePerQuestion },
    });
  } else {
    console.log("All answers with time taken:", state.answers);
    onBattleComplete({
      score: state.score,
      correctAnswers: 0,
    });
  }
};

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
            {currentQ.options.map((option, index) => (
              <Button key={index} variant={state.selectedAnswer === index ? "default" : "outline"}  onClick={() => handleAnswerSelect(index)}>
                <div className="flex items-center w-full">
                  <div className="mr-3 h-6 w-6 rounded-full border flex items-center justify-center">{String.fromCharCode(65 + index)}</div>
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
