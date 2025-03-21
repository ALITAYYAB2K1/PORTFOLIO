import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/tabs";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
export function Messages() {
  const navigateTo = useNavigate();

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  //const {} = useSelector((state) => state.Messages);
  const [messageId, setMessageId] = useState("");
  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
                <Button className="w-fit" onClick={handleReturnToDashboard}>
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4"></CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
