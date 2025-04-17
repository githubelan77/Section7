import React, { useState, useEffect, useRef } from 'react';
import "../Components/Sec7GChat.css";
import EmojiPicker from 'emoji-picker-react';

function Sec7GChat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [nickname, setNickname] = useState('Guest');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isTyping, setIsTyping] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [showMediaUpload, setShowMediaUpload] = useState(false);
    const [onlineUsers] = useState(new Set(['Guest', 'User1', 'User2']));
    const [messageStatus, setMessageStatus] = useState({});
    const [showCamera, setShowCamera] = useState(false);
    const [showMicrophone, setShowMicrophone] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [isAudioRecording, setIsAudioRecording] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [forwardMessage, setForwardMessage] = useState(null);
    const [reactions, setReactions] = useState({});

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioRef = useRef(null);
    const audioRecorderRef = useRef(null);

    // Auto-scroll to latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Handle typing indicator
    const handleTyping = () => {
        setIsTyping(true);
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }
        typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
        }, 2000);
    };

    // Format timestamp
    const formatTimestamp = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Handle camera access
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            videoRef.current.srcObject = stream;
            setShowCamera(true);
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please check permissions.');
        }
    };

    // Handle taking photo
    const takePhoto = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
        const photo = canvas.toDataURL('image/jpeg');
        sendMessage('image', photo);
        stopCamera();
    };

    // Stop camera
    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        setShowCamera(false);
    };

    // Handle audio recording
    const startAudioRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(blob);
                sendMessage('audio', audioUrl);
                stream.getTracks().forEach(track => track.stop());
            };

            audioRecorderRef.current = recorder;
            recorder.start();
            setIsAudioRecording(true);
            setShowMicrophone(true);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Unable to access microphone. Please check permissions.');
        }
    };

    // Stop audio recording
    const stopAudioRecording = () => {
        if (audioRecorderRef.current && isAudioRecording) {
            audioRecorderRef.current.stop();
            setIsAudioRecording(false);
            setShowMicrophone(false);
        }
    };

    // Handle message actions
    const handleReply = (message) => {
        setReplyingTo(message);
        setInput(`Replying to ${message.name}: `);
    };

    const handleForward = (message) => {
        setForwardMessage(message);
        sendMessage(message.type, message.content);
    };

    const handleReact = (messageId, reaction) => {
        setReactions(prev => ({
            ...prev,
            [messageId]: {
                ...prev[messageId],
                [reaction]: !prev[messageId]?.[reaction]
            }
        }));
    };

    // Send message
    const sendMessage = (type, content) => {
        if (content && content.trim() !== '') {
            const newMessage = {
                id: Date.now().toString(),
                name: nickname,
                type,
                content,
                timestamp: new Date().toISOString(),
                status: 'sent',
                replyTo: replyingTo,
                forwarded: !!forwardMessage
            };

            setMessages(prev => [...prev, newMessage]);
            setMessageStatus(prev => ({ ...prev, [newMessage.id]: 'sent' }));

            // Simulate message delivery status
            setTimeout(() => {
                setMessageStatus(prev => ({ ...prev, [newMessage.id]: 'delivered' }));
            }, 1000);

            setTimeout(() => {
                setMessageStatus(prev => ({ ...prev, [newMessage.id]: 'read' }));
            }, 2000);

            // Reset states
            if (type === 'text') setInput('');
            if (type === 'image') setImageUrl('');
            if (type === 'video') setVideoUrl('');
            if (type === 'audio') setAudioUrl('');
            setIsTyping(false);
            setReplyingTo(null);
            setForwardMessage(null);
        }
    };

    // Handle file upload
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const fileType = file.type.split('/')[0];
                sendMessage(fileType, reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle emoji selection
    const handleEmojiClick = (emojiData) => {
        setInput(prev => prev + emojiData.emoji);
    };

    // Toggle dark mode
    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`chatbox-page ${isDarkMode ? 'light-mode' : ''}`}>
            <div className="chatbox-wrapper">
                {/* Main Chat Area */}
                <div className="chatbox-container">
                    <h2 className="chatbox-heading">Section-7 Chat Box - SSCB</h2>

                    {/* Messages Area */}
                    <div className="chatbox-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className="chatbox-message">
                                <div className="message-header">
                                    <span>
                                        <span className="user-presence"></span>
                                        {msg.name}
                                    </span>
                                    <span className="timestamp">{formatTimestamp(msg.timestamp)}</span>
                                </div>

                                {msg.replyTo && (
                                    <div className="reply-info">
                                        Replying to {msg.replyTo.name}: {msg.replyTo.content.substring(0, 30)}...
                                    </div>
                                )}

                                {msg.forwarded && (
                                    <div className="forward-info">
                                        Forwarded message
                                    </div>
                                )}

                                {msg.type === 'text' && <div>{msg.content}</div>}
                                {msg.type === 'image' && (
                                    <img src={msg.content} alt="Shared" className="chatbox-img" />
                                )}
                                {msg.type === 'video' && (
                                    <video controls className="chatbox-video">
                                        <source src={msg.content} type="video/mp4" />
                                    </video>
                                )}
                                {msg.type === 'audio' && (
                                    <audio controls className="chatbox-audio">
                                        <source src={msg.content} type="audio/mpeg" />
                                    </audio>
                                )}

                                <div className="message-status">
                                    {messageStatus[msg.id] === 'sent' && '✓'}
                                    {messageStatus[msg.id] === 'delivered' && '✓✓'}
                                    {messageStatus[msg.id] === 'read' && '✓✓✓'}
                                </div>

                                <div className="message-actions">
                                    <button className="action-btn" onClick={() => handleReply(msg)}>Reply</button>
                                    <button className="action-btn" onClick={() => handleForward(msg)}>Forward</button>
                                    <div className="reaction-buttons">
                                        <button className="action-btn" onClick={() => handleReact(msg.id, 'like')}>
                                            👍 {reactions[msg.id]?.like ? '1' : '0'}
                                        </button>
                                        <button className="action-btn" onClick={() => handleReact(msg.id, 'heart')}>
                                            ❤️ {reactions[msg.id]?.heart ? '1' : '0'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                Someone is typing...
                            </div>
                        )}
                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* Input Area */}
                    <div className="chatbox-input-container">
                        {replyingTo && (
                            <div className="reply-preview">
                                Replying to {replyingTo.name}
                                <button className="close-btn" onClick={() => setReplyingTo(null)}>×</button>
                            </div>
                        )}

                        <input
                            type="text"
                            className="chatbox-input"
                            placeholder="Type a message..."
                            value={input}
                            onChange={(e) => {
                                setInput(e.target.value);
                                handleTyping();
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage('text', input)}
                        />

                        <div className="input-actions">
                            <div className="media-buttons">
                                <button className="media-btn" onClick={startCamera}>
                                    📷
                                </button>
                                <button className="media-btn" onClick={startAudioRecording}>
                                    🎤
                                </button>
                                <button className="media-btn" onClick={() => setShowMediaUpload(prev => !prev)}>
                                    📎
                                </button>
                                <button className="emoji-btn" onClick={() => setShowEmojiPicker(prev => !prev)}>
                                    😊
                                </button>
                            </div>
                            <button className="send-btn" onClick={() => sendMessage('text', input)}>
                                Send
                            </button>
                        </div>

                        {showCamera && (
                            <div className="media-preview">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="camera-preview"
                                />
                                <div className="camera-controls">
                                    <button onClick={takePhoto}>Take Photo</button>
                                    <button onClick={stopCamera}>Cancel</button>
                                </div>
                            </div>
                        )}

                        {showMicrophone && (
                            <div className="audio-recorder">
                                {isAudioRecording && (
                                    <span className="recording-indicator">Recording...</span>
                                )}
                                <button onClick={stopAudioRecording}>
                                    Stop Recording
                                </button>
                            </div>
                        )}

                        {showMediaUpload && (
                            <div className="file-upload" onClick={() => fileInputRef.current?.click()}>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                    accept="image/*,video/*,audio/*"
                                />
                                <p>Drop files here or click to upload</p>
                                <p>Supports images, videos, and audio files</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar">
                    <button className="theme-toggle" onClick={toggleDarkMode}>
                        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                    </button>

                    <div className="nickname-container">
                        <input
                            type="text"
                            className="chatbox-input"
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>

                    <div className="media-controls">
                        <input
                            type="text"
                            className="media-input"
                            placeholder="Paste image URL..."
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                        />
                        <button onClick={() => sendMessage('image', imageUrl)}>Send Image</button>

                        <input
                            type="text"
                            className="media-input"
                            placeholder="Paste video URL..."
                            value={videoUrl}
                            onChange={(e) => setVideoUrl(e.target.value)}
                        />
                        <button onClick={() => sendMessage('video', videoUrl)}>Send Video</button>

                        <input
                            type="text"
                            className="media-input"
                            placeholder="Paste audio URL..."
                            value={audioUrl}
                            onChange={(e) => setAudioUrl(e.target.value)}
                        />
                        <button onClick={() => sendMessage('audio', audioUrl)}>Send Audio</button>
                    </div>

                    {/* Online Users */}
                    <div className="online-users">
                        <h3>Online Users</h3>
                        {Array.from(onlineUsers).map(user => (
                            <div key={user} className="online-user">
                                <span className="user-presence"></span>
                                {user}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Emoji Picker */}
                {showEmojiPicker && (
                    <div className="emoji-picker-box">
                        <div className="emoji-picker-header">
                            <button className="back-btn" onClick={() => setShowEmojiPicker(false)}>
                                ←
                            </button>
                            <span>Choose an emoji</span>
                        </div>
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Sec7GChat;