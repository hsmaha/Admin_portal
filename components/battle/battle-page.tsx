"use client";

import { useState,useEffect } from "react";
import { ActiveBattle } from "./active-battle";
import { BattleLobby } from "./battle-lobby";
import { BattleModeSelection } from "./battle-mode-selection";
import { BattleResults } from "./battle-results";

type BattleStage = "selection" | "lobby" | "active" | "results" | "already-completed";
type BattleMode = "1v1" | "group";
type BattleType = "public" | "private";

export interface BattleState {
  mode: BattleMode;
  type: BattleType;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
  timePerQuestion: number;
  totalQuestions: number;
  roomCode?: string;
  players: Player[];
  currentPlayerIndex: number;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank?: number;
  isReady: boolean;
  isCurrentUser: boolean;
  timeElapsed: number;
  correctAnswers: number;
  streak: number;
}

export function BattlePage() {
  
  const [questions, setQuestions] = useState([]);
  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const tokenfromURL = searchParams.get("token") || undefined;
  // const userToken = searchParams.get("token") || "guest";
  const storageKey = `quizProgress_${tokenfromURL || "guest"}`;
  let initialStage: BattleStage = "selection";
try {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.answers?.length > 0) {
      initialStage = "active"; // user was mid-quiz
    }
  }
} catch (e) {
  console.warn("Could not parse saved progress", e);
}
  // const [stage, setStage] = useState<BattleStage>("selection");
  const [stage, setStage] = useState<BattleStage>(initialStage);


useEffect(() => {
  const saved = localStorage.getItem(storageKey);
  if (saved) {
    const parsed = JSON.parse(saved);
    if (parsed.quizCompleted) {
      // ✅ Mark as already completed
      setStage("already-completed");
    }else if (initialStage === "active") {
      if (parsed.questions) {
        setQuestions(parsed.questions);
      }
    }
  }
}, []);
  const [battleState, setBattleState] = useState<BattleState>({
    mode: "1v1",
    type: "public",
    timePerQuestion: 10,
    totalQuestions: 5,
    players: [],
    currentPlayerIndex: 0,
  });

  // Mock players for demonstration
  const mockPlayers: Player[] = [
    {
      id: "1",
      name: "You",
      avatar: "/avatars/wizard.webp",
      score: 0,
      isReady: true,
      isCurrentUser: true,
      timeElapsed: 0,
      correctAnswers: 0,
      streak: 0,
    },
    {
      id: "2",
      name: "QuizMaster",
      avatar: "/avatars/master.png",
      score: 0,
      isReady: false,
      isCurrentUser: false,
      timeElapsed: 0,
      correctAnswers: 0,
      streak: 0,
    },
  ];

  const mockGroupPlayers: Player[] = [
    ...mockPlayers,
    {
      id: "3",
      name: "BrainGenius",
      avatar: "/avatars/genious.png",
      score: 0,
      isReady: false,
      isCurrentUser: false,
      timeElapsed: 0,
      correctAnswers: 0,
      streak: 0,
    },
    {
      id: "4",
      name: "QuizGuru",
      avatar: "/avatars/guru.png",
      score: 0,
      isReady: false,
      isCurrentUser: false,
      timeElapsed: 0,
      correctAnswers: 0,
      streak: 0,
    },
    {
      id: "5",
      name: "MindChamp",
      avatar: "/avatars/champion.png",
      score: 0,
      isReady: false,
      isCurrentUser: false,
      timeElapsed: 0,
      correctAnswers: 0,
      streak: 0,
    },
  ];

  const handleModeSelect = (mode: BattleMode, type: BattleType, settings: Partial<BattleState>) => {
    setBattleState({
      ...battleState,
      ...settings,
      mode,
      type,
      players: mode === "1v1" ? mockPlayers : mockGroupPlayers,
    });
    setStage("lobby");
  };

  // const handleStartBattle = () => {
    // setStage("active"); http://127.0.0.1:8000 
    const handleStartBattle = async () => {
      
  try {
    
    const res = await fetch("https://www.hsconsultants.net/api/admin/get-quiz");
    const data = await res.json();
    console.log("ques",data);
    
     if (data && Array.isArray(data.data) && data.data.length > 0) {
      setQuestions(data.data);  
      setStage("active");  
       
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          questions: data.data,
          currentQuestion: 0,
          answers: [],
          quizCompleted: false,
        })
      );
      
    } else {
      alert("Could not load quiz questions. Please try again.");
    }
   
  } catch (error) {
    console.error("Error fetching questions:", error);
    alert("Network error while fetching quiz questions.");
  }
};
  // };

  const handleBattleComplete = () => {
    // Update battle state with results
    setBattleState((prev) => ({
      ...prev,
      players: prev.players.map((player, index) => ({
        ...player,
        score: Math.floor(Math.random() * 1000),
        correctAnswers: Math.floor(Math.random() * 10),
        timeElapsed: Math.floor(Math.random() * 60),
        rank: index + 1,
      })),
    }));
    setStage("results");
  };

  const handleRematch = () => {
    setBattleState((prev) => ({
      ...prev,
      players: prev.players.map((player) => ({
        ...player,
        score: 0,
        correctAnswers: 0,
        timeElapsed: 0,
        streak: 0,
      })),
    }));
    setStage("lobby");
  };

  const handleReturnHome = () => {
    setStage("selection");
  };

  return (
    
    <div className="container mx-auto">
      {stage === "already-completed" && (
  <div className="text-center p-10">
    <h2 className="text-2xl font-bold text-green-600 mb-4">
      🎉 You have already submitted your quiz!
    </h2>
    <p className="text-gray-700">Your quiz responses are safely recorded and cannot be changed.</p>
  </div>
)}
      {stage === "selection" && <BattleModeSelection onModeSelect={handleModeSelect} />}

      {stage === "lobby" && <BattleLobby battleState={battleState} onStartBattle={handleStartBattle} onCancel={handleReturnHome} />}

      {stage === "active" && <ActiveBattle battleState={battleState} onBattleComplete={handleBattleComplete} questions={questions} userToken={tokenfromURL}/>}
      

      {stage === "results" && <BattleResults battleState={battleState} onRematch={handleRematch} onReturnHome={handleReturnHome} />}
  </div>
  );
}
