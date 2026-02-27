#!/usr/bin/env node

import React, { useState, useEffect } from 'react';
import { render, Text, Box } from 'ink';
import TextInput from 'ink-text-input';

const CloudflareCli = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isFocused, setIsFocused] = useState(true); // 默认聚焦

  // 全局键盘监听
  useEffect(() => {
    const handleKeyPress = (data) => {
      const key = data.toString();
      
      // 检测回车键（\n 或 \r）
      if ((key === '\n' || key === '\r') && isFocused) {
        handleCommand(input);
      }
    };

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', handleKeyPress);

    return () => {
      process.stdin.removeListener('data', handleKeyPress);
    };
  }, [input, isFocused]);

  const handleCommand = (cmd) => {
    if (cmd === 'cf status') {
      setResult('✅ Cloudflare服务正常，当前已连接');
    } else if (cmd === 'cf list') {
      setResult('📋 已部署站点：1. example.com 2. test.com');
    } else if (cmd === 'help') {
      setResult('💡 可用命令：cf status, cf list, help, clear');
    } else if (cmd === 'clear') {
      setResult('');
    } else {
      setResult(`❌ 未知命令：${cmd}，请输入 'help' 查看可用命令`);
    }
    setInput(''); // 清空输入
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="blue" bold>Cloudflare CLI</Text>
      <Text color="gray" italic>提示：输入 "help" 查看可用命令</Text>
      <Box marginTop={1} marginBottom={1}>
        <TextInput
          value={input}
          onChange={setInput}
          placeholder="输入命令（cf status / cf list / help / clear）"
          focus={true}
        />
      </Box>
      {result && (
        <Text 
          color={result.includes('✅') ? 'green' : 
                 result.includes('❌') ? 'red' : 
                 result.includes('📋') ? 'yellow' : 
                 'white'}
          wrap="wrap"
        >
          {result}
        </Text>
      )}
      <Box marginTop={1}>
        <Text color="gray">按回车执行命令，输入 "clear" 清空结果</Text>
      </Box>
    </Box>
  );
};

// 错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Cloudflare CLI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box flexDirection="column">
          <Text color="red">应用程序出错!</Text>
          <Text color="yellow">请重启应用</Text>
        </Box>
      );
    }

    return this.props.children;
  }
}

render(
  <ErrorBoundary>
    <CloudflareCli />
  </ErrorBoundary>
);



