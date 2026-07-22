import { TravelStyled } from './travel.styled';

const Travel = () => {
  document.title = 'Quảng Bình';

  return (
    <TravelStyled>
      <div className="container">
        <header className="header">
          <h1>Kế hoạch ăn chơi tại Quảng Bình</h1>
          <p className="subtitle">Hành trình khám phá vùng đất di sản</p>
        </header>

        <section className="day-section">
          <h2><span>Ngày 1</span> 12/06/2026</h2>
          
          <div className="activity-card">
            <h3>Sáng & Trưa: Di chuyển & Check-in</h3>
            <p>Di chuyển theo lịch trình của công ty. Ăn trưa theo đoàn công ty. Check-in khách sạn và nghỉ trưa.</p>
          </div>

          <div className="activity-card">
            <h3>Chiều: Tự do khám phá</h3>
            <p></p>
          </div>

          <div className="activity-card">
            <h3>Tối: Gala & Giải trí</h3>
            <p>Tham gia buổi gala công ty. Sau đó có thể đi uống nước hoặc tăng 2 karaoke giải trí.</p>
          </div>
        </section>

        <section className="day-section">
          <h2><span>Ngày 2</span> 13/06/2026</h2>
          
          <div className="activity-card">
            <h3>Sáng sớm: Bình minh trên biển</h3>
            <p>Dậy sớm chụp ảnh bình minh tại bãi biển Nhật Lệ.</p>
          </div>

          <div className="activity-card">
            <h3>Ăn sáng: Đặc sản Quảng Bình</h3>
            <ul>
              <li><strong>Bánh bột lọc:</strong> Ăn kèm bánh mì rất ngon.</li>
              <li><strong>Cháo canh hải sản:</strong> Hương vị đậm đà, khá giống bún.</li>
              <li><strong>Chắt chắt:</strong> Giống hến, ăn cùng cháo hoặc bún.</li>
              <li><strong>Bánh khoái:</strong> Giống bánh xèo nhưng dày hơn và đa dạng topping.</li>
            </ul>
          </div>

          <div className="activity-card">
            <h3>Hoạt động tự chọn (Sáng - Chiều)</h3>
            <div style={{ marginBottom: '1rem' }}>
              <strong>1. Tour Khám phá:</strong> Động Thiên Đường - Sông Chày - Hang Tối (Trekking, chèo thuyền, sông suối).
              <a href="https://vietnamtouristvn.com/tour-dong-thien-duong-dong-phong-nha-1-ngay" target="_blank" rel="noreferrer">Tham khảo tại đây</a>
              <span className="tag">Hoạt động mạnh, gần sông suối</span>
              <span className="tag">Mất nhiều thời gian cho hoạt động khác</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>2. Trượt cát/Đua xe:</strong> Dành cho ai thích hoang dã.
              <span className="tag">Mất sức nếu trời nắng nóng</span>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong>3. Làng bích họa Cảnh Dương:</strong> Check-in sống ảo cực chill.
              <br />
              <a href="https://vinpearl.com/vi/lang-bich-hoa-canh-duong-dia-diem-gioi-tre-ru-nhau-check-in-chup-la-dep" target="_blank" rel="noreferrer">Tham khảo tại đây</a>
            </div>
            <div>
              <strong>4. Tắm biển Nhật Lệ:</strong> Thưởng thức bia và mực nướng chuẩn bài.
            </div>
          </div>

          <div className="activity-card">
            <h3>Tối: Hoạt động DG11</h3>
            <p>Tham gia hoạt động của DG11. Tối muộn có thể ăn khuya (ốc, cháo hải sản) hoặc tiếp tục quẩy bar/karaoke.</p>
          </div>
        </section>

        <section className="day-section">
          <h2><span>Ngày 3</span> 14/06/2026</h2>
          
          <div className="activity-card">
            <h3>Sáng: Tận hưởng & Mua sắm</h3>
            <p>Ngắm bình minh, ăn sáng tại khách sạn hoặc ra ngoài. Đi chợ mua quà đặc sản cho người thân.</p>
          </div>

          <div className="activity-card">
            <h3>Trưa: Kết thúc hành trình</h3>
            <p>Lên xe đi về Hà Nội, kết thúc chuyến du lịch đầy kỷ niệm.</p>
          </div>
        </section>
      </div>
    </TravelStyled>
  );
};

export default Travel;
