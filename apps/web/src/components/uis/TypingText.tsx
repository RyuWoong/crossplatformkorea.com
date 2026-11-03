import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

function textContent(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return child.type === 'br' ? '\n' : textContent(child.props.children);
      }
      return '';
    })
    .join('');
}

/** Reveal text without changing its final wrapping or reserved space. */
export default function TypingText({ children }: { children: ReactNode }) {
  const text = textContent(children).normalize('NFC');
  const interval = Math.min(45, 900 / Math.max(1, Array.from(text).length));
  let characterIndex = 0;
  const reveal = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return Array.from(String(child).normalize('NFC')).map((character) => {
          const index = characterIndex++;
          return (
            <span
              key={index}
              className="typing-character"
              style={{ animationDelay: `${100 + index * interval}ms` }}
            >
              {character}
            </span>
          );
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child) && child.props.children != null) {
        return cloneElement(child, { children: reveal(child.props.children) });
      }
      return child;
    });

  return (
    <>
      <span className="sr-only">{text}</span>
      <span key={text} aria-hidden="true">
        {reveal(children)}
      </span>
    </>
  );
}
