import { Facebook, Linkedin, Link as LinkIcon, Mail } from "lucide-react";
import { useState } from "react";

interface InlineSocialShareProps {
  url: string;
  title: string;
}

// X (Twitter) Logo Component
const XLogo = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export function InlineSocialShare({ url, title }: InlineSocialShareProps) {
  const [copied, setCopied] = useState(false);
  
  const fullUrl = `https://blujeansz.com${url}`;
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "X",
      icon: XLogo,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: "hover:bg-black hover:text-white",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-[#1877F2] hover:text-white",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`,
      color: "hover:bg-gray-700 hover:text-white",
    },
  ];

  return (
    <div>
      <p className="text-sm text-gray-500 mb-4">Share this article</p>
      <div className="flex items-center gap-3">
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 transition-all ${link.color}`}
            title={`Share on ${link.name}`}
          >
            <link.icon />
          </a>
        ))}
        
        <button
          onClick={handleCopyLink}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-all relative"
          title="Copy link"
        >
          <LinkIcon className="w-4 h-4" />
          {copied && (
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-blue-600 font-medium whitespace-nowrap bg-white px-2 py-1 rounded shadow-sm">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}