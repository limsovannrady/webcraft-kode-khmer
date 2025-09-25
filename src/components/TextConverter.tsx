import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const TextConverter = () => {
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('អត្ថបទរបស់ខ្ញុំ');

  const handleDownload = () => {
    if (!textContent.trim()) {
      toast({
        title: "អត្ថបទទទេ!",
        description: "សូមបញ្ចូលអត្ថបទជាមុនសិន!",
        variant: "destructive",
      });
      return;
    }

    const finalFileName = fileName.trim() || 'my_text_file';
    const fileNameWithExt = finalFileName.toLowerCase().endsWith('.txt') 
      ? finalFileName 
      : `${finalFileName}.txt`;

    // Create and download the file
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileNameWithExt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "ទាញយកបានជោគជ័យ!",
      description: `ឯកសារ ${fileNameWithExt} ត្រូវបានទាញយក`,
    });
  };

  const handleClear = () => {
    setTextContent('');
    toast({
      title: "សម្អាតរួច!",
      description: "អត្ថបទត្រូវបានសម្អាត",
    });
  };

  return (
    <Card className="relative z-10 w-full max-w-4xl p-8 rounded-3xl glass-container box-glow transition-all duration-500">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-glow font-khmer">
          កម្មវិធីបម្លែងអត្ថបទទៅជា TXT
        </h1>
        <p className="text-sm md:text-base text-muted-foreground font-khmer">
          បញ្ចូលអត្ថបទរបស់អ្នកដើម្បីទាញយកជាឯកសារ .txt
        </p>
      </header>

      {/* Text Area */}
      <div className="mb-8">
        <Textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="បញ្ចូលអត្ថបទរបស់អ្នកនៅទីនេះ..."
          className="w-full h-64 p-4 text-foreground rounded-2xl bg-muted/50 
                     border-2 border-primary/50 focus:border-primary 
                     focus:shadow-glow-blue transition-all duration-300
                     font-khmer resize-none"
        />
      </div>

      {/* File Naming Input */}
      <div className="mb-8">
        <Label htmlFor="fileNameInput" className="block text-foreground font-semibold mb-2 font-khmer">
          ឈ្មោះឯកសារ
        </Label>
        <Input
          id="fileNameInput"
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="ឧទាហរណ៍៖ កំណត់ត្រារបស់ខ្ញុំ"
          className="w-full p-3 text-foreground rounded-xl bg-muted/50 
                     border-2 border-secondary/50 focus:border-secondary 
                     focus:shadow-glow-pink transition-all duration-300 font-khmer"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          onClick={handleDownload}
          className="btn-3d w-full sm:w-1/2 rounded-2xl bg-transparent text-foreground 
                     border-2 border-primary hover:bg-primary hover:text-primary-foreground 
                     transition-all duration-200 font-khmer font-bold py-3 px-6"
        >
          ទាញយក TXT
        </Button>
        <Button
          onClick={handleClear}
          variant="secondary"
          className="btn-3d-pink w-full sm:w-1/2 rounded-2xl bg-transparent text-foreground 
                     border-2 border-secondary hover:bg-secondary hover:text-secondary-foreground 
                     transition-all duration-200 font-khmer font-bold py-3 px-6"
        >
          សម្អាតអត្ថបទ
        </Button>
      </div>
    </Card>
  );
};

export default TextConverter;