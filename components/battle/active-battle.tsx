"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { useEffect, useReducer, useState } from "react";
import { BattleState } from "./battle-page";
import axios from 'axios'
const TOTAL_QUESTIONS=6;


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
   userToken?: string;
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
type GameAction = { type: "SELECT_ANSWER"; payload: number } | { type: "SUBMIT_ANSWER"; payload: {  questionId: number; answerIndex: number | null; correctAnswer: number; timeLeft: number; timePerQuestion: number;  } } | { type: "NEXT_QUESTION"; payload: { timePerQuestion: number } } | { type: "TICK_TIMER" } | { type: "UPDATE_PLAYER_RANKINGS"; payload: Player[] } | { type: "RESET_FEEDBACK" }| { type: "RESTORE_PROGRESS"; payload: { currentQuestion: number; answers: any[] } };


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
  const { answerIndex, timeLeft, timePerQuestion,questionId } = action.payload;
  // const currentQuestionId = state.currentQuestion + 1;
  const timeTaken = timePerQuestion - timeLeft;

  return {
    ...state,
    selectedAnswer: answerIndex,
    answers: [
      ...state.answers,
      { questionId, selectedAnswer: answerIndex, timeTaken },
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
      // return {
      //   ...state,
      //   currentQuestion: state.currentQuestion + 1,
      //   selectedAnswer: null,
      //   isCorrect: null,
      //   showFeedback: false,
      //   timeLeft: action.payload.timePerQuestion,
      // };

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
case "RESTORE_PROGRESS":
  return {
    ...state,
    currentQuestion: action.payload.currentQuestion || 0,
    answers: action.payload.answers || [],
  };
    default:
      return state;
  }
};

export function ActiveBattle({ battleState, onBattleComplete, questions ,userToken  }: ActiveBattleProps) {
  const [state, dispatch] = useReducer(gameReducer, battleState, createInitialState);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const qprogress = (state.timeLeft / 10) * circumference;
  useEffect(() => {
  if (!state || state.answers.length === 0) return;

  const saved = localStorage.getItem(storageKey);
  const parsed = saved ? JSON.parse(saved) : {};

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      ...parsed,
      currentQuestion: state.currentQuestion,
      answers: state.answers,
      quizCompleted: false,
    })
  );
}, [state.currentQuestion, state.answers]);
  //  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  // const userToken = searchParams.get("token") || undefined;
const storageKey = `quizProgress_${userToken || "guest"}`;
const saved = localStorage.getItem(storageKey);
const parsed = saved ? JSON.parse(saved) : null;
// const storageKey = `quizProgress_${userToken || "guest"}`;
// const saved = localStorage.getItem(storageKey);
// const parsed = saved ? JSON.parse(saved) : null;
useEffect(() => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.answers?.length > 0 && !parsed.quizCompleted) {
      dispatch({
        type: "RESTORE_PROGRESS",
        payload: {
          currentQuestion: parsed.currentQuestion || 0,
          answers: parsed.answers || [],
        },
      });
    }
  }
}, []);

  // const savedProgress = localStorage.getItem(storageKey);
  //  const parsed = savedProgress ? JSON.parse(savedProgress) : null;

  // ✅ If quiz was already completed, prevent reattempt
  if (parsed?.quizCompleted) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-green-600 mb-4">🎉 You have already submitted your quiz!</h2>
        <p className="text-gray-700">Your responses are already recorded for this token.</p>
      </div>
    );
  }
const formatAnswersForDb = (answers: any[]) => {
  const formatted: any = {};
  answers.forEach((ans, index) => {
    const i = index + 1;
    formatted[`ques_${i}`] = ans.questionId;
    formatted[`ans_${i}`] = ans.selectedAnswer;
    formatted[`time_${i}`] = ans.timeTaken;
  });
  return formatted;
};
const storeResponse = async () => {
  const payload = {
    token: userToken, // optional token
    ...formatAnswersForDb(state.answers),
  };
axios
  .post("https://www.hsconsultants.net/api/admin/save-answers", payload, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
  .then((response) => {
    console.log("Saved successfully:", response.data);
  })
  .catch((error) => {
    console.error("Error saving answers:", error.response?.data || error.message);
  });
  
  // const res = await fetch("https://www.hsconsultants.net/api/admin/save-answers", {
  //   method: "POST", // ✅ change to POST
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   },
  //   body: JSON.stringify({
  //     category_id: 1, // 👈 optional data you want to send
  //     difficulty: "easy", // example payload
  //   }),
  // });

  // const data = await res.json();
  // console.log("ques", data);
  

}

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

// useEffect(() => {
//   // Don't run until user starts answering
//   if (state.answers.length === 0) return;

//   const isCompleted = state.answers.length === TOTAL_QUESTIONS;

//   const progress = {
//     currentQuestion: state.currentQuestion,
//     answers: state.answers,
//     quizCompleted: isCompleted,
//   };

//   localStorage.setItem(storageKey, JSON.stringify(progress));
// }, [state.currentQuestion, state.answers]);


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
    const currentQ = questions[state.currentQuestion];
    const correctAnswerIndex = currentQ.options.indexOf(currentQ.correct_answer);
    
    dispatch({
      type: "SUBMIT_ANSWER",
      payload: {
        answerIndex: index,
        correctAnswer: correctAnswerIndex,
        timeLeft: state.timeLeft,
        timePerQuestion: battleState.timePerQuestion,
        questionId: currentQ.id,
      },
    });
    
    if (state.currentQuestion < questions.length - 1) {
      dispatch({
        type: "NEXT_QUESTION",
        payload: { timePerQuestion: battleState.timePerQuestion },
      });
    }
  };
  useEffect(() => {
    // if (state.answers.length === questions.length) {
    //   const totalTimeTaken = state.answers.reduce(
    //     (sum, ans) => sum + ans.timeTaken,
    //     0
    //   );
     if (state.answers.length === TOTAL_QUESTIONS) {
      const totalTimeTaken = state.answers.reduce(
        (sum, ans) => sum + ans.timeTaken,
        0
      );
  
   localStorage.setItem(
        storageKey,
        JSON.stringify({
          ...state,
          quizCompleted: true,
        })
      );
      
      console.log("✅ All answers with time taken:", state.answers);
      console.log("⏱️ Total time taken:", totalTimeTaken, "seconds");
      storeResponse();
        onBattleComplete({
        score: state.score,
        correctAnswers: 0,
        totalTimeTaken,
      });
    }
  }, [state.answers]);

  
  if (questions.length === 0) return <div>No questions found.</div>;
  const currentQ = questions[state.currentQuestion];
  const progress = (state.currentQuestion / questions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
  <div className="mb-4">
    <div className="flex items-center gap-3">
        <div className="text-xs text-white whitespace-nowrap p-1" style={{backgroundColor:"black", borderRadius:'2px'}}>
            Q{state.currentQuestion + 1} of {questions.length}
        </div>
            <Progress value={progress} className="h-2" />
          {/* <div className="flex items-center gap-1 text-xs text-black whitespace-nowrap">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="font-bold text-black">{state.timeLeft}s</span>
          </div> */}
          {/* <div className="flex items-center gap-2"> */}
            {/* <Clock className="h-4 w-4 text-orange-500" /> */}
            {/* <span className="font-bold text-black">{state.timeLeft}s</span> */}
          {/* </div> */}
      </div>
      </div>

      {/* {battleState.mode === "group" && (
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
      )} */}

        <div className="relative max-w-sm mx-auto mt-10">
      {/* Timer circle */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <div className="relative w-16 h-16 rounded-full bg-black flex items-center justify-center text-white font-bold">
          <svg className="absolute inset-0" viewBox="0 0 36 36">
             <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="#1e1e1e"
          strokeWidth="3"
          fill="none"
        />

        {/* Progress circle */}
        <circle
          cx="18"
          cy="18"
          r={radius}
          stroke="orange"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - qprogress}
          strokeLinecap="round"
          className="transition-all duration-300 ease-linear"
        />
          </svg>
           <div className="flex items-center gap-1 text-xs text-black whitespace-nowrap">
            {/* <Clock className="h-4 w-4 text-orange-500" /> */}
            <span className="font-bold text-white">{state.timeLeft}s</span>
          </div>
        </div>
      </div>
      </div>
      <Card className="mb-6">
        <CardContent className="pt-6" >
          <div className="text-center m-4">Question 0{state.currentQuestion + 1}</div>
            <div className="text-center">
         <div className="text-xl font-bold mb-6">{currentQ.text}</div>
            </div>
        </CardContent>
      </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ">

            {currentQ.options.map((option: string, index: number) => (
              <Button
              
              key={index}
              variant={state.selectedAnswer === index ? "warmoutline" : "outline"}
              onClick={() => handleAnswerSelect(index)}
              >
                    <div className="flex items-center w-full">
                      <div className="mr-3 h-6 w-6  rounded-full border flex items-center justify-center">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                    </div>
                  </Button>
                ))}
          </div>

      <div className="text-center m-4" >
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

        <Button variant="warm" onClick={() => handleAnswerSubmit(state.selectedAnswer)} disabled={state.selectedAnswer === null || state.showFeedback}>
          Submit Answer
        </Button>
      </div>


    
    </div>
  );
}