import React from 'react';
import { render, Text, Box, Newline } from 'ink';

// 定义一个基础的CLI组件（类似Cloudflare CLI的欢迎页）
const CloudflareCli = () => {
  // 返回终端要显示的内容，类似JSX，但渲染到终端（支持文本、换行、简单样式）
  return (
    <Box flexDirection="column">
      <Text color="blue">=== Cloudflare CLI 模拟版 ===</Text>
      <Newline />
      <Text>欢迎使用CLI工具，输入命令即可操作</Text>
    </Box>
  );
};

// 渲染组件到终端（Ink的核心渲染方法）
render(<CloudflareCli />);