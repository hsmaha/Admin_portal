"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { mockQuizzes } from "@/data/mock-quizzes";
import { Quiz } from "@/types/quiz";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { QuizEditor } from "./quiz-editor";

// Mock quiz data array with 20 quizzes

export function QuizGenerator() {
  const [fullname, setfullname] = useState("");
  const [instaacc, setinstaacc] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  const [lasteducation, setlasteducation] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [generatedQuizzes, setGeneratedQuizzes] = useState<Quiz[]>([]);

  const handleGenerate = () => {
    if (!fullname) return;

    setIsGenerating(true);

    // Simulate API call with timeout
    setTimeout(() => {
    //   // Select 5 random quizzes from the mockQuizzes array
    //   const shuffled = [...mockQuizzes].sort(() => 0.5 - Math.random());
    //   const selected = shuffled.slice(0, 5);

    //   // Update the topic of the selected quizzes based on user input
    //   const customizedQuizzes = selected.map((quiz, index) => ({
    //     ...quiz,
    //     id: index + 1,
    //     title: `${topic} - ${quiz.title}`,
    //     tags: [...quiz.tags, topic.toLowerCase()],
    //     settings: {
    //       timeLimit: 0,
    //       randomizeQuestions: false,
    //       showExplanations: true,
    //       passingScore: 70,
    //       visibility: "private",
    //       allowRetakes: true,
    //       questionTimer: 0,
    //     },
    //   }));

    //   setGeneratedQuizzes(customizedQuizzes);
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
    <div className="space-y-4">
       <div className="grid md:grid-cols-3 items-center text-center">
                <div className="space-y-4"></div>
      {/* <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">AI Generator</TabsTrigger>
          <TabsTrigger value="editor" disabled={!isGenerated}>
            Edit Generated Quiz
          </TabsTrigger>
        </TabsList>
        <TabsContent value="generator" className="space-y-6 pt-4"> */}
         <div className="space-y-4 justify-self-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Get Register Yourself for Minute to Win it Challenge!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
             
                <div className="space-y-2 text-left">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" placeholder="Enter Your Full Name" value={fullname} onChange={(e) => setfullname(e.target.value)} />
              </div>
            
            
                <div className="space-y-2 text-left">
                <Label htmlFor="phone">Number</Label>
                <Input id="phone" placeholder="Enter First Name" value={phone} onChange={(e) => setphone(e.target.value)} />
              </div>
                <div className="space-y-2 text-left">
                  <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter Email" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>
           
             
                <div className="space-y-2 text-left">
                  <Label htmlFor="city">City</Label>
                  <Select value={city} onValueChange={setcity}>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">Karachi</SelectItem>
                      <SelectItem value="2">Lahore</SelectItem>
                      <SelectItem value="1">Islamabad</SelectItem>
                      <SelectItem value="6">Faislabad</SelectItem>
                      <SelectItem value="7">Gujranwala</SelectItem>
                      <SelectItem value="8">Sheikhupura</SelectItem>
                      <SelectItem value="9">Sialkot</SelectItem>
                      <SelectItem value="10">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="lasteducation">Last Education Qualification</Label>
                <Input id="lasteducation" placeholder="Enter Last Qualification" value={lasteducation} onChange={(e) => setlasteducation(e.target.value)} />

                  {/* <Select value={questionCount} onValueChange={setQuestionCount}>
                    <SelectTrigger id="question-count">
                    <SelectValue placeholder="Select count" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                    </SelectContent>
                    </Select> */}

                </div>
                    <div className="space-y-2 text-left">
                      <Label htmlFor="instaacc">Your Instagram Handle/Your Instagram Username</Label>
                    <Input id="instaacc" placeholder='i.e _abcuser_, abcxyz' value={instaacc} onChange={(e) => setinstaacc(e.target.value)} />
                    </div>
            

              {/* <div className="space-y-2">
                <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                <Textarea id="additional-info" placeholder="Any specific requirements or focus areas for the quiz" />
                </div> */}
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerate} disabled={!fullname || isGenerating} className="w-full">
                {isGenerating ? (
                  <>Generating Quiz...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Submit
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
                </div>
                 <div className="space-y-4"></div>
                </div>
          {/* {isGenerated && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h3 className="mb-2 text-lg font-medium">Quiz Generated Successfully!</h3>
              <p className="text-muted-foreground">
                Your quiz on "{topic}" has been generated with {questionCount} {difficulty} difficulty questions.
              </p>
              <p className="mt-2 text-muted-foreground">Click the "Edit Generated Quiz" tab above to review and customize your quiz before publishing.</p>
              <div className="mt-4 space-y-2">
                <h4 className="font-medium">Generated Quizzes:</h4>
                <div className="grid gap-2">
                  {generatedQuizzes.map((quiz) => (
                    <div key={quiz.id} className="rounded border p-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">{quiz.title}</h5>
                        <Badge variant="outline">{quiz.difficulty}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{quiz.description}</p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {quiz.tags.map((tag: string) => (
                          <Badge key={tag} variant="default" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )} */}
        {/* </TabsContent> */}

        {/* <TabsContent value="editor">{isGenerated && <QuizEditor initialQuizzes={generatedQuizzes} />}</TabsContent>*/}
      {/* </Tabs>  */}
    </div>
  );
}
