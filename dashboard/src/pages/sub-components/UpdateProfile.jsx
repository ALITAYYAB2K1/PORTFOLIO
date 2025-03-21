import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";
import SpecialLoadingButoon from "./SpecialLoadingButton";

function UpdateProfile() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  // Form state
  const [formData, setFormData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    aboutMe: user?.aboutMe || "",
    portfolioURL: user?.portfolioURL || "",
    githubURL: user?.githubURL || "",
    linkedinURL: user?.linkedinURL || "",
    twitterURL: user?.twitterURL || "",
    facebookURL: user?.facebookURL || "",
    instagramURL: user?.instagramURL || "",
  });

  // File state
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(user?.resume || "");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle avatar file selection
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle resume file selection
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setResumePreview(reader.result);
        setResume(file);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = new FormData();

    // Add all form fields to FormData
    Object.keys(formData).forEach((key) => {
      userData.append(key, formData[key]);
    });

    // Add files if they exist
    if (avatar) {
      userData.append("avatar", avatar);
    }

    if (resume) {
      userData.append("resume", resume);
    }

    // Dispatch the action (uncomment when ready)
    // dispatch(updateProfile(userData));
    console.log("Form submitted", userData);
  };

  // Function to trigger file input click
  const triggerFileInput = (inputId) => {
    document.getElementById(inputId).click();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto pb-8">
      <div className="grid gap-6 mt-4">
        <div className="grid gap-2">
          <h1 className="text-2xl font-bold text-foreground">Update Profile</h1>
          <p className="text-muted-foreground mb-4">
            Update your profile information
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Avatar Section */}
            <div className="space-y-4">
              <Label htmlFor="avatar-input" className="text-foreground">
                Profile Image
              </Label>
              <div className="rounded-lg overflow-hidden bg-muted aspect-square w-full max-w-[250px] border border-border">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Profile preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">No image</span>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  id="avatar-input"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => triggerFileInput("avatar-input")}
                  className="w-full max-w-[250px] cursor-pointer"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Profile Image
                </Button>
              </div>
            </div>

            {/* Resume Section - Now handling resume as an image */}
            <div className="space-y-4">
              <Label htmlFor="resume-input" className="text-foreground">
                Resume Image
              </Label>
              <div className="rounded-lg overflow-hidden bg-muted aspect-square w-full max-w-[250px] border border-border">
                {resumePreview ? (
                  <img
                    src={resumePreview}
                    alt="Resume preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground">
                      No resume image
                    </span>
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  id="resume-input"
                  accept="image/*"
                  onChange={handleResumeChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => triggerFileInput("resume-input")}
                  className="w-full max-w-[250px] cursor-pointer"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Choose Resume Image
                </Button>
              </div>

              {user?.resume && (
                <div>
                  <Link
                    to={user.resume}
                    target="_blank"
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    View current resume image
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Text Inputs - Two Column Layout on Larger Screens */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullname" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-foreground">
                  Phone
                </Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="portfolioURL" className="text-foreground">
                  Portfolio URL
                </Label>
                <Input
                  type="text"
                  id="portfolioURL"
                  name="portfolioURL"
                  value={formData.portfolioURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="githubURL" className="text-foreground">
                  Github URL
                </Label>
                <Input
                  type="text"
                  id="githubURL"
                  name="githubURL"
                  value={formData.githubURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="linkedinURL" className="text-foreground">
                  LinkedIn URL
                </Label>
                <Input
                  type="text"
                  id="linkedinURL"
                  name="linkedinURL"
                  value={formData.linkedinURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="instagramURL" className="text-foreground">
                  Instagram URL
                </Label>
                <Input
                  type="text"
                  id="instagramURL"
                  name="instagramURL"
                  value={formData.instagramURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="twitterURL" className="text-foreground">
                  Twitter(X) URL
                </Label>
                <Input
                  type="text"
                  id="twitterURL"
                  name="twitterURL"
                  value={formData.twitterURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="facebookURL" className="text-foreground">
                  Facebook URL
                </Label>
                <Input
                  type="text"
                  id="facebookURL"
                  name="facebookURL"
                  value={formData.facebookURL}
                  onChange={handleChange}
                  className="mt-1 bg-background border-input text-foreground"
                />
              </div>
            </div>
          </div>

          {/* About Me - Full Width */}
          <div>
            <Label htmlFor="aboutMe" className="text-foreground">
              About Me
            </Label>
            <Textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              className="min-h-32 mt-1 bg-background border-input text-foreground"
            />
          </div>
          <div className="grid gap-2">
            {!loading ? (
              <Button
                type="submit"
                className="w-full max-w-xs bg-black text-white cursor-pointer hover:bg-gray-800 transition-colors"
              >
                Update Profile
              </Button>
            ) : (
              <SpecialLoadingButoon content={"Updating.."} />
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default UpdateProfile;
