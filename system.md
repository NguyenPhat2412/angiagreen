Hãy thiết kế và code cho tôi một website demo thương mại điện tử + tư vấn sức khỏe mang tên **AN GIA GREEN**.

## Mục tiêu
- Đây là website demo để trình bày cho khách hàng.
- Cần làm giao diện thật chỉn chu, hiện đại, dễ nhìn, cảm giác tin cậy, gần gũi thiên nhiên, sạch sẽ, cao cấp vừa phải.
- Phong cách UI bám sát layout tham khảo của website nông sản/thảo dược Việt Nam:
  - header 2 tầng
  - menu chuyên mục bên trái
  - banner lớn
  - các section sản phẩm theo danh mục
  - card sản phẩm kiểu ecommerce
  - trang chi tiết sản phẩm có gallery, giá, thuộc tính, CTA
  - fixed contact icons ở góc phải bên dưới
- Ngôn ngữ mặc định: **tiếng Việt**
- Có hỗ trợ đa ngôn ngữ: **VI / EN / ZH**
- Ưu tiên responsive tốt trên desktop trước, sau đó mobile đẹp và gọn.

## Yêu cầu kỹ thuật
- Dùng **Next.js App Router + TypeScript + Tailwind CSS**
- Component hóa rõ ràng
- Có mock data cục bộ để demo
- Tạo đầy đủ layout, page, section, card, modal, drawer, tabs, carousel nếu cần
- Có dark mode nhẹ nếu tiện, nhưng mặc định là giao diện sáng
- Không cần backend thật, nhưng code cần sẵn cấu trúc để sau này nối API
- Dùng các component hiện đại, animation nhẹ, không quá rườm rà
- Nếu cần icon thì dùng lucide-react
- Nếu cần slider có thể dùng swiper
- Code sạch, dễ mở rộng

## Nhận diện thương hiệu
### Tên thương hiệu:
**AN GIA GREEN**

### Tinh thần thương hiệu:
- xanh
- sạch
- lành
- nguồn gốc rõ ràng
- chăm sóc sức khỏe từ dược liệu và nông sản chất lượng
- kết hợp giá trị truyền thống và quy trình hiện đại
- mang tinh thần Việt Nam, tử tế, bền vững, cộng đồng

### Màu sắc chủ đạo
Lấy cảm hứng từ màu xanh trong ảnh tham khảo:
- Primary Green: `#4FAE4E`
- Dark Green: `#2F7D32`
- Light Green: `#EAF6E8`
- Accent Green: `#7BC96F`
- Text Dark: `#1F2937`
- Soft Gray: `#F5F6F7`
- Border: `#E5E7EB`
- Price Red: `#E53935`

### Font / cảm giác typography
- Tiêu đề rõ ràng, đậm, dễ đọc
- Nội dung sạch, thoáng, spacing tốt
- Cảm giác giống ecommerce Việt Nam nhưng tinh gọn và hiện đại hơn

---

# Cấu trúc website cần tạo

## 1. Global Layout
Tạo layout chung cho toàn site gồm:
- Header
- Main navigation
- Footer
- Fixed action buttons ở góc phải dưới
- Mobile bottom actions hợp lý nếu cần

## 2. Header
Thiết kế header 2 dòng tương tự phong cách trong ảnh tham khảo.

### Header dòng 1:
- logo AN GIA GREEN bên trái
- thanh search lớn ở giữa
- bên phải có:
  - hotline
  - nút tải app “Chăm sóc khách hàng”
  - icon đăng nhập / tài khoản
  - icon giỏ hàng có badge số lượng
  - nút đổi ngôn ngữ VI / EN / ZH

### Header dòng 2:
- bên trái là nút **Chuyên mục**
- bên phải là menu ngang:
  - Trang chủ
  - Giới thiệu
  - Sản phẩm
  - Combo thành viên
  - Bài thuốc dân gian
  - Tư vấn cùng y sĩ
  - Tin tức
  - Liên hệ

### Mega menu / category menu
Khi mở “Chuyên mục”, hiển thị menu dạng cột bên trái giống ảnh:
- Dược liệu đóng hộp
- Bún / Miến / Thực phẩm sạch
- Trà thảo dược
- Bột / Viên nang / Nước uống
- Bài thuốc dân gian
- Chăm sóc sắc đẹp
- Gói chăm sóc thành viên
- Tư vấn và đặt lịch

---

# 3. Trang chủ
Thiết kế trang chủ dựa trên bố cục ảnh tham khảo nhưng làm đẹp, tinh gọn hơn.

## Hero section
- bên trái là menu chuyên mục
- bên phải là banner lớn
- banner hỗ trợ:
  - image slider
  - hoặc video banner
- nội dung banner nên thể hiện:
  - “Dược liệu sạch – Chăm sóc sức khỏe chủ động”
  - “Nguồn gốc minh bạch – Quy trình hiện đại – Giá trị truyền thống”
- có CTA:
  - Xem sản phẩm
  - Đặt lịch tư vấn

## Thanh slogan dưới banner
Một thanh ngang nền xanh:
- “AN GIA GREEN – SỐNG XANH, SỐNG LÀNH, SỐNG CHỦ ĐỘNG”

## Section: Gói combo khuyến mãi cho thành viên
Thiết kế giống section “CHƯƠNG TRÌNH KHUYẾN MÃI” trong ảnh.
Dùng card to, bắt mắt, màu xanh chủ đạo.
Ví dụ các gói:
- Gói thành viên 15.000đ: nhận voucher dùng thử + ưu đãi nội dung sức khỏe
- Gói thành viên 299.000đ: combo trà thảo dược cơ bản + tư vấn online
- Gói thành viên 999.000đ: combo chăm sóc gia đình
- Gói thành viên 3.000.000đ: quyền lợi tư vấn định kỳ + ưu đãi sản phẩm + quà tặng thành viên
Mỗi card có:
- ảnh minh họa
- tiêu đề
- mô tả ngắn
- ưu đãi nổi bật
- nút xem chi tiết

## Section: Sản phẩm đóng hộp
Tương tự các block sản phẩm trong ảnh.
Hiển thị dạng card grid 4–5 sản phẩm / hàng trên desktop.
Ví dụ sản phẩm:
- Đông trùng hạ thảo
- Nhân sâm thái lát
- Trà gừng mật ong
- Bột cần tây
- Viên thảo dược hỗ trợ sinh hoạt lành mạnh
Card có:
- ảnh
- badge giảm giá %
- tên sản phẩm
- giá sale / giá gốc
- nút “Xem chi tiết” hoặc “Thêm vào giỏ”

## Section: Sản phẩm sạch
Tập trung nhóm:
- bún
- miến
- thực phẩm khô sạch
- ngũ cốc
- đồ ăn kèm có nguồn gốc rõ ràng
Làm block giống ecommerce, có tabs nhỏ phía trên:
- Bún sạch
- Miến sạch
- Thực phẩm khô
- Ngũ cốc

## Section: Các bài thuốc dân gian
Thiết kế dạng card bài viết + hình minh họa.
Mỗi bài có:
- tiêu đề
- mô tả 2 dòng
- tag
- nút xem thêm
Nội dung nên theo hướng chia sẻ kiến thức dân gian và chăm sóc sức khỏe lành mạnh.
**Không dùng wording khẳng định chữa khỏi bệnh.**
Dùng ngôn ngữ an toàn như:
- “hỗ trợ”
- “tham khảo”
- “kinh nghiệm dân gian”
- “khuyến nghị tham vấn chuyên môn khi cần”

## Section: Danh sách y sĩ để đặt lịch tư vấn
Thiết kế dạng profile card:
- ảnh đại diện
- tên
- chuyên môn
- số năm kinh nghiệm
- hình thức tư vấn: online / trực tiếp
- lịch trống gần nhất
- nút “Đặt lịch”
Ví dụ 4–6 y sĩ demo.

## Section: Tin tức / kiến thức
- bài viết mới
- video / cẩm nang
- ebook giới thiệu dược liệu và lối sống lành mạnh

## Section: Giới thiệu triết lý
Làm một block trang trọng, hình ảnh thiên nhiên / dược liệu / con người Việt Nam.
Tóm tắt tinh thần dự án:
- phát triển hệ sinh thái dược liệu sạch
- kết hợp truyền thống và hiện đại
- chăm sóc sức khỏe cộng đồng
- xây dựng vùng nguyên liệu, sản phẩm, trung tâm tư vấn, đào tạo và cộng đồng sống lành mạnh
Có nút:
- Xem trang giới thiệu
- Liên hệ hợp tác

## Footer
Footer đầy đủ:
- logo + slogan
- về chúng tôi
- chính sách
- hỗ trợ khách hàng
- thông tin liên hệ
- social links
- app download
- newsletter / đăng ký nhận tin

---

# 4. Fixed contact actions
Ở góc phải dưới màn hình, xuất hiện nhóm icon fixed giống ảnh tham khảo:
- Chat với AI
- Zalo
- Gọi hotline
- Messenger / chat nhanh
- Bản đồ / địa chỉ
- Đặt lịch tư vấn
- Nút lên đầu trang

Các nút phải nổi, bo tròn, có animation nhẹ, đồng bộ theme xanh.
Hiển thị ở tất cả các trang.

---

# 5. Trang chi tiết sản phẩm
Thiết kế tương tự bố cục trong ảnh tham khảo:
- breadcrumb
- gallery ảnh lớn bên trái + thumbnail dọc hoặc ngang
- thông tin sản phẩm bên phải:
  - tên
  - rating
  - số lượt mua
  - giá
  - thuộc tính / quy cách
  - khu vực phân phối
  - số lượng
  - nút thêm giỏ hàng
  - nút mua ngay
  - nút mua sỉ nếu có
- thêm khối nhỏ hiển thị:
  - QR truy xuất nguồn gốc
  - QR quá trình sản xuất
  - nguồn nguyên liệu
  - chứng nhận / quy trình
- tab nội dung bên dưới:
  - Mô tả
  - Thành phần
  - Hướng dẫn sử dụng
  - Nguồn gốc & quy trình
  - Đánh giá
  - Câu hỏi thường gặp

### Phần “QR truy xuất nguồn gốc”
Làm một card nổi bật:
- preview QR
- timeline quy trình sản xuất
- thông tin lô hàng
- vùng nguyên liệu
- ngày sản xuất
- hạn sử dụng
- chứng nhận kiểm định demo

### Sidebar / supplementary cards
Có thể thêm:
- Cam kết chất lượng
- Giao hàng
- Hỗ trợ tư vấn
- Sản phẩm liên quan

---

# 6. Trang giỏ hàng
Thiết kế hiện đại, dễ dùng:
- bảng sản phẩm
- ảnh, tên, thuộc tính, giá, số lượng
- chọn mã giảm giá
- ghi chú đơn hàng
- tạm tính
- phí vận chuyển
- tổng tiền
- nút tiếp tục mua
- nút thanh toán

---

# 7. Trang thanh toán
Tạo checkout đẹp, rõ ràng, tin cậy.

## Các phần:
- thông tin nhận hàng
- địa chỉ
- ghi chú
- tóm tắt đơn hàng
- chọn phương thức thanh toán:
  - COD
  - Chuyển khoản ATM
  - VNPay
- nếu chọn ATM thì hiển thị thông tin chuyển khoản demo
- nếu chọn VNPay thì có card mô phỏng redirect thanh toán
- có badge bảo mật / cam kết / hotline hỗ trợ

---

# 8. Trang đăng nhập / đăng ký
Thiết kế đẹp, hiện đại:
- tab đăng nhập / đăng ký
- hỗ trợ:
  - email
  - số điện thoại
  - password
  - social login demo nếu muốn
- có khu vực highlight lợi ích thành viên:
  - theo dõi đơn hàng
  - đặt lịch tư vấn
  - tích điểm
  - lưu sản phẩm yêu thích

---

# 9. Trang profile người dùng
Dashboard tài khoản gồm:
- thông tin cá nhân
- đơn hàng
- lịch đặt tư vấn
- sản phẩm yêu thích
- địa chỉ giao hàng
- đổi mật khẩu
- quyền lợi thành viên
- lịch sử thanh toán

---

# 10. Trang giới thiệu
Tạo riêng 1 trang giới thiệu thương hiệu AN GIA GREEN, dựa trên triết lý kinh doanh bên dưới, nhưng diễn đạt theo hướng trang trọng, truyền cảm hứng, chuyên nghiệp, phù hợp website thương hiệu.

## Tinh thần nội dung cần thể hiện
Dựa trên triết lý sau để thiết kế nội dung và section của trang giới thiệu:

- Khát vọng đóng góp cho một Việt Nam hùng cường bằng các giá trị chăm sóc sức khỏe bền vững
- Định hướng phát triển mô hình kết hợp y học hiện đại với tri thức truyền thống và giá trị Nam dược
- Xây dựng vùng nguyên liệu quy mô lớn, minh bạch, bền vững
- Đầu tư sản xuất hiện đại để tạo ra các sản phẩm chăm sóc sức khỏe và làm đẹp
- Phát triển hệ thống tư vấn, chăm sóc, nghỉ dưỡng, lan tỏa lối sống lành mạnh
- Biên soạn và phát hành tri thức về cây thuốc, vị thuốc, dược liệu
- Phát triển các trung tâm rèn luyện sức khỏe, đạo đức, trí tuệ
- Hợp tác với chuyên gia trong và ngoài nước để nâng cao chất lượng đội ngũ
- Tạo ra các hoạt động cộng đồng, hướng tới giá trị quốc gia và quốc tế

## Lưu ý cực kỳ quan trọng về nội dung
- Không viết theo kiểu khẳng định chữa khỏi bệnh
- Không dùng claim y tế quá đà
- Dùng ngôn ngữ thương hiệu, định hướng, tầm nhìn, sứ mệnh, hệ sinh thái, chăm sóc sức khỏe
- Có thể dùng các từ:
  - hỗ trợ
  - đồng hành
  - chăm sóc
  - nâng cao chất lượng sống
  - gìn giữ giá trị truyền thống
  - phát triển bền vững

## Cấu trúc trang giới thiệu gợi ý
- Hero giới thiệu
- Câu chuyện thương hiệu
- Tầm nhìn
- Sứ mệnh
- Triết lý kinh doanh
- Hệ sinh thái AN GIA GREEN
- Vùng nguyên liệu
- Quy trình sản xuất
- Đội ngũ / đối tác / chuyên gia
- Hoạt động cộng đồng
- CTA liên hệ hợp tác

---

# 11. Các component cần có
Hãy tạo đầy đủ component tái sử dụng:
- Header
- SearchBar
- LanguageSwitcher
- CategoryMenu
- HeroBanner
- PromoCard
- ProductCard
- ArticleCard
- DoctorCard
- QRTraceabilityCard
- CartDrawer hoặc MiniCart
- CheckoutSummary
- FloatingContactButtons
- Footer
- SectionHeading
- Breadcrumb

---

# 12. Mock data
Hãy tạo mock data tiếng Việt cho:
- danh mục sản phẩm
- combo thành viên
- sản phẩm đóng hộp
- sản phẩm sạch
- bài thuốc dân gian
- danh sách y sĩ
- bài viết
- thông tin truy xuất nguồn gốc
- đơn hàng mẫu
- profile người dùng mẫu

Tên và nội dung mock data nên hợp với thương hiệu AN GIA GREEN.

---

# 13. Trải nghiệm UI/UX
- spacing thoáng
- bo góc mềm
- shadow nhẹ
- hover state rõ ràng
- CTA nổi bật
- card sản phẩm gọn, sạch
- banner và section có nhịp điệu thị giác tốt
- cảm giác đáng tin, thiên nhiên, chuyên nghiệp
- không quá “bệnh viện”, không quá “nông sản chợ”, mà là sự kết hợp giữa:
  - thương hiệu xanh
  - dược liệu sạch
  - ecommerce hiện đại
  - tư vấn sức khỏe có chiều sâu

---

# 14. Responsive
Tối ưu cho:
- Desktop lớn
- Laptop
- Tablet
- Mobile

### Mobile:
- header thu gọn
- menu drawer
- search gọn
- product card đẹp
- fixed buttons không che nội dung
- checkout dễ thao tác

---

# 15. Yêu cầu đầu ra
Hãy tạo mã nguồn đầy đủ cho demo website gồm:
- layout
- pages
- reusable components
- mock data
- styles
- routing

Ưu tiên tạo các route sau:
- `/`
- `/gioi-thieu`
- `/san-pham`
- `/san-pham/[slug]`
- `/gio-hang`
- `/thanh-toan`
- `/dang-nhap`
- `/dang-ky`
- `/tai-khoan`
- `/bai-thuoc-dan-gian`
- `/tu-van-y-si`

Ngoài code, hãy làm giao diện sẵn dữ liệu demo để mở lên là nhìn giống một website thật đang hoạt động.

Hãy bắt đầu từ homepage và global layout trước nhưng vẫn tạo sẵn đầy đủ cấu trúc các page còn lại.