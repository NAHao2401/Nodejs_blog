# Nodejs Blog

Dự án blog đơn giản xây dựng với **Node.js** nhằm thực hành các kiến thức cơ bản về backend:
routing, middleware, template engine và tổ chức mã nguồn theo mô hình tách biệt (routes, controllers, views,…).

> Dự án được thực hiện trong quá trình tự học Node.js, dùng làm portfolio cá nhân.

---

## ✨ Tính năng

- Hiển thị danh sách bài viết blog.
- Xem chi tiết từng bài viết.
- Tổ chức layout dùng template engine (Handlebars).
- Quản lý tài nguyên tĩnh: CSS, hình ảnh, script phía client.
- Thực hành middleware, cấu hình server và tổ chức thư mục dự án Node.js.

*(Tùy code thực tế của bạn, bạn có thể bổ sung thêm: tạo/sửa/xóa bài viết, phân trang, tìm kiếm, v.v.)*

---

## 🛠️ Công nghệ sử dụng

- **Node.js**
- **Express.js**
- **Handlebars** (view engine)
- **SCSS / CSS** cho giao diện
- Các thư viện khác được khai báo trong `package.json`

---

## 🚀 Cài đặt & chạy dự án

```bash
# 1. Clone project
git clone https://github.com/NAHao2401/Nodejs_blog.git

# 2. Di chuyển vào thư mục
cd Nodejs_blog

# 3. Cài đặt dependencies
npm install

# 4. Chạy ở môi trường development (dùng nodemon nếu có cấu hình)
npm run dev

# Hoặc chạy bình thường
npm start
