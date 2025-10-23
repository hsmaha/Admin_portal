"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import confetti from "canvas-confetti";
import { Award, CheckCircle, Clock, Home, RotateCw, Share2, Trophy } from "lucide-react";
import { useEffect } from "react";
import type { BattleState } from "./battle-page";

interface BattleResultsProps {
  battleState: BattleState;
  onRematch: () => void;
  onReturnHome: () => void;
}

export function BattleResults({ battleState, onRematch, onReturnHome }: BattleResultsProps) {
  const sortedPlayers = [...battleState.players].sort((a, b) => b.score - a.score);
  const currentPlayer = sortedPlayers.find((player) => player.isCurrentUser);
  const currentPlayerRank = sortedPlayers.findIndex((player) => player.isCurrentUser) + 1;
  const isWinner = currentPlayerRank === 1;

  // Find podium players (top 3)
  const podiumPlayers = sortedPlayers.slice(0, 3);
  useEffect(() => {
    if (currentPlayer?.score && currentPlayer?.score >= 70) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [currentPlayer?.score]);
  return (
    <div className="max-w-4xl mx-auto">
      

      {battleState.mode === "group" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Podium</h2>
          <div className="flex justify-center items-end h-48 gap-4">
            {podiumPlayers.map((player, index) => {
              const podiumHeight = index === 1 ? "h-40" : index === 0 ? "h-48" : "h-32";
              const position = index === 1 ? 2 : index === 0 ? 1 : 3;

              return ( 
                <div key={player.id} className="flex flex-col items-center">
                  <div className="mb-2">
                    <Avatar className="h-16 w-16 border-4 border-background shadow-lg">
                      <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                      <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="text-center mb-2">
                    <div className="font-bold">{player.name}</div>
                    <div className="text-sm text-muted-foreground">{player.score} pts</div>
                  </div>
                  <div className={`${podiumHeight} w-24 rounded-t-lg bg-primary/90 flex items-center justify-center relative`}>
                    <span className="text-2xl font-bold text-primary-foreground">#{position}</span>
                    {player.isCurrentUser && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-yellow-500">You</Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center">
        <div className="md:col-span-2">
          <div className="flex flex-col items-center justify-center text-center p-4 bg-[#0b0b16] text-white shadow-lg rounded-xl border border-gray-800 max-w mx-auto">
    <div className="mb-4 mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-purple-400 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4m6 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z" />
      </svg>
    </div>
    <h2 className="text-2xl font-semibold text-purple-400 mb-12">
      Thank you for participating!
    </h2>
    
      <p className="text-gray-300 mb-6 mr-4 ml-4 max-w">Your submission has been successfully recorded. Do not forget to <span className="text-orange-300">Tag 3 of your friends</span> on the main quiz announcement post on our Instagram and ask them to follow us back. Results will be announced shortly via your registered email address, so please keep an eye on your inbox!
    </p>
    {/* <button
      disabled
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg opacity-80 cursor-not-allowed"
      >
      Response Recorded
      </button> */}
  </div>
          {/* <Card>
            <CardHeader>
              <CardTitle>Thank you for participating!</CardTitle>
              <CardDescription>{battleState.mode === "1v1" ? "Your submission has been successfully recorded. Results will be announced shortly via your registered email address." : `All ${battleState.players.length} players ranked by score`}</CardDescription>
            </CardHeader>
            <CardContent>
              
            </CardContent>
           
          </Card> */}
        </div>

        
      </div>
    </div>
  );
}
