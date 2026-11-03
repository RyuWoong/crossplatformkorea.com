import TypingText from '@/components/uis/TypingText';

export default function HomeHeadline({
  firstLine,
  secondLine,
}: {
  firstLine: string;
  secondLine: string;
}) {
  return (
    <h1 id="home-title" className="home-title">
      <TypingText>
        {firstLine}
        <br />
        <span className="text-muted-foreground">{secondLine}</span>
      </TypingText>
    </h1>
  );
}
