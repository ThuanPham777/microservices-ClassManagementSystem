SELECT datname FROM pg_database;

CREATE TABLE Grade (
    IdGrade SERIAL PRIMARY KEY,           -- Khóa chính tự tăng
    name VARCHAR(100) NOT NULL,          -- Tên điểm
    percentage NUMERIC(5,2) NOT NULL,    -- Phần trăm
    score NUMERIC(5,2) NOT NULL,         -- Điểm số
    IdUser INTEGER NOT NULL,             -- Mã người dùng
    IdClass INTEGER NOT NULL             -- Mã lớp học
);

-- Thêm comment cho các cột
COMMENT ON COLUMN Grade.Name IS 'Tên của điểm số';
COMMENT ON COLUMN Grade.Percentage IS 'Phần trăm đóng góp vào tổng điểm';
COMMENT ON COLUMN Grade.Score IS 'Điểm số thực tế';
COMMENT ON COLUMN Grade.IdUser IS 'Mã định danh của người dùng';
COMMENT ON COLUMN Grade.IdClass IS 'Mã định danh của lớp học';