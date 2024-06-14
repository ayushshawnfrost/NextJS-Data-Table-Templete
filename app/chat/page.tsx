"use client";

import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import dynamic from "next/dynamic";
import { useDebounce } from "use-debounce";
import Select, { SingleValue } from "react-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmojiClickData } from "emoji-picker-react";

const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface Message {
  id: string;
  text: string;
  user: string;
}

const mockUsers = ["alice", "bob", "charlie"];
const mockCommands = [
  { label: "/mute", value: "/mute" },
  { label: "/ban", value: "/ban" },
  { label: "/title", value: "/title" },
  { label: "/description", value: "/description" },
];

const initialMessages: Message[] = [
  { id: "1", text: "Hello, world!", user: "alice" },
  { id: "2", text: "Hi there!", user: "bob" },
];

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState<string>("");
  const [debouncedInput] = useDebounce(input, 100);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [tagOptions, setTagOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [commandOptions, setCommandOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const lastChar = input.slice(-1);
    const enterEmoji = input.slice(-7);
    if (lastChar === "@") {
      setTagOptions(mockUsers.map((user) => ({ label: `${user}`, value: user })));
    } else if (lastChar === "/") {
      setCommandOptions(mockCommands);
    } else if (enterEmoji === ":emoji:") {
      setInput((prev) => prev.substring(0,prev.length-7));
      setShowEmojiPicker(true);
    } else {
      setTagOptions([]);
      setCommandOptions([]);
    }
  }, [debouncedInput]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { id: Date.now().toString(), text: input, user: "you" }]);
    setInput("");
    setShowEmojiPicker(false);
  };

  const handleSelectUser = (option: SingleValue<{ label: string; value: string }>) => {
    if (option) {
      setInput(input + option.label);
    }
    setTagOptions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectCommand = (option: SingleValue<{ label: string; value: string }>) => {
    if (option) {
      setInput(option.label);
    }
    setCommandOptions([]);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleEmojiClick = useCallback((emojiData: EmojiClickData, event: MouseEvent) => {
    setInput(input + emojiData.emoji);
  }, [input]);

  const toggleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`p-2 my-2 rounded ${
              message.user === "you" ? "bg-blue-200 self-end" : "bg-gray-200"
            }`}
          >
            <strong>{message.user}:</strong> {message.text}
          </div>
        ))}
      </div>
      {tagOptions.length > 0 && (
        <Select
          options={tagOptions}
          onChange={handleSelectUser}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          menuIsOpen
          className=""
        />
      )}
      {commandOptions.length > 0 && (
        <Select
          options={commandOptions}
          onChange={handleSelectCommand}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          menuIsOpen
          className=""
        />
      )}
      <div className="relative flex items-center p-4 border-t">
        {showEmojiPicker && (
          <div className="absolute bottom-full mb-2" ref={emojiPickerRef}>
            <Picker onEmojiClick={handleEmojiClick} lazyLoadEmojis={true} />
          </div>
        )}
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button onClick={toggleEmojiPicker} className="mx-2">
          😀
        </Button>
        <Button onClick={handleSend} className="ml-2">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
