import { useState } from 'react';
import './CommentSection.css';

interface Comment {
  id: number;
  user: string;
  time: string;
  text: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, user: '익명123', time: '1분 전', text: '오늘 1등 가즈아~!!' },
    { id: 2, user: '행운가득', time: '5분 전', text: '좋은 기운 받아갑니다.' }
  ]);
  const [input, setInput] = useState('');

  const handleAddComment = () => {
    if (!input.trim()) return;
    const newComment = {
      id: Date.now(),
      user: '나',
      time: '방금',
      text: input
    };
    setComments([newComment, ...comments]);
    setInput('');
  };

  return (
    <section className="panel">
      <h2>실시간 댓글</h2>
      <div className="comment-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-header">
              <span>{comment.user}</span>
              <span>{comment.time}</span>
            </div>
            <p className="comment-text">{comment.text}</p>
          </div>
        ))}
      </div>
      <div className="input-group">
        <input 
          type="text" 
          placeholder="응원의 한마디를 남겨주세요..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
        />
        <button 
          className="primary-btn" 
          style={{ flex: '0 0 80px' }}
          onClick={handleAddComment}
        >
          등록
        </button>
      </div>
    </section>
  );
}