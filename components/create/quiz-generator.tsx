"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";

export function QuizGenerator() {
  const [fullname, setfullname] = useState("");
  const [instaacc, setinstaacc] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  const [lasteducation, setlasteducation] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    if (!fullname) return;

    setIsGenerating(true);

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      setIsGenerated(true);
    }, 2000);
  };

  return (
   
    <div
  className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
  style={{
    backgroundImage: "url('/images/1.jpg')", // adjust path
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundBlendMode: "overlay",
  }}>
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 items-center text-center">
        <div className="space-y-4"></div>
        <div className="space-y-4 justify-self-center">
          {!isGenerated ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Get Register Yourself for Minute to Win it Challenge!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-left">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="Enter Your Full Name"
                    value={fullname}
                    onChange={(e) => setfullname(e.target.value)}
                    />
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="phone">Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter Number"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)}
                    />
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    />
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
                      <SelectItem value="6">Faisalabad</SelectItem>
                      <SelectItem value="7">Gujranwala</SelectItem>
                      <SelectItem value="8">Sheikhupura</SelectItem>
                      <SelectItem value="9">Sialkot</SelectItem>
                      <SelectItem value="10">Hyderabad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="lasteducation">Last Education Qualification</Label>
                  <Input
                    id="lasteducation"
                    placeholder="Enter Last Qualification"
                    value={lasteducation}
                    onChange={(e) => setlasteducation(e.target.value)}
                    />
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="instaacc">Your Instagram Handle</Label>
                  <Input
                    id="instaacc"
                    placeholder="i.e _abcuser_, abcxyz"
                    value={instaacc}
                    onChange={(e) => setinstaacc(e.target.value)}
                    />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerate}
                  disabled={!fullname || isGenerating}
                  className="w-full"
                  >
                  {isGenerating ? (
                    <>Submitting...</>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" /> Submit
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 bg-[#0b0b16] text-white shadow-lg rounded-xl border border-gray-800 max-w-md mx-auto">
    <div className="mb-4 mt-8">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16 text-green-400 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4 -4m6 2a9 9 0 1 1 -18 0a9 9 0 0 1 18 0z" />
      </svg>
    </div>
    <h2 className="text-2xl font-semibold text-green-400 mb-12">
      Registration Successful!
    </h2>
    <p className="text-gray-300">
      Thank you for registering for the </p>
      <p className="font-semibold text-white max-w-sm">Minute to Win It Challenge</p> <p className="text-gray-300 max-w-sm">by</p> <p className="font-semibold text-white max-w-sm mb-12">HS Consultants (Pvt) Ltd.  </p>
     
      <p className="text-gray-300 mb-6 max-w-sm"><b>Congratulations!</b> You have been selected for the Minute to Win It Challenge!
        You will soon receive an email with the quiz details. Through that email, you’ll get the opportunity to attempt the quiz, so please keep an eye on your inbox!
    </p>
    {/* <button
      disabled
      className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg opacity-80 cursor-not-allowed"
      >
      Response Recorded
      </button> */}
  </div>
          )}
        </div>
        <div className="space-y-4"></div>
      </div>
    </div>
  </div>
  );
}
