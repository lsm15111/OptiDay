
-- Members
INSERT INTO member (username, password, message, birthdate, email, phone) VALUES
    ('min', 'min', 'Hello!', '1990-01-01', 'john.doe@example.com', '010-1234-5678'),
    ('su', 'su', 'Hi there!', '1985-05-20', 'jane.smith@example.com', '010-5678-1234');

-- Categories
INSERT INTO category (name, color, member_id) VALUES
  ('일', '#FFB3BA', 1), -- Pastel Red
  ('개인', '#FFDFBA', 1), -- Pastel Orange
  ('쇼핑', '#FFFFBA', 1), -- Pastel Yellow
  ('건강', '#BAFFC9', 1), -- Pastel Green
  ('회사', '#BAE1FF', 1), -- Pastel Blue
  ('여행', '#E2BAFF', 1), -- Pastel Purple
  ('음식', '#FFC4E1', 1), -- Pastel Pink
  ('스포츠', '#B3E5FC', 1), -- Light Blue
  ('음악', '#C8E6C9', 1), -- Light Green
  ('영화', '#FFF9C4', 1), -- Light Yellow
  ('책', '#D1C4E9', 1); -- Light Purple

-- Todos
INSERT INTO todo (title, description, start_date, end_date, status, member_id, category_id) VALUES
    ('연말 회의', '연말을 맞아 진행되는 회의입니다.', '2024-12-28', '2024-12-29', false, 1, 1),
    ('송년회', '올해의 마지막 송년회입니다.', '2024-12-30', '2024-12-31', false, 1, 3),
    ('회의', '새해 첫 회의입니다.', '2025-01-01', '2025-01-03', false, 1, NULL),
    ('달리기', '신년 달리기 행사입니다.', '2025-01-04', '2025-01-05', false, 1, NULL),
    ('회의', '팀 회의입니다.', '2025-01-07', '2025-01-08', false, 1, 4),
    ('회의', '중요한 회의입니다.', '2025-01-01', '2025-01-03', false, 1, 2),
    ('개발 회의', '개발 팀 회의입니다.', '2025-01-09', '2025-01-10', false, 1, NULL),
    ('디자인 검토', '디자인 검토 회의입니다.', '2025-01-11', '2025-01-12', false, 1, 1),
    ('팀 빌딩', '팀 빌딩 활동입니다.', '2025-01-13', '2025-01-14', false, 1, 3),
    ('고객 미팅', '고객과의 미팅입니다.', '2025-01-15', '2025-01-16', false, 1, 4),
    ('프로젝트 계획', '프로젝트 계획 회의입니다.', '2025-01-17', '2025-01-18', false, 1, NULL),
    ('테스트', '프로젝트 테스트 기간입니다.', '2025-01-10', '2025-01-20', false, 1, 1),
    ('여행 계획', '주변 찾아보기', '2025-01-21', '2025-01-22', false, 1, 1),
    ('회고', '팀 회고 회의입니다.', '2025-01-23', '2025-01-24', false, 1, 1),
    ('전략 회의', '전략 회의입니다.', '2025-01-25', '2025-01-26', false, 1, 4),
    ('교육 세션', '신입 교육 세션입니다.', '2025-01-27', '2025-01-28', false, 1, 1),
    ('신년 계획', '신년 계획 수립 회의입니다.', '2025-02-01', '2025-02-02', false, 1, 1),
    ('마케팅 회의', '마케팅 전략 회의입니다.', '2025-02-05', '2025-02-06', false, 1, NULL);

