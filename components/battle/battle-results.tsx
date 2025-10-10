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
          <Card>
            <CardHeader>
              <CardTitle>Thank you for participating!</CardTitle>
              <CardDescription>{battleState.mode === "1v1" ? "Your submission has been successfully recorded. Results will be announced shortly via your registered email address." : `All ${battleState.players.length} players ranked by score`}</CardDescription>
            </CardHeader>
            <CardContent>
              
            </CardContent>
           
          </Card>
        </div>

        
      </div>
    </div>
  );
}
