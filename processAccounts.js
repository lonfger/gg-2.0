const fs = require('fs');

// 读取 email.txt 文件
const inputFile = 'email.txt';
const outputFile = 'account.js';

try {
  // 读取文件内容并按行分割
  const data = fs.readFileSync(inputFile, 'utf8');
  const lines = data.trim().split('\n');

  // 将数据组装为指定的 JSON 格式
  const accountLists = lines.map((line) => {
    const [username, password] = line.split(':');
    return {
      username: username.trim(),
      password: password.trim(),
    };
  });

  // 构造输出的 JS 内容
  const outputContent = `const accountLists = ${JSON.stringify(accountLists, null, 2)};\n module.exports = { accountLists }`;

  // 写入到 accounts.js
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  console.log(`Data successfully processed and saved to ${outputFile}`);
} catch (error) {
  console.error('Error processing data:', error.message);
}
