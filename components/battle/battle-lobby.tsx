"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Copy, ListChecks, Trophy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BattleState } from "./battle-page";

interface BattleLobbyProps {
  battleState: BattleState;
  onStartBattle: () => void;
  onCancel: () => void;
}

export function BattleLobby({ battleState, onStartBattle, onCancel }: BattleLobbyProps) {
  const [countdown, setCountdown] = useState(15);
  const [copied, setCopied] = useState(false);
  const [allReady, setAllReady] = useState(false);

  // Simulate players joining and getting ready
  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    // Simulate players getting ready
    const readyTimeout = setTimeout(() => {
      setAllReady(true);
    }, 5000);

    return () => clearTimeout(readyTimeout);
  }, []);

  const copyRoomCode = () => {
    if (battleState.roomCode) {
      navigator.clipboard.writeText(battleState.roomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
 const radius = 16;
  const circumference = 2 * Math.PI * radius;

  const qprogress = (countdown / 15) * circumference;
  return (
    <div className="max-w-4xl m-12">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center ">
        <div className="md:col-span-2 ">
          <Card className="p-6 m-auto">
            <CardHeader>
              <CardTitle className="mt-12">Are you Ready?!</CardTitle>
              </CardHeader>
            <CardContent>
              {countdown > 0 ? (<div>
                <div className="relative w-20 h-20 rounded-full bg-black flex items-center justify-center text-white font-bold mx-auto">
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
                    <span className="font-bold text-white">{countdown}s</span>
                  </div>
                </div>
              </div>):""}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 flex items-center p-4 xl:p-6 xl:pt-0">
                {allReady || countdown == 0 ? (<Button onClick={onStartBattle}  variant="warm" >
                Start
              </Button>): ""}
              {/* <Button onClick={onStartBattle} disabled={!allReady && countdown > 0} variant="warm" v-if={!allReady && countdown > 0}>
                {countdown > 0 ? `Quiz will be starting in....` : "Start"}
              </Button> */}
              </div>
                <div>{!allReady && countdown > 0 ? `Quiz will be starting in....`: ""}</div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 flex items-center p-4 xl:p-6 xl:pt-0">
                 <Button variant="secondary" onClick={onCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
             
              
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
        
         
        </div>
      </div>

      
    </div>
  );
}
