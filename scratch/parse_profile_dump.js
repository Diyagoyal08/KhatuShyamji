const fs = require('fs');

const dumpPath = 'C:\\Users\\diyag\\.gemini\\antigravity-ide\\brain\\4c6e25f0-4382-4395-9f71-3b0e0ddd0d63\\scratch\\step_458_dump.json';

try {
  const dump = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
  const content = dump.content;
  console.log("Content type:", typeof content);
  console.log("Content length:", content ? content.length : 0);
  
  // Let's write a parser that recovers the clean code.
  // First, let's print the first 500 characters of the content to see what format it is.
  console.log("First 500 chars of content:");
  console.log(content.substring(0, 500));
  
  // Now let's try to extract lines.
  const lines = content.split('\n');
  const cleanLines = [];
  let foundStart = false;
  
  for (const line of lines) {
    // Check if the line matches the pattern "<number>: <code_content>"
    const match = line.match(/^\d+:\s?(.*)$/);
    if (match) {
      cleanLines.push(match[1]);
      foundStart = true;
    } else {
      // If we haven't seen line numbers yet or it's a heading/meta info, skip
      if (foundStart) {
        // Sometimes there are extra blank lines or non-numbered lines.
        // Let's just push them or see what they are.
        cleanLines.push(line);
      }
    }
  }
  
  const cleanCode = cleanLines.join('\n');
  console.log("Clean code length:", cleanCode.length);
  
  const targetPath = 'C:\\Users\\diyag\\.gemini\\antigravity-ide\\brain\\4c6e25f0-4382-4395-9f71-3b0e0ddd0d63\\scratch\\profile_clean_458.tsx';
  fs.writeFileSync(targetPath, cleanCode);
  console.log("Saved clean code to", targetPath);
} catch (e) {
  console.error("Error:", e);
}
