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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6 text-center">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Are you Ready?</CardTitle>
              </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 flex items-center p-4 xl:p-6 xl:pt-0">
                <Button onClick={onStartBattle} disabled={!allReady && countdown > 0}>
                {countdown > 0 ? `Quiz will be starting in ${countdown}s` : "Start"}
              </Button>
              </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-6 flex items-center p-4 xl:p-6 xl:pt-0">
                 <Button variant="outline" onClick={onCancel}>
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
