import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
export default function Profile() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="w-full h-full">
        <div>
          <div className="grid w-[100%] gap-6">
            <div className="grid gap-2">
              <h1 className="text-3xl font-bold">Profile</h1>
              <p>Full profile preview</p>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
