"use client";

import * as React from "react"
import { useState } from 'react';

import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function Content() {
  const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg))(?:\?.*)?$/i;
  const { toast } = useToast();
  const [webhook, setWebhook] = useState('');
  const [target, setTarget] = useState('user');
  const [userID, setUserID] = useState('');
  const [message, setMessage] = useState('');
  const [botName, setBotName] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  const handleWebhookChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWebhook(event.target.value);
  };

  const handleTargetChange = (value: string) => {
    setTarget(value);
  };

  const handleUserIDChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserID(event.target.value);
  };

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleBotNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBotName(event.target.value);
  };

  const handleImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImgUrl(event.target.value);
  };

  const handleClear = () => {
    setWebhook('');
    setTarget('user');
    setUserID('');
    setMessage('');
    setImgUrl('');
    setBotName('');

    toast({
      title: "Inputs Cleared",
      description: "Form has been reset.",
    });
  };

  const handleSubmit = async () => {
    if (webhook !== "") {
      if (target !== "" && (target !== "user" || userID !== "")) {
        if (message !== "") {
          if (imgUrl === "" || imageUrlPattern.test(imgUrl)) {
            if (botName !== "") {
              try {
                const params: any = {
                  username: botName,
                  content: target === "user" ? `<@${userID}> ${message}` : `@${target} ${message}`,
                  tts: false,
                };

                if (imgUrl !== "") {
                  params.avatar_url = imgUrl;
                }

                const response = await fetch(webhook, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(params),
                });

                if (response.ok) {
                  toast({
                    title: "Message Sent",
                    description: "Your message was successfully sent.",
                  });
                } else {
                  toast({
                    title: "Message Not Sent",
                    description: "Your message was not successfully sent.",
                  });
                }
              } catch (error) {
                toast({
                  title: "Error Occurred",
                  description: "Error: " + error,
                });
              }
            } else {
              toast({
                title: "Bot Name is Empty",
                description: "Please fill in the bot name.",
              });
            }
          } else {
            toast({
              title: "Invalid Image URL",
              description: "Please enter a valid image url.",
            });
          }
        } else {
          toast({
            title: "Message is Empty",
            description: "Please fill in your message.",
          });
        }
      } else {
        toast({
          title: "Target User is Empty",
          description: "Please select your targeted user.",
        });
      }
    } else {
      toast({
        title: "Webhook is Empty",
        description: "Please fill in your discord server webhook.",
      });
    }
  };

  return (
    <div className="flex flex-grow justify-center items-center p-3">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Configure Your Ping</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between gap-2">
                <Label htmlFor="webhook">Discord Webhook</Label>
                <Input id="webhook" value={webhook} onChange={handleWebhookChange} placeholder="Insert Discord text channel webhook" />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <Label htmlFor="target">Target</Label>
                <Select value={target} onValueChange={handleTargetChange}>
                  <SelectTrigger id="target">
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="everyone">@everyone</SelectItem>
                      <SelectItem value="here">@here</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input id="userID" value={userID} onChange={handleUserIDChange} disabled={target !== "user"} placeholder="Insert Discord User ID (eg. 3412938....12)" />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <Label htmlFor="message">Message</Label>
                <Input id="message" value={message} onChange={handleMessageChange} placeholder="Insert Discord message" />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <Label htmlFor="imgurl">Bot Name</Label>
                <Input id="botName" value={botName} onChange={handleBotNameChange} placeholder="Insert bot name" />
              </div>

              <div className="flex flex-col justify-between gap-2">
                <Label htmlFor="imgurl">Bot Avatar</Label>
                <Input id="imgurl" value={imgUrl} onChange={handleImgUrlChange} placeholder="Insert image URL" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSubmit}>Ping</Button>
          <Button variant="ghost" onClick={handleClear}>Clear</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Content />
    </>
  )
}