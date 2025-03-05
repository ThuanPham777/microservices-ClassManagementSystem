CREATE DATABASE IF NOT EXISTS classmanagement;
USE classmanagement;
CREATE TABLE IF NOT EXISTS Class (
    IdClass VARCHAR(255) PRIMARY KEY,  -- Khóa chính, tự động tăng
    name VARCHAR(255) NOT NULL,        -- Tên lớp, không được để trống
    description TEXT,                            -- Chi tiết lớp, có thể để trống
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Thời gian tạo, mặc định là thời gian hiện tại
);
