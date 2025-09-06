import React, { useState, useEffect } from "react";
import {
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaRegClipboard,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Quote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    getQuote();
  }, []);

  const getQuote = () => {
    let url = `https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        let dataQuotes = data.quotes;
        let randomNum = Math.floor(Math.random() * dataQuotes.length);
        let randomQuote = dataQuotes[randomNum];

        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      });
  };

  const handleClick = () => {
    getQuote();
  };

  // Share URLs
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `"${quote}" - ${author}`
  )}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    "https://yourapp.com" // replace with your live app URL
  )}&quote=${encodeURIComponent(`"${quote}" - ${author}`)}`;

  //Copy to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`"${quote}" - ${author}`);
    toast.success("Quote copied!");
  };

  return (
    <div className="bg-blue-950 w-[40rem] my-[10rem] mx-auto p-12 rounded-[5px]">
      <div className="text-[2rem] text-white mb-6">
        <p>{quote}</p>
      </div>
      <div className="flex justify-end text-[1.2rem] text-white">
        <p>{author}</p>
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex">
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 bg-[#1DA1F2] px-2 py-1 rounded-[3px] hover:opacity-90"
          >
            <FaTwitter className="w-6 text-white" />
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 bg-green-600 px-2 py-1 rounded-[3px] hover:opacity-90"
          >
            <FaWhatsapp className="w-6 text-white" />
          </a>

          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-2 bg-blue-600 px-2 py-1 rounded-[3px] hover:opacity-90"
          >
            <FaFacebook className="w-6 text-white" />
          </a>

          <button
            onClick={copyToClipboard}
            className="mr-2 bg-gray-600 px-2 py-1 rounded-[3px] hover:opacity-90"
          >
            <FaRegClipboard className="w-6 text-white" />
          </button>
        </div>

        <button
          onClick={handleClick}
          className="bg-[#0059ff] text-white px-4 py-2 text-[0.9rem] font-bold rounded-[2px] outline-none cursor-pointer hover:opacity-90"
        >
          New Quote
        </button>
      </div>
    </div>
  );
}

export default Quote;
