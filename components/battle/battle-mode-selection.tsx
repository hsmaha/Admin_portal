"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Globe, ListChecks, Lock, Swords, Trophy, Users } from "lucide-react";
import { useState } from "react";
import { BattleState } from "./battle-page";

import axios from "axios";

import { Checkbox } from "@/components/ui/checkbox";

const rules = [
  "One entry per person",
  "Answer all 5 questions within 60 seconds",
  "Winner will be the one who answers correctly and that too the fastest among you all",
  "Make sure you are ready as there are NO SECOND CHANCES",
  "Do not forget to tag 3 of your friends on the main quiz announcement post on our Instagram and ask them to follow us back",
];

interface BattleModeSelectionProps {
  onModeSelect: (mode: "1v1" | "group", type: "public" | "private", settings: Partial<BattleState>) => void;
}

export function BattleModeSelection({ onModeSelect }: BattleModeSelectionProps) {
  const [activeTab, setActiveTab] = useState<"1v1" | "group">("1v1");
  const [battleType, setBattleType] = useState<"public" | "private">("public");
  const [category, setCategory] = useState<string>("random");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [timePerQuestion, setTimePerQuestion] = useState<number>(10);
  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [roomCode, setRoomCode] = useState<string>("");


  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const tokenfromURL = searchParams.get("token") || undefined;

  const [checkedRules, setCheckedRules] = useState<boolean[]>(Array(rules.length).fill(false));

  const allChecked = checkedRules.every(Boolean);

  const toggleRule = (index: number) => {
    const updated = [...checkedRules];
    updated[index] = !updated[index];
    setCheckedRules(updated);
  };
const handleStartBattle = () => {
    if (!allChecked) return;

    onModeSelect(activeTab, battleType, {
      category: category !== "random" ? category : undefined,
      difficulty,
      timePerQuestion,
      totalQuestions,
      roomCode: battleType === "private" ? roomCode : undefined,
    });
    axios
  .post("https://www.hsconsultants.net/api/admin/email-rules", tokenfromURL, {
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
  };

  // const handleStartBattle = () => {
    
  //   onModeSelect(activeTab, battleType, {
  //     category: category !== "random" ? category : undefined,
  //     difficulty,
  //     timePerQuestion,
  //     totalQuestions,
  //     roomCode: battleType === "private" ? roomCode : undefined,
  //   });
  // };

  return (
    <div className="max-w-4xl mx-auto">
      

      <Tabs defaultValue="1v1" className="w-full" onValueChange={(value) => setActiveTab(value as "1v1" | "group")}>
       

        <TabsContent value="1v1" className="space-y-6">
          <Card className="p-4">
            <CardHeader>
              <h3 className="text-center">Welcome to the </h3>
           
            <CardTitle className="text-center text-blue-400">Minute to Win it Competition 
            </CardTitle>
             <h3 className="text-center">Powered By HS Consultants (Pvt) Ltd.
            </h3>
            
              {/* <CardDescription className="text-center">We appreciate you for taking this challenge and wish you all the best. Before your proceed please read the Game Rules below:</CardDescription> */}
            </CardHeader>

             <Card>
          <CardHeader className="pb-2">
              <CardDescription className="text-center">We appreciate you for taking this challenge and wish you all the best. Before your proceed please read the Game Rules below:</CardDescription>
          </CardHeader>
          <CardContent>
            <CardTitle className="mb-2 text-lg flex items-center gap-2">
              
              <Clock className="h-5 w-5 text-blue-500" />
               Rules
            </CardTitle>
            <ul className="space-y-2 text-sm">
                  {rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Checkbox
                        id={`rule-${index}`}
                        checked={checkedRules[index]}
                        onCheckedChange={() => toggleRule(index)}
                      />
                      <label htmlFor={`rule-${index}`} className="cursor-pointer select-none">
                        {rule}
                      </label>
                    </li>
                  ))}
                   <li className="text-center gap-2">
                <div className="">Best of luck!!</div>
              </li>
                </ul>
            {/* <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>One entry per person</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Answer all 5 questions within 60 seconds</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Winner will be the one who answers correctly and that too the fastest among you all</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Make sure you are ready as there are NO SECOND CHANCES</span>
              </li>
               <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Do not forget to tag 3 of your friends on the main quiz announcement post on our Instagram and ask them to follow us back</span>
              </li>
               <li className="text-center gap-2">
                <div className="m-4">Best of luck!!</div>
              </li>
             
            </ul> */}
          </CardContent>
        </Card>
            <CardFooter>
              <Button onClick={handleStartBattle} className="w-full" disabled={!allChecked}>
                {allChecked ? "Start Quiz" : "Please check all rules to start"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="group" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Group Battle</CardTitle>
              <CardDescription>Create or join a group battle with 3-10 players competing simultaneously.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="battle-type-group">Battle Type</Label>
                  
                </div>

                {battleType === "private" && (
                  <div className="space-y-2">
                    <Label htmlFor="room-code-group">Room Code</Label>
                    <Input id="room-code-group" placeholder="Enter or generate room code" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="category-group">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category-group">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="random">Random</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="geography">Geography</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="sports">Sports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty-group">Difficulty</Label>
                  <Select value={difficulty} onValueChange={(value) => setDifficulty(value as "easy" | "medium" | "hard")}>
                    <SelectTrigger id="difficulty-group">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-per-question-group">Time Per Question (seconds)</Label>
                  <Select value={timePerQuestion.toString()} onValueChange={(value) => setTimePerQuestion(Number.parseInt(value))}>
                    <SelectTrigger id="time-per-question-group">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="15">15 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total-questions-group">Number of Questions</Label>
                  <Select value={totalQuestions.toString()} onValueChange={(value) => setTotalQuestions(Number.parseInt(value))}>
                    <SelectTrigger id="total-questions-group">
                      <SelectValue placeholder="Select number" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 questions</SelectItem>
                      <SelectItem value="10">10 questions</SelectItem>
                      <SelectItem value="15">15 questions</SelectItem>
                      <SelectItem value="20">20 questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartBattle} className="w-full">
                Start Group Battle
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      
    </div>
  );
}
