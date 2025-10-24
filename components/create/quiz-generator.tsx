"use client";
type FormErrors = {
  fullname?: string;
  phone?: string;
  email?: string;
  city?: string;
  lasteducation?: string;
  institute?: string;
  instaacc?: string;
};
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle } from "lucide-react";
import { useState } from "react";
import axios from "axios"; 

export function QuizGenerator() {
  const [fullname, setfullname] = useState("");
  const [instaacc, setinstaacc] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [city, setcity] = useState("");
  const [lasteducation, setlasteducation] = useState("");
  const [institute,setinstitute] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const [errors, setErrors] =  useState<Record<string, string>>({});
  const [formerror, setformerror] = useState("");
  
const validateForm = () => {
const newErrors: Record<string, string> = {};

  if (!fullname.trim()) newErrors.fullname = "Full name is required";
  if (!phone.trim()) newErrors.phone = "Phone number is required";
  else if (!/^[0-9]{10,15}$/.test(phone)) newErrors.phone = "Enter a valid phone number";

  if (!email.trim()) newErrors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";

  if (!city) newErrors.city = "Please select a city";
  if (!lasteducation.trim()) newErrors.lasteducation = "Enter your last qualification";
  if (!institute.trim()) newErrors.institute = "Enter your institute name";
  if (!instaacc.trim()) newErrors.instaacc = "Enter your Instagram handle";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
const storeUser = async () => {
  try {
    const payload = {
      fullname,
      instaacc,
      phone,
      email,
      city,
      lasteducation,
      institute,
    };

    const response = await axios.post(
      "https://www.hsconsultants.net/api/admin/save-user",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    console.log("Saved successfully:", response.data);
    return true; 
  } catch (error) {
    console.error("Error saving user:", error);
    setformerror("Couldn’t complete registration, Please retry.");
    return false; 
  }
};
  const handleGenerate = async () => {
  if (!validateForm()) return;

  setIsGenerating(true);
  setformerror(""); // clear old error

  const success = await storeUser(); // wait for API call

  setIsGenerating(false);

  if (success) {
    setIsGenerated(true); 
  } else {
    setIsGenerated(false); 
  }
};

  return (
  
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
                {formerror && (
                      <div className="flex items-center border border-red-700 text-red-400 text-sm py-2 rounded-md shadow-sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 9v2m0 4h.01M12 5a7 7 0 11-0.001 14.001A7 7 0 0112 5z"
                          />
                        </svg>
                        <span>{formerror}</span>
                      </div>
                    )}
                <div className="space-y-2 text-left">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    placeholder="Enter Your Full Name"
                    value={fullname}
                    onChange={(e) => {setfullname(e.target.value);
                      if (errors.fullname) setErrors({ ...errors, fullname: "" });}}
                    />
                      {errors.fullname && (
                      <p className="text-sm text-red-500 mt-1">{errors.fullname}</p>
                    )}

                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="phone">Contact Number</Label>
                  <Input
                    id="phone"
                    placeholder="Enter Number"
                    value={phone}
                    onChange={(e) => { setphone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: "" }); }}
                    />
                     {errors.phone && (
                      <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => { setemail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                    />
                     {errors.email && (
                      <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="city">City</Label>
                  <Select value={city} onValueChange={(value) => {
                      setcity(value);
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}>
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
                   {errors.city && (
                      <p className="text-sm text-red-500 mt-1">{errors.city}</p>
                    )}
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="lasteducation">Last Education Qualification</Label>
                  <Input
                    id="lasteducation"
                    placeholder="Enter Last Qualification"
                    value={lasteducation}
                    onChange={(e) => { setlasteducation(e.target.value); if (errors.lasteducation) setErrors({ ...errors, lasteducation: "" }); }}
                    />
                     {errors.lasteducation && (
                      <p className="text-sm text-red-500 mt-1">{errors.lasteducation}</p>
                    )}
                </div>
                  <div className="space-y-2 text-left">
                  <Label htmlFor="institute">Institute</Label>
                  <Input
                    id="institute"
                    placeholder="Enter Institute"
                    value={institute}
                    onChange={(e) => { setinstitute(e.target.value); if (errors.institute) setErrors({ ...errors, institute: "" }); }}
                    />
                    {errors.institute && (
                      <p className="text-sm text-red-500 mt-1">{errors.institute}</p>
                    )}
                </div>

                <div className="space-y-2 text-left">
                  <Label htmlFor="instaacc">Your Instagram Handle</Label>
                  <Input
                    id="instaacc"
                    placeholder="i.e _abcuser_, abcxyz"
                    value={instaacc}
                    onChange={(e) => { setinstaacc(e.target.value); if (errors.instaacc) setErrors({ ...errors, instaacc: "" }); }}
                    />
                     {errors.instaacc && (
                      <p className="text-sm text-red-500 mt-1">{errors.instaacc}</p>
                    )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
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
     
      <p className="text-gray-300 mb-12 max-w-sm "><span className="text-orange-400"><b>Congratulations!</b></span> on registering for the Minute to Win It Challenge! You have embraced the challenge be proud about it!! 
You will soon receive an email with the quiz details. Through that email, you’ll get the opportunity to attempt the quiz, so please keep an eye on your <span className="text-orange-300">inbox!</span>
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
  );
}
