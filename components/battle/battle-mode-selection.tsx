"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Globe, ListChecks, Lock, Swords, Trophy, Users, LucideLockOpen } from "lucide-react";
import { useState, useEffect } from "react";
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

  const [token, setToken] = useState<string | null | undefined>(null);
  const [isValidToken, setIsValidToken] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchParams = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const tokenFromURL = searchParams.get("token") || undefined;

  const [checkedRules, setCheckedRules] = useState<boolean[]>(Array(rules.length).fill(false));

  const allChecked = checkedRules.every(Boolean);

  const toggleRule = (index: number) => {
    const updated = [...checkedRules];
    updated[index] = !updated[index];
    setCheckedRules(updated);
  };

  useEffect(() => {
    // Check if token is available in URL
    if (tokenFromURL) {
      setToken(tokenFromURL);

      // Verify token with API
      axios
        .post("https://www.hsconsultants.net/api/admin/verify-token", { token: tokenFromURL }, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setIsValidToken(true);
          } else {
            setIsValidToken(true);
            setErrorMessage("Token is not valid. You cannot access this page!");
          }
        })
        .catch((error) => {
          setIsValidToken(true);
          setErrorMessage("An error occurred while verifying the token. Please try again later....");
        });
    } else {
      setIsValidToken(true);
      setErrorMessage("You cannot access this page without a valid token!!");
    }
  }, [tokenFromURL]);

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
      .post("https://www.hsconsultants.net/api/admin/email-rules", { token: tokenFromURL }, {
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

  if (!isValidToken) {
    return (
       <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-red-600 mb-4">{errorMessage}</h2>
         <div className="flex justify-center"><img src="https://static.vecteezy.com/system/resources/previews/019/551/975/non_2x/error-page-page-not-found-icon-in-line-style-design-isolated-on-white-background-editable-stroke-vector.jpg" alt="" width={50} height={50}/></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="1v1" className="w-full" onValueChange={(value) => setActiveTab(value as "1v1" | "group")}>
        <TabsContent value="1v1" className="space-y-6">
          <Card className="p-4 rounded-xl" >
            <CardHeader>
              <div className="mx-auto "><Clock className="h-8 w-8 text-orange-500 m-3" /> </div>
              <CardTitle className="text-center text-400">Minute to Win it Competition</CardTitle>
              <h3 className="text-center">Powered By HS Consultants (Pvt) Ltd.</h3>
            </CardHeader>
          <hr style={{border:0, backgroundColor:"orange", height:"1px"}}></hr>
         
              <CardHeader className="pb-2">
                <CardDescription className="text-center">We appreciate you for taking this challenge and wish you all the best. Before you proceed, please read the Game Rules below:</CardDescription>
              </CardHeader>
              <CardContent>
                <CardTitle className="mb-2 text-lg flex items-center gap-2">
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
                    <div className="">Best of luck!!</div>
                  </li>
                </ul>
              </CardContent>
            <CardFooter className="mb-12">
              <Button onClick={handleStartBattle} className="w-full" disabled={!allChecked} variant="warm">
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
              {/* Group Battle Settings */}
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
