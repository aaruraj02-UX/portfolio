const AdmZip = require('adm-zip');
const zip = new AdmZip('../stage 3 and 5 - Minutes of Meeting.docx');
const docXml = zip.readAsText('word/document.xml');

const text = docXml
  .replace(/<w:br[^>]*\/>/g, '\n')
  .replace(/<\/w:p>/g, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&apos;/g, "'")
  .replace(/&quot;/g, '"')
  .split('\n')
  .map(l => l.trim())
  .filter(l => l.length > 0)
  .join('\n');

console.log(text);
