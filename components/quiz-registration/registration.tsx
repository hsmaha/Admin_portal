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
import { Sparkles, CheckCircle,Clock } from "lucide-react";
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
  const [enablebtn,setenablebtn]= useState(true);
  const [isGenerated, setIsGenerated] = useState(false);
  const [errors, setErrors] =  useState<Record<string, string>>({});
  const [formerror, setformerror] = useState("");
  const [nic,setnic]= useState("");
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
  if (!instaacc.trim()) newErrors.instaacc = "Enter your Instagram username";
  if(!nic.trim()) newErrors.nic = "Enter your NIC number";
  else if(!/^[0-9]{5}[0-9]{7}[0-9]{1}$/.test(nic)) newErrors.nic = "Enter a valid NIC (e.g. 1234512345671)";

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
      nic,
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
    if(response.data.status == 200){
      console.log("Saved successfully:", response.data);
      return true; 

    }else{
      setformerror(response.data.message);
      return false; 

    }
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
    <div className="space-y-4 mx-auto">
      <div className="flex justify-center items-center min-h-screen p-8 pt-4 pb-0 mx-auto" >
        
        <div className="space-y-4" >
          {!isGenerated ? (
            <Card className="border rounded-xl bg-black/40 p-4 ">
              {/* <CardHeader> */}
                {/* <div className="mx-auto "><Clock className="h-8 w-8 text-orange-500 m-3" /> </div> */}
                  <div className="mx-auto text-center p-4 text-lg m-2 font-extrabold">REGISTER NOW TO ENTER THE QUIZ!</div>
                  
              {/* </CardHeader> */}
              <CardContent className="space-y-6">
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
                <div className="space-y-2 ">
                  {/* <Label className="pl-4" htmlFor="fullname ">Full Name</Label> */}
                  <Input
                    className="rounded-full"
                    id="fullname"
                    placeholder="Enter Your Full Name"
                    value={fullname}
                    onChange={(e) => {
                      setenablebtn(false)
                      setfullname(e.target.value);
                      if (errors.fullname) setErrors({ ...errors, fullname: "" });}}
                    />
                      {errors.fullname && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.fullname}</p>
                    )}

                </div>

                <div className="space-y-2 ">
                  {/* <Label className="pl-4" htmlFor="phone">Contact Number</Label> */}
                  <Input
                    className="rounded-full"
                    id="phone"
                    placeholder="Enter Number"
                    value={phone}
                    onChange={(e) => { setphone(e.target.value); if (errors.phone) setErrors({ ...errors, phone: "" }); }}
                    />
                     {errors.phone && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.phone}</p>
                    )}
                </div>

                <div className="space-y-2 ">
                 {/* <Label className="pl-4" htmlFor="email">Email</Label> */}
                  <Input
                    className="rounded-full"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => { setemail(e.target.value); if (errors.email) setErrors({ ...errors, email: "" }); }}
                    />
                     {errors.email && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.email}</p>
                    )}
                </div>
               <div className="space-y-2 ">
                 {/* <Label className="pl-4" htmlFor="nic">NIC</Label> */}
                  <Input
                    className="rounded-full"
                    id="nic"
                    placeholder="Enter NIC number"
                    value={nic}
                    onChange={(e) => { setnic(e.target.value); if (errors.nic) setErrors({ ...errors, nic: "" }); }}
                    />
                     {errors.nic && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.nic}</p>
                    )}
                </div>
                <div className="space-y-2  ">
                 {/* <Label className="pl-4" htmlFor="city">City</Label> */}
                  <Select value={city} onValueChange={(value) => {
                      setcity(value);
                      if (errors.city) setErrors({ ...errors, city: "" });
                    }}>
                    <SelectTrigger id="city" className="rounded-full">
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
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.city}</p>
                    )}
                </div>

                <div className="space-y-2 ">
                 {/* <Label className="pl-4" htmlFor="lasteducation">Last Education Qualification</Label> */}
                  <Input
                    className="rounded-full"
                    id="lasteducation"
                    placeholder="Enter Last Qualification"
                    value={lasteducation}
                    onChange={(e) => { setlasteducation(e.target.value); if (errors.lasteducation) setErrors({ ...errors, lasteducation: "" }); }}
                    />
                     {errors.lasteducation && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.lasteducation}</p>
                    )}
                </div>
                  <div className="space-y-2 ">
                 {/* <Label className="pl-4" htmlFor="institute">Institute</Label> */}
                  <Input
                    className="rounded-full"
                    id="institute"
                    placeholder="Enter Institute"
                    value={institute}
                    onChange={(e) => { setinstitute(e.target.value); if (errors.institute) setErrors({ ...errors, institute: "" }); }}
                    />
                    {errors.institute && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.institute}</p>
                    )}
                </div>

                <div className="space-y-2 ">
                 {/* <Label className="pl-4" htmlFor="instaacc">Your Instagram Username</Label> */}
                  <Input
                    className="rounded-full"
                    id="instaacc"
                    placeholder="i.e _abcuser_, abcxyz"
                    value={instaacc}
                    onChange={(e) => { setinstaacc(e.target.value); if (errors.instaacc) setErrors({ ...errors, instaacc: "" }); }}
                    />
                     {errors.instaacc && (
                      <p className="pl-4 text-sm text-red-500 mt-1">{errors.instaacc}</p>
                    )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerate}
                  disabled={enablebtn}
                  className="w-full rounded-full"
                    variant="warm"
                  >
                  {isGenerating ? (
                    <>
                    <p className="text-black font-bold">SUBMITTING...</p>
                    <Sparkles className="mr-2 h-4 w-4 text-black" />
                    </>
                  ) : (
                    <>
                       <p className="text-black font-bold">REGISTER NOW</p>
                      
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-4 text-white shadow-lg rounded-xl border border-gray-800 max-w-md mx-auto bg-black/60">
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
                  
                    <p className="text-gray-300 mb-12 max-w-sm "><span className="text-orange-400"><b>Congratulations!</b></span> on Registering for the “Minute to Win It” Challenge!
                      Thank you for taking on this exciting challenge! You will soon receive an email containing the quiz details. This email will include a link to participate in the quiz, so please keep an eye on your <span className="text-orange-300">inbox! </span>
                   (and your spam or promotions folder, just in case). </p>
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
