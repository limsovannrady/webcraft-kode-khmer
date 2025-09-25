import SnowAnimation from '@/components/SnowAnimation';
import TextConverter from '@/components/TextConverter';

const Index = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8 relative bg-background">
      {/* Background Snow Effect */}
      <SnowAnimation />
      
      {/* Main Text Converter */}
      <TextConverter />
    </div>
  );
};

export default Index;
