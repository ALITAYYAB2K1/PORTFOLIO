import React, { useState, useEffect } from "react";
import { Mail, Phone, Github, Linkedin } from "lucide-react";
import axios from "axios";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/v1/user/portfolio",
          {
            withCredentials: true,
          }
        );
        setUser(data.data);
        console.log("User data:", data.data); // Add this for debugging
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getMyProfile();
  }, []);

  return (
    <footer className="p-5 mt-16 w-full max-w-[1050px] mx-auto">
      {/* Divider */}
      <hr className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold mb-3">Contact Me</h3>
          {!loading ? (
            <>
              {user.email && (
                <a
                  href={`mailto:${user.email}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 transition-colors"
                >
                  <Mail size={18} />
                  <span>{user.email}</span>
                </a>
              )}

              {(user.phone || user.phoneNumber) && (
                <a
                  href={`tel:${(user.phone || user.phoneNumber).replace(
                    /\s+/g,
                    ""
                  )}`}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Phone size={18} />
                  <span>{user.phone || user.phoneNumber}</span>
                </a>
              )}

              {/* Fallback if no phone number */}
              {!user.phone && !user.phoneNumber && (
                <p className="text-gray-500 italic">
                  No phone number available
                </p>
              )}
            </>
          ) : (
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-48"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4">
            {!loading && (user.phone || user.phoneNumber) && (
              <a
                href={`https://wa.me/${(
                  user.phone || user.phoneNumber
                )?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </a>
            )}

            {!loading && user.githubURL && (
              <a
                href={user.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            )}

            {!loading && user.linkedinURL && (
              <a
                href={user.linkedinURL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom section with copyright and signature line */}
      <div className="text-center pt-6 mt-4 border-t text-sm text-gray-500">
        <h1 className="text-tubeLight-effect text-3xl mt-2 mb-4 justify-center sm:justify-start tracking-[8px]">
          Thanks For Scrolling
        </h1>
        <p>
          © {currentYear} {user.fullname || "Ali Tayyab"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
