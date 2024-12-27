const fs = require('fs');
const path = require('path');

// 输入文件和输出目录
const inputFile = 'proxies.txt';
const outputDir = './';

// 每个文件最大条数
const batchSize = 40;

try {
  // 读取 proxies.txt 文件
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.trim().split('\n');

  // 将每行数据转换为指定格式
  const formattedLines = lines.map((line) => {
    const [ip, port, username, pwd] = line.split(':');
    return `http://${username}:${pwd}@${ip}:${port}`;
  });

  // 分割数据并写入多个文件
  let fileIndex = 0;
  for (let i = 0; i < formattedLines.length; i += batchSize) {
    // 取当前批次数据
    const batch = formattedLines.slice(i, i + batchSize);
    const fileName = path.join(outputDir, fileIndex === 0 ? `proxy.txt` : `proxy${fileIndex}.txt`);
    fs.writeFileSync(fileName, batch.join('\n'), 'utf8');
    console.log(`Written ${batch.length} proxies to ${fileName}`);
    fileIndex++;
  }

  console.log('All files written successfully!');
} catch (error) {
  console.error('Error processing proxies:', error.message);
}
