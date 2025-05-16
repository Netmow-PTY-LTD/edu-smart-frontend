
// pages/api/files.js
import fs from 'fs';
import path from 'path';

function walkDir(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else {
      // Make the path relative to /src/pages/dashboard/super-admin
      fileList.push(fullPath);
    }
  }
  return fileList;
}

export default function handler(req, res) {
  const baseDir = path.join(process.cwd(), 'src/pages/dashboard/super-admin');
  const files = walkDir(baseDir);

  // Convert full paths to relative from baseDir, prefix with '/'
  const relativePaths = files.map((f) => '/' + path.relative(baseDir, f).replace(/\\/g, '/'));
  
  res.status(200).json({ files: relativePaths });
}
