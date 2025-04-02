import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import React, { useRef, useState } from 'react';
import { postAction } from '../action';

export default function PostForm() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (content.trim()) {
      setIsLoading(true); 
      setError(null);
      setSuccess(null);
      try {
        await postAction(content);
        setContent('');
        setSuccess('Post created successfully!');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        console.error('Error posting:', err);
        setError('Failed to post. Please try again.');
      } finally {
        setIsLoading(false); 
      }
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>What is happening?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <textarea
            ref={textareaRef}
            className="w-full p-2 border rounded-md resize-none overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Say something..."
            rows={1}
            value={content}
            onChange={handleInput}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Posting...' : 'Post'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}