import { useState } from 'react';

function CustomInputBox() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleSend = () => {
    if (inputValue.trim() === '') {
      return;
    }

    // 发送消息
    addResponseMessage(inputValue);

    // 清空输入框
    setInputValue('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Type a message..."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        style={{ flex: 1 }}
      />
      <button onClick={handleSend} style={{ marginLeft: 8 }}>
        Send
      </button>
    </div>
  );
}

export default CustomInputBox;
