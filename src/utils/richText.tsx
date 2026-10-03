// Inline markup used in copy: ==highlight== and **bold**
export const renderRich = (text: string) =>
  text.split(/(==[^=]+==|\*\*[^*]+\*\*)/).map((part, i) => {
    if (part.startsWith('==')) return <mark key={i} className="about-mark">{part.slice(2, -2)}</mark>
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    return part
  })
