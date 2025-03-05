CREATE TABLE GradeStructure
(
    IdGradeStructure UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    percentage NUMERIC(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
    IdClass UUID NOT NULL,
    --CONSTRAINT fk_class FOREIGN KEY (IdClass) REFERENCES Class(IdClass) ON DELETE CASCADE
);
COMMENT ON COLUMN GradeStructure.name IS 'Tên loại điểm';
COMMENT ON COLUMN GradeStructure.percentage IS 'Phần trăm đóng góp vào tổng điểm';
COMMENT ON COLUMN GradeStructure.IdClass IS 'Lớp học áp dụng cấu trúc điểm này';


CREATE TABLE StudentGrade
(
    IdStudentGrade UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    IdUser UUID NOT NULL,
    IdGradeStructure UUID NOT NULL,
    score NUMERIC(5,2) CHECK (score >= 0 AND score <= 10),
    --CONSTRAINT fk_user FOREIGN KEY (IdUser) REFERENCES Users(IdUser) ON DELETE CASCADE,
    --CONSTRAINT fk_grade FOREIGN KEY (IdGrade) REFERENCES GradeStructure(IdGrade) ON DELETE CASCADE
);

COMMENT ON COLUMN StudentGrade.IdUser IS 'Mã định danh sinh viên';
COMMENT ON COLUMN StudentGrade.IdGrade IS 'Mã loại điểm của lớp học';
COMMENT ON COLUMN StudentGrade.score IS 'Điểm số thực tế của sinh viên';