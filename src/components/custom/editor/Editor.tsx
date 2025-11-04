"use client";
import React from "react";
import EditorComponent from "./EditorComponent";
import Notiflix from "notiflix";

interface EditorProps {
  id?: number;
  editable?: boolean;
  initialContent?: string;
  initialImageUrl?: string;
  initialTitle?: string;
  onSave: (data: {
    content: string;
    imageUrl: string;
    title: string;
  }) => Promise<boolean>;
}

export default function Editor({
  id,
  initialContent,
  initialImageUrl,
  initialTitle,
  editable,
  onSave,
}: EditorProps) {
  const handleSubmit = async (data: {
    content: string;
    imageUrl: string;
    title: string;
  }) => {
    const success = await onSave(data);
    Notiflix.Notify[success ? "success" : "failure"](
      success ? "Salvat cu succes!" : "Eroare la salvare!"
    );
    return success;
  };

  return (
    <EditorComponent
      postId={id}
      initialContent={initialContent}
      initialImageUrl={initialImageUrl}
      initialTitle={initialTitle}
      onSubmit={handleSubmit}
      editable={editable}
    />
  );
}
