import './InquiryForm.css';

export default function InquiryForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 접수되었습니다.');
    // Here you would implement actual form submission logic
  };

  return (
    <section className="panel">
      <h2>제휴 및 문의</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="담당자 성함" required />
        </div>
        <div>
          <input type="email" placeholder="이메일 주소" required />
        </div>
        <div>
          <textarea placeholder="문의하실 내용을 입력해주세요." required></textarea>
        </div>
        <button type="submit" classNam="primary-btn">문의하기</button>
      </form>
    </section>
  );
}